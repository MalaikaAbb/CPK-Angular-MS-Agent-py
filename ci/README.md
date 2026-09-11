# `ci/` — the recording pipeline

Everything that builds, starts, checks and records this repo lives here. The
only pieces outside this folder are the two workflows, because GitHub requires
that path: `.github/workflows/daily-recorder.yml` records the demos, and
`.github/workflows/version-watch.yml` reports what the dependencies did
overnight. They are independent — see *Version watch*.

## Layout

```
ci/
├── automate.mjs          entry point — one process, start to finish
├── check-doc-drift.mjs   compares doc-snapshot/ against the live docs
├── check-versions.mjs    dependency drift report (read-only) — VERSION-WATCH.md
├── resolved-versions.json  what the last nightly resolved; git history is the timeline
├── list-pages.mjs        prints the recorder's page ids
├── validate-pages.mjs    rejects unknown ids before a run starts
├── resolve-selection.mjs expands dispatch checkboxes + ids into a page list
├── run-name.mjs          names the run's artifacts (MsPy-angular-18Aug2026-0612UTC)
└── lib/
    ├── config.mjs        paths, ports, URLs
    ├── env.mjs           loads .env files the way backend/main.py does
    ├── pages.mjs         reads page ids from the recorder's config
    ├── preflight.mjs     port, credential and warmup checks
    ├── mux.mjs           voiceover muxing (the only implementation)
    └── report.mjs        RUN_REPORT.md / .json
```

## Commands

| Command | What it does |
|---|---|
| `npm run automate` | Full pipeline: drift → preflight → deps → servers → record |
| `npm run automate:pull` | Same, after `git pull` |
| `npm run automate:locked` | Same, but installing the committed lockfiles |
| `npm run drift` | Doc drift check on its own |
| `npm run drift:sync` | Update `doc-snapshot/` to match live docs |
| `npm run ci:pages` | List valid page ids |
| `node ci/check-versions.mjs` | Dependency drift report — writes nothing |
| `node ci/check-versions.mjs --snapshot` | Same, and rewrites `ci/resolved-versions.json` |

Anything not consumed by `automate.mjs` is forwarded to the recorder:

```bash
node ci/automate.mjs --pages=quickstart,threads
node ci/automate.mjs --shard=1/3
node ci/automate.mjs --limit=3 --ignore-doc-drift
```

## Flags

| Flag | Effect |
|---|---|
| `--pull` | `git pull` first |
| `--use-lockfile` | Install the committed lockfiles instead of re-resolving (see below) |
| `--skip-install` | Skip dependency installation |
| `--ignore-doc-drift` / `--force` | Record even if the live docs moved |
| `--allow-port-reuse` | Record against servers that are already running |
| `--skip-credential-check` | Skip the model-credential preflight |

## The three services

Angular has no server route to host the Copilot Runtime the way a Next app
does, so this stack is one process longer than its React twin:

```
browser ──▶ ng serve :4202 ──▶ Copilot Runtime :8201 ──▶ Agent Framework :8200
            (frontend)         (frontend/server.ts)      (backend/main.py)
```

The ports are this repo's own. The backend binds 8200, so the runtime moved to
8201 and `ng serve` to 4202 — which is what lets this stack run beside the Agno
and Mastra ones without either having to move.

`npm run dev` inside `frontend/` starts the first two together under
`concurrently`, which is why the pipeline spawns two processes for three
services — and why cleanup kills the whole process tree. Killing only the shell
leaves the runtime and `ng serve` holding 8201 and 4202, and the next run
refuses to start on a busy port.

Ports are env-overridable, which is how a run moves off a port another project
is already holding:

```bash
PORT=8301 npm run dev                                  # frontend/server.ts, and
                                                       # runtimeUrl in
                                                       # frontend/src/app/app.config.ts,
                                                       # which hardcodes :8201
FRONTEND_PORT=4302 node ci/automate.mjs                # what this pipeline checks
```

The backend port is **not** overridable: `backend/main.py` passes `port=8200` to
uvicorn as a literal. Moving it means editing that line and
`MICROSOFT_AGENT_FRAMEWORK_URL`, which is what points the runtime at it.

## What runs, in order

1. **Doc drift** — compares each `doc-snapshot/pages/*.md` hash against the live
   page. Drift halts the run with exit code 2 unless `--ignore-doc-drift`.

   The nightly run never passes that flag: unattended, drift means the clips
   would document a page that has since changed, and nobody is watching to
   catch it. Sync `doc-snapshot/` (`npm run drift:sync`) and the next night
   records. A manual run is attended, so it ignores drift unless you tick
   **Fail immediately if the live docs have drifted**.
