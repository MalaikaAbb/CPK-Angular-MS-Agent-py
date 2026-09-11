### Project Overview

This project is an **interactive test harness and demonstration suite** for validating the integration between **CopilotKit** (Angular client + Node runtime) and the **Microsoft Agent Framework** (Python / FastAPI).

The repository serves two main purposes:

1. **Interactive Demo & QA Harness**: A running Angular 22 web application that implements and tests every feature of `@copilotkit/angular` against a live Python-based Microsoft Agent Framework backend.
2. **Living Documentation Verifier**: Mirrors the official documentation found in [doc-snapshot/](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/doc-snapshot), ensuring that code snippets shown in docs are byte-identical to actual executing code.

---

### Architecture Overview

Unlike traditional single-backend architectures, this project uses a **3-tier distributed model**:

```mermaid
flowchart LR
    subgraph Browser ["Frontend (Angular 22)"]
        UI["@copilotkit/angular\n(Signal-based & Zoneless)"]
    end

    subgraph Runtime ["Copilot Runtime (Node.js)"]
        CR["@copilotkit/runtime/v2\n(Port 8201 /api/copilotkit)"]
        HA["HttpAgent (AG-UI Client)"]
    end

    subgraph Backend ["Agent Framework (Python / FastAPI)"]
        AF["Agent Framework Agent\n(Port 8200 POST /)"]
        Tools["Tools: getWeather, update_language"]
    end

    subgraph Model ["LLM Provider"]
        LLM["OpenAI / Azure OpenAI\n(gpt-4o-mini)"]
    end

    UI -- "POST /api/copilotkit\n(SSE Events)" --> CR
    CR -- "AG-UI protocol over SSE" --> AF
    AF -- "API Prompts / Tool calls" --> LLM
```

1. **Frontend (Browser - Angular 22)**:
   - Configured in [app.config.ts](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/app.config.ts) using `provideCopilotKit({ runtimeUrl: 'http://localhost:8201/api/copilotkit' })`.
   - Never exposes OpenAI keys directly to the browser.
   - Built with modern Angular conventions: signal-based reactivity, standalone components, native control flow (`@if`, `@for`), and Tailwind CSS v4.

2. **Copilot Runtime Proxy ([frontend/server.ts](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/server.ts))**:
   - Runs on **port 8201** as a standalone Node.js server using `@copilotkit/runtime/v2`.
   - Registers two agent aliases (`default` and `support`) pointing to the Python agent at `http://localhost:8200/` via `@ag-ui/client`'s `HttpAgent`.
   - Enables `a2ui: {}` middleware across all registered agents.

3. **Backend Agent ([backend/main.py](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/backend/main.py))**:
   - Runs on **port 8200** via FastAPI and Uvicorn.
   - Powered by `agent-framework-ag-ui` and `agent-framework-openai`.
   - Exposes tools like `getWeather` and `update_language` alongside two-way state schema definitions (`STATE_SCHEMA`, `PREDICT_STATE_CONFIG`).

---

### Directory Structure

```
mspy-angular/
├── project-context.md          # Rules & ground truth for doc-project parity
├── doc-snapshot/               # Versioned upstream documentation snapshots
│   ├── manifest.json           # SHA256 checksums & route mappings
│   ├── CHANGELOG.md            # Doc drift history
│   ├── reports/                # Timestamped diff analysis reports
│   └── pages/                  # Tracked official guide markdown files
├── backend/                    # Python / Microsoft Agent Framework
│   ├── pyproject.toml          # uv-managed dependencies (FastAPI, agent-framework)
│   ├── uv.lock
│   └── main.py                 # FastAPI app, agent tools, AG-UI endpoint
└── frontend/                   # Angular 22 Application + Node Runtime
    ├── package.json            # npm scripts & dependencies
    ├── server.ts               # Copilot Runtime server (Node.js, Port 8201)
    ├── scripts/
    │   └── generate-sources.ts # Syncs running source code into TypeScript strings
    └── src/
        ├── styles.css          # Tailwind 4, CopilotKit CSS, and theme tokens
        └── app/
            ├── app.config.ts   # Root providers (provideCopilotKit, sandbox functions)
            ├── app.routes.ts   # Doc routes + isolated chrome-free /demo routes
            ├── components/     # App layout, health check, UI primitives
            ├── features/       # 11 isolated feature modules
            ├── lib/            # Nav configuration & source code loader
            └── pages/          # 14 routed doc & overview pages
```

---