2. **Preflight** — loads `.env`, then refuses to continue if a port is already
   held or the model credential is missing/rejected. Both checks are cheap and
   both have cost a full run before.
3. **Dependencies** — `uv sync` for the backend, `npm install` for the frontend
   and recorder.
   By default the lockfiles are dropped first, so the newest versions the
   ranges already allow get installed — see *Which versions get recorded*.
4. **Servers** — the backend and `npm run dev`, spawned from this process,
   logging to `autorecorder/videos/logs/`.
5. **Health + warmup** — poll the backend, then the runtime, then the app; then
   fetch the heaviest routes and the runtime's `/info` so the recorder is not
   racing a first load. The order matters: the runtime's `/info` only means
   something once there is an agent behind it.
6. **Record** — hand off to the recorder with the forwarded flags.
7. **Mux + report** — always runs, success or failure.

## Why one process

Each `run:` step in a GitHub Actions job is a separate subshell. A server
started with `&` in one step is reaped before the next step begins. Spawning the
servers from inside `automate.mjs` keeps them alive for the whole run, which is
why the pipeline is a Node program and not a sequence of YAML steps.

## Page selection

`autorecorder/config/pages.config.ts` is the single source of truth for which
demos exist. `lib/pages.mjs` reads the ids from it, `list-pages.mjs` prints
them, and `validate-pages.mjs` checks a selection against them.

The workflow does **not** restate the list — that is what drifts whenever a page
is renamed.

### Choosing pages on a manual run

The dispatch form has a checkbox per **doc section** plus a free-text field for
exact ids. Tick sections, type ids, or both — the two are combined.

| Checkbox | Pages |
|---|---|
| Getting Started | quickstart, chat-ui |
| Generative UI | frontend-tools-generative-ui |
| Interaction | voice-multimodal, human-in-the-loop |
| Shared State | shared-state |
| Threads, Attachments, Headless | threads, attachments, headless |

The last group is one checkbox because those three demos share a single doc page
(`guides/threads-memory-attachments-headless`) — ticking it records that page
end to end, which is how the doc reads.

Nothing ticked and nothing typed means **all pages** — what the nightly schedule
does.

**Why sections rather than one checkbox per page:** GitHub allows a
`workflow_dispatch` at most **10 inputs**. Five sections plus four options is 9,
leaving room for exactly one more input; a checkbox per page would break the
form the moment the page count passed six, and an invalid form fails every
manual run before a job starts.

The section map lives in `PAGE_GROUPS` in `lib/pages.mjs`, and a run fails if any
page belongs to no section, so nothing can quietly become unreachable.

## Which versions get recorded

A run re-resolves its dependencies by default: the lockfiles are dropped and
`npm install` / `uv sync --upgrade` pick the newest versions the ranges in
`package.json` and `pyproject.toml` already allow. `@copilotkit/*` is a caret
range, so a release recorded the night it ships, and a major version still
cannot arrive without someone editing the manifest.

This is the same thing as deleting `node_modules` and `package-lock.json` by
hand, which is how these demos have always been checked before a release. On CI
there is nothing to delete beside the lockfile: every run starts on a clean
runner.

`--use-lockfile` (dispatch checkbox **Install the committed lockfiles**) opts
back into the committed versions. Reach for it to reproduce an older run, or to
find out whether a break came from the demo or from the tree beneath it.

What no run does is rewrite the ranges. `ncu -u --peer` used to run here and was
the largest single source of CI failures: it bumped all twelve `@angular/*`
packages past a lockfile that still pinned the old ones, and Angular's exact
inter-package peer requirements made the result unsatisfiable. Raising a range
is a reviewed edit to `package.json`, not something a nightly recording run
should do to itself.

## Version watch

Re-resolving means the versions under test move on their own — silently. A
broken recording could be this repo's code or a dependency bump, and nothing in
a recording run says which. `check-versions.mjs` supplies the missing record,
and runs on its own schedule:

```
05:30 UTC  version-watch.yml   re-resolve → report → commit the snapshot
06:00 UTC  daily-recorder.yml  re-resolve → record the demos
```

The two are **independent**. The recorder does not wait for the watch, and a
moved version never blocks a recording: drift is news, not a build failure.
They are separate workflows for two more reasons — asking "what moved?" should
not cost three sharded workers and a run of model calls, and the watch needs
`contents: write` to commit its snapshot, which is worth keeping out of the
workflow that holds the model keys.