### Feature Modules & Implementation Status

The project defines each feature area in [nav-config.ts](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/lib/nav-config.ts) and displays status in [status.ts](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/status.ts):

| Feature Area                 | Route & Demo                                                                                                                                                                                                                                                             | Description                                                                                                                                | Implementation Status                                |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Quickstart**               | [/quickstart](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/quickstart.ts)                                                                                                                               | Baseline chat integration with `provideCopilotKit` and `<copilot-chat />`                                                                  | `Working`                                            |
| **Chat UI & Theming**        | [/chat-ui](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/chat-ui.ts)                                                                                                                                     | Embedded, sidebar (`CopilotSidebar`), and popup (`CopilotPopup`) surfaces + custom message components                                      | `Working`                                            |
| **Frontend Tools & Gen UI**  | [/frontend-tools-generative-ui](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/frontend-tools-generative-ui.ts)                                                                                           | Server-side tools rendered in Angular (`WeatherCardComponent`), browser-side tools (`change_background`), sandboxed Open Generative UI, and the display-only `registerComponent` path, which runs. | `Partial` (the `registerComponent` snippet ships four defects) |
| **Human-In-The-Loop (HITL)** | [/human-in-the-loop](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/human-in-the-loop.ts)                                                                                                                 | User confirmation dialogs (`registerHumanInTheLoop`, `ApprovalCardComponent`) and interrupt panels                                         | `Working`                                            |
| **Shared State & Context**   | [/shared-state](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/shared-state.ts)                                                                                                                           | Synchronized state (`injectAgentStore`) and contextual metadata injection (`AccountContextComponent`, `SelectionContextComponent`)         | `Working`                                            |
| **Attachments**              | [/attachments](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/attachments.ts)                                                                                                                             | File picker, drag-and-drop, and clipboard image pasting via `AttachmentsConfig`                                                            | `Working`                                            |
| **Headless UI**              | [/headless](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/headless.ts)                                                                                                                                   | Custom transcript and message composer built entirely from scratch using `injectAgentStore` & `runAgent`                                   | `Working`                                            |
| **A2UI (Adaptive UI)**       | [/a2ui](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/a2ui.ts)                                                                                                                                           | Declarative UI driven by runtime A2UI middleware; recovery timers and styling                                                              | `Partial` (Awaiting catalog definition)              |
| **Voice & Multimodal**       | [/voice-multimodal](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/voice-multimodal.ts)                                                                                                                   | Voice recording controls and multimodal payload generation                                                                                 | `Partial` (No cloud transcription service wired)     |
| **Threads & Memory**         | [/threads](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/threads.ts), [/memory](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/pages/memory.ts) | Multi-turn thread management and persistent agent memories                                                                                 | `Partial` (Requires CopilotKit Intelligence license) |

---

### Key Architectural Highlights

1. **Dual Routing Structure (Doc vs Demo)**:
   - Every feature has a documentation view (`/feature`) that explains the concept, provides manual pass/fail test instructions, and renders syntax-highlighted source code.
   - Every feature also has a chrome-free demo view (`/feature/demo`), isolated from sidebars and headers so it can be tested or screen-recorded cleanly.
2. **Byte-Identical Code Embedding**:
   - The script [scripts/generate-sources.ts](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/scripts/generate-sources.ts) runs at `prestart` and `prebuild` time.
   - It reads actual `.ts`, `.html`, and `.css` files from disk and compiles them into a source map in `generated-sources.ts`. What the documentation UI renders is guaranteed to be the exact code being executed.
3. **Real-time Backend Health Monitoring**:
   - [backend-health.ts](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/frontend/src/app/components/backend-health.ts) continuously verifies connectivity to both the Copilot Runtime (`http://localhost:8201/api/copilotkit/info`) and the Python Agent Framework (`http://localhost:8200/openapi.json`).

---

### How to Run the Project

#### 1. Backend (Python Agent Framework)

```bash
cd backend
# Requires Python 3.13+ and uv (or virtualenv)
uv sync
uv run main.py
# Runs on http://localhost:8200
```

_Note: Ensure either `OPENAI_API_KEY` or `AZURE_OPENAI_ENDPOINT` + `AZURE_OPENAI_API_KEY` are configured in `.env`._

#### 2. Copilot Runtime & Angular Frontend

```bash
cd frontend
npm install

# Option A: Run runtime and frontend concurrently
npm run dev

# Option B: Run separately
npm run runtime    # Starts Copilot Runtime on http://localhost:8201
npm start          # Starts Angular Dev Server on http://localhost:4202
```

#### 3. Automated Screen Recording & Demonstration Suite

Lives in [autorecorder/](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/autorecorder) — a portable suite shared across CopilotKit
framework repos and adapted to this one through `config/` and `actions/` only.
See [autorecorder/README.md](file:///c:/Users/dynamic%20computer/Desktop/work/FIQROS/optimized-malaika/mspy-angular/autorecorder/README.md) for the full contract; it replaces the earlier
`frontend/scripts/record-all-pages.ts`.

Each of the 11 pages gets one video in three steps: the official doc page, a
simulated VS Code showing this repo's own source at the relevant lines, then the
chrome-free `/demo` route driven live.

##### One command, from a cold repo

[`ci/`](ci/README.md) drives the whole thing — doc-drift check, preflight,
dependency install, all three servers, recording and report — from a single Node
process, and is what the nightly GitHub Actions workflow runs:

```bash
npm run automate                              # everything, all pages
npm run automate -- --pages=quickstart,threads
npm run automate -- --limit=3 --ignore-doc-drift
```

It starts the servers itself. The commands below are the by-hand route, against
servers you started yourself.

Once the backend (`8200`), runtime (`8201`), and frontend dev server (`4202`) are running:

```bash
cd autorecorder
npm install
npx playwright install chromium

npm run doctor            # validate the configuration (exits 1 on error)
npm run doctor:online     # also probe every doc/demo URL and the selectors
npm run record -- --list  # what will be recorded

# Record all 11 pages in nav order
npm run record

# Record a specific page individually
npm run record -- --quickstart
npm run record -- --page=chat-ui
npm run record -- --filter=threads
```

Recordings are saved to `autorecorder/videos/MSPY-angular-<NN>-<Name>.webm`.
That folder is gitignored: videos are build output, and the previous recorder's
committed clips in `frontend/recordings/` had grown to 51MB.

#### 4. Documentation Drift & Sync

To verify that the project documentation snapshots remain byte-identical with live upstream docs at `https://docs.copilotkit.ai/angular/ms-agent-python`:

```bash
cd frontend

# Check for doc drift without modifying files
npm run doc:check

# Synchronize doc snapshots, manifest, changelog, and diff reports
npm run doc:sync
```

---

### Upgrading Packages

Most upgrades need no action. Every run drops the lockfiles and re-resolves, so
the newest versions the declared ranges already allow are installed and recorded
the night they ship. What follows is only for **crossing a range boundary**,
which is a reviewed edit.

#### What is worth upgrading — check first

```powershell
node ci/check-versions.mjs
```

Read-only. It sorts what is outdated into the only three things it can be, and
just one of them is actionable here:

| Cause | Do |
|---|---|
| Our range is behind | Bump it — the steps below |
| An upstream package **exact-pins** an older version | Nothing. Report it upstream |
| A **peerDependency** forbids the newer one | Nothing. Bumping breaks the build |

`@copilotkit/angular` exact-pins `@copilotkit/core`, and Angular 22 requires
`typescript >=6.0 <6.1` — so TypeScript reads a full major behind and must stay
there. The nightly publishes this report on its own; see
[`ci/VERSION-WATCH.md`](ci/VERSION-WATCH.md).

#### 1. Frontend (Angular / npm)

```powershell
git checkout -b chore/bump-<package>
npm --prefix frontend install <package>@<version>
git diff frontend/package-lock.json   # one bump can drag in dozens of transitives
npm --prefix frontend run build
```

Then record the affected pages before merging — verifying the docs still run is
what this repo is for. Revert with
`git checkout frontend/package-lock.json; npm ci`.

Two things not to do:

- **`npx npm-check-updates -u`** rewrites `package.json` to the newest release of
  everything, ignoring the ranges. It used to run in CI and was the largest
  single source of failures — it bumped all twelve `@angular/*` packages past
  Angular's exact inter-package peer requirements, leaving the tree
  unsatisfiable. Removed in `1c9b067`.
- **`npm install --legacy-peer-deps`** does not fix a peer conflict, it hides
  one. The error it silences is the signal that the combination being installed
  was never meant to work together — precisely what this harness reports on.

#### 2. Backend (Python / uv)

```powershell
cd backend
uv lock --upgrade
uv sync
```

This moves `uv.lock` to the newest versions `pyproject.toml` already allows.
Raising a floor in `pyproject.toml` follows the same branch-and-verify path as
the frontend.