Each re-resolves independently, so a package published inside that 30-minute gap
could reach the recorder without appearing in the snapshot. Rare, and the cost
of merging them back is coupling plus write access beside the secrets.

What the report contains:

| Section | Answers |
|---|---|
| What moved since the last run | Diff against `ci/resolved-versions.json` — the overnight suspects |
| Frontend | `npm outdated`, **classified**: ours to bump / upstream pin / peer-blocked |
| Upstream pins | What the newest `@copilotkit/angular` and `/runtime` force on consumers |
| Protocol fragmentation | Multiple copies of `@ag-ui/*` or `@copilotkit/core` in one tree |

Classification matters because only one of the three causes is actionable here:
`@copilotkit/angular` exact-pins `@copilotkit/core`, and Angular's
`peerDependencies` forbid a newer TypeScript. Treating `npm outdated`'s
`Latest` column as a to-do list breaks the build. `ci/VERSION-WATCH.md` carries
the reasoning, the current findings, and the manual upgrade ritual.

The snapshot is committed rather than uploaded, so
`git log -p ci/resolved-versions.json` is the timeline. Scheduled runs always
commit; a manual run only does so if you tick **Commit the resolved-version
snapshot**. If the push is rejected — a protected default branch — the job says
so in its summary and stays green.

## Adding a page

1. Add it to `autorecorder/config/pages.config.ts`.
2. Add its id to a section in `PAGE_GROUPS` (`ci/lib/pages.mjs`).

Skipping step 2 fails the run with the page named, rather than silently dropping
it from the form.

## CI shape

`prepare` resolves the run name and page list once. Three workers each record a
third of the pages under `xvfb-run`, then `consolidate-recordings` merges the
artifacts.

```
daily-recorder.yml
            ┌─ Worker 1/3 ─┐
prepare ────┼─ Worker 2/3 ─┼─→ consolidate-recordings
            └─ Worker 3/3 ─┘

version-watch.yml
version-watch          (separate workflow, no dependency either way)
```

## Artifact names

Every artifact is named for the project and the moment the run started:

```
MsPy-angular-18Aug2026-0612UTC             ← consolidated, all clips
MsPy-angular-18Aug2026-0612UTC-shard-1     ← one worker's output
```

`prepare` computes the stamp once (`ci/run-name.mjs`) and passes it to the other
jobs, so all four names agree. The slug names both halves of the integration on
purpose — Angular clips and their React twins end up in the same folder. Change
it via `PROJECT_SLUG` in `lib/config.mjs`, together with `videoPrefix` in
`autorecorder/config/project.config.ts`.

## Secrets and variables

| Name | Kind | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | secret | Model provider key |
| `AZURE_OPENAI_API_KEY` / `AZURE_OPENAI_ENDPOINT` | secret | Azure instead of OpenAI |
| `OPENAI_CHAT_MODEL_ID` | variable | Model override (default `gpt-4o-mini`) |
| `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` | variable | Azure deployment name |

`backend/main.py` prefers Azure when `AZURE_OPENAI_ENDPOINT` is set and falls
back to OpenAI, and the preflight check follows the same order — so an
Azure-only run is not rejected for a missing `OPENAI_API_KEY`.

## Troubleshooting

**"Ports already in use"** — a previous run's servers survived. Stop the listed
PIDs, or pass `--allow-port-reuse` to record against them. Do not ignore this:
Windows lets a second process bind a port another is already listening on, and
requests then land on whichever accepts first, so a stale server holding old
environment variables can answer instead of the new one.

**"OPENAI_API_KEY is missing or still the placeholder"** — set a real key in
`backend/.env` or the repo-root `.env`. Note the precedence: `backend/.env` is
read first, so an uncommented placeholder there shadows a real key at the root.

**Server died mid-run** — read `autorecorder/videos/logs/backend.log` and
`frontend.log`. `frontend.log` carries both the runtime and `ng serve`, prefixed
by `concurrently`. They are uploaded with the CI artifacts.

**Recorder aborts on preflight** — the app was still doing its first load. The
warmup step covers the usual routes; a page added to `WARMUP_ROUTES` in
`lib/config.mjs` gets the same treatment.

**Runtime up, backend silent** — the runtime answers on 8201 whether or not it
can reach the backend. `warmRuntimeEndpoint` hits `/api/copilotkit/info`, the
request that actually goes through to the Agent Framework process, so that
failure shows up here rather than as a demo where nothing ever replies.
