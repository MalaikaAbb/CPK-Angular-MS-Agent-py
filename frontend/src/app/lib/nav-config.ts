/**
 * The nav, every route header, the demo links, and the README status table all
 * read from here, so a doc page and its implementation status are described
 * exactly once.
 *
 * Groups mirror the sidebar at
 * https://docs.copilotkit.ai/angular/ms-agent-python. The last doc page covers
 * four topics at once; it is split into four routes here, which all point back
 * at the same `docPath`.
 *
 * There is exactly one doc-sync date in this repo, and it is not here: it is
 * `syncedAt` in `doc-snapshot/manifest.json`, written every time the sync
 * runs. A hand-maintained constant here could only ever drift out of
 * agreement with the machine one, so it was removed — `/doc-sync` is the
 * single place that answers "how current are these docs".
 */
export const DOCS_ROOT = 'https://docs.copilotkit.ai/angular/ms-agent-python';

/**
 * working   — implemented and exercisable against the local stack.
 * partial   — implemented, but something outside this repo limits it
 *             (a premium license, a runtime capability this repo does not run).
 * reference — intentionally not a live feature; notes surface only.
 * broken    — implemented but currently failing.
 */
export type RouteStatus =
  | 'working'
  | 'partial'
  | 'reference'
  | 'broken'
  | 'not-started';

export interface RouteMeta {
  /** App route path. */
  path: string;
  /** Nav label. */
  title: string;
  /** Doc page this route tests, relative to docs.copilotkit.ai. */
  docPath: string;
  /** One-line description in our own words. */
  summary: string;
  status: RouteStatus;
  /** Shown in the route header when the status is not plain "working". */
  statusNote?: string;
  /** Feature requires a CopilotKit Enterprise Intelligence license. */
  premium?: boolean;
  /**
   * This route owns a live interactive surface, which lives at `<path>/demo`
   * rather than on the page itself. The doc route keeps the explanation and the
   * source; the demo route is chrome-free so it can be screen-recorded alone.
   */
  hasDemo?: boolean;
}

/** Where a route's interactive demo lives, if it has one. */
export function demoPath(route: RouteMeta): string | undefined {
  if (!route.hasDemo) return undefined;
  return route.path === '/' ? '/demo' : `${route.path}/demo`;
}

export interface NavGroup {
  title: string;
  routes: RouteMeta[];
}

export const NAV: NavGroup[] = [
  {
    title: 'Getting Started',
    routes: [
      {
        path: '/',
        title: 'Introduction',
        docPath: '/angular/ms-agent-python',
        summary:
          'What this harness covers and how the three processes fit together.',
        status: 'reference',
        statusNote: 'Landing page — orientation and a live connection check.',
      },
      {
        path: '/quickstart',
        hasDemo: true,
        title: 'Quickstart',
        docPath: '/angular/ms-agent-python/quickstart',
        summary:
          'The smallest end-to-end path: an HttpAgent in Copilot Runtime pointed at the Agent Framework endpoint, provideCopilotKit, and one copilot-chat.',
        status: 'working',
      },
      {
        path: '/inspector',
        hasDemo: true,
        title: 'Inspector',
        docPath: '/angular/ms-agent-python/inspector',
        summary:
          'The Inspector @copilotkit/angular mounts for you as of 0.4.0 — nothing to install, nothing to mount, and nothing to retract here.',
        status: 'working',
      },
    ],
  },
  {
    title: 'Guides',
    routes: [
      {
        path: '/chat-ui',
        hasDemo: true,
        title: 'Chat UI and customization',
        docPath: '/angular/ms-agent-python/guides/chat-ui',
        summary:
          'The four chat surfaces, a replaced assistant-message component, and scoped chat CSS.',
        status: 'working',
      },
      {
        path: '/frontend-tools-generative-ui',
        hasDemo: true,
        title: 'Frontend tools and generative UI',
        docPath: '/angular/ms-agent-python/guides/frontend-tools-generative-ui',
        summary:
          'A server-side tool call rendered by an Angular component, plus the sandboxed Open Generative UI path.',
        status: 'partial',
        statusNote:
          'All three of the guide’s generative-UI paths are live: the server-side tool call, the browser-executed tool, and registerComponent, which declares show_incident from the browser with no change to the Agent Framework process. The new first section runs, and its published snippet is wrong in four ways. It carries no handler, so core returns an empty tool result and the model apologises for the card it just drew — followUp: false suppresses that and the guide never mentions followUp. It guards on status "in-progress" while the real status is "executing", so the guard never fires and the card paints empty first. The status never reaches "complete" at all, so the gate-on-complete pattern taught higher up the same page would load forever here. And it ships no CSS, so with Angular’s default preserveWhitespaces the card renders as the run-together string INC-4711sev1. Everything is kept verbatim. See the route page.',
      },
      {
        path: '/a2ui',
        hasDemo: true,
        title: 'A2UI schemas, styling, and recovery',
        docPath: '/angular/ms-agent-python/guides/a2ui',
        summary:
          'Declarative generative UI driven by the runtime A2UI middleware, with the guide’s recovery thresholds and catalog CSS.',
        status: 'partial',
        statusNote:
          'Inert until a catalog is supplied. /info reports a2uiEnabled: true, but supplying a2ui.catalog is what actually registers the render_a2ui renderer — and the guide’s catalog snippet is not self-contained. See Known issues.',
      },
      {
        path: '/voice-multimodal',
        hasDemo: true,
        title: 'Voice and multimodal input',
        docPath: '/angular/ms-agent-python/guides/voice-multimodal',
        summary:
          'The built-in microphone control, an attachments config, and a programmatically constructed multimodal message.',
        status: 'partial',
        statusNote:
          'The microphone renders and records, but this repo’s runtime has no transcription service configured, so transcription fails by design.',
      },
      {
        path: '/human-in-the-loop',
        hasDemo: true,
        title: 'Human-in-the-loop and interrupts',
        docPath: '/angular/ms-agent-python/guides/human-in-the-loop',
        summary:
          'A decision tool that pauses the run until the user answers, plus a headless interrupt controller.',
        status: 'working',
        statusNote:
          'The tool path is live. The interrupt panel is mounted but stays idle unless the agent emits an AG-UI interrupt.',
      },
      {
        path: '/shared-state',
        hasDemo: true,
        title: 'Shared state and agent context',
        docPath: '/angular/ms-agent-python/guides/shared-state',
        summary:
          'Reading and writing agent state through injectAgentStore, and publishing read-only app context two ways.',
        status: 'working',
      },
      {
        path: '/webmcp',
        hasDemo: true,
        title: 'WebMCP',
        docPath: '/angular/ms-agent-python/webmcp',
        summary:
          'A frontend tool opted into WebMCP with webmcp: { annotations }, so the same handler serves the CopilotKit agent and browser agents via document.modelContext.',
        status: 'partial',
        statusNote:
          'WebMCP is experimental: browser agents can only discover the tool in Chrome 149+ with the origin trial or chrome://flags/#enable-webmcp-testing. Elsewhere CopilotKit registers nothing, and only the chat path runs.',
      },
    ],
  },
  {
    title: 'Threads, memory, attachments, headless',
    routes: [
      {
        path: '/threads',
        hasDemo: true,
        title: 'Threads',
        docPath: '/angular/ms-agent-python/guides/threads-memory-attachments-headless',
        summary:
          'A hand-built thread list on injectThreads, and the drop-in CopilotThreadsDrawer beside a chat.',
        status: 'partial',
        premium: true,
        statusNote:
          'Thread endpoints come from the Enterprise Intelligence Platform. Unlicensed, the list stays empty and the drawer renders its locked state — which is the expected result here.',
      },
      {
        path: '/memory',
        hasDemo: true,
        title: 'Memory',
        docPath: '/angular/ms-agent-python/guides/threads-memory-attachments-headless',
        summary:
          'injectMemories with the isAvailable() gate the guide requires before showing memory controls.',
        status: 'partial',
        premium: true,
        statusNote:
          'This runtime does not provide the memory routes, so isAvailable() is false and the guide’s fallback message is what renders.',
      },
      {
        path: '/attachments',
        hasDemo: true,
        title: 'Attachments',
        docPath: '/angular/ms-agent-python/guides/threads-memory-attachments-headless',
        summary:
          'An AttachmentsConfig bound to copilot-chat, with the file picker, drag-and-drop, and paste.',
        status: 'working',
      },
      {
        path: '/headless',
        hasDemo: true,
        title: 'Headless UI',
        docPath: '/angular/ms-agent-python/guides/threads-memory-attachments-headless',
        summary:
          'A transcript and composer built from scratch on injectAgentStore and CopilotKitCore.runAgent.',
        status: 'working',
      },
    ],
  },
  {
    title: 'Runtime and protocol',
    routes: [
      {
        path: '/copilot-runtime',
        hasDemo: true,
        title: 'Copilot Runtime',
        docPath: '/angular/ms-agent-python/copilot-runtime',
        summary:
          'Several agents behind one runtime: the default agent with no agentId, and research-agent addressed by its agents-map key.',
        status: 'working',
      },
      {
        path: '/ag-ui',
        hasDemo: true,
        title: 'AG-UI',
        docPath: '/angular/ms-agent-python/ag-ui',
        summary:
          'injectAgentStore signals for message count and run status, and a raw AG-UI event subscription on store().agent.',
        status: 'partial',
        statusNote:
          'The message count and run status work. The guide subscribes to store().agent in the constructor, before injectAgentStore has resolved the real agent, so onTextMessageContentEvent and onToolCallEndEvent never fire there (onStateChanged does). Subscribing after mount does receive events.',
      },
      {
        path: '/auth',
        hasDemo: true,
        title: 'Authentication',
        docPath: '/angular/ms-agent-python/auth',
        summary:
          'A runtime gated by an onRequest hook, session headers set through updateRuntime, a forwardHeaders allowlist, and credentialed CORS.',
        status: 'working',
      },
    ],
  },
  {
    title: 'Multi-agent',
    routes: [
      {
        path: '/subagents',
        hasDemo: true,
        title: 'Sub-agents',
        docPath: '/angular/ms-agent-python/multi-agent/subagents',
        summary:
          'A supervisor delegating to research, writing, and critique sub-agents, with a live delegation log driven by shared state.',
        status: 'broken',
        statusNote:
          'Delegations fail with "bound to a different event loop": the showcase’s sync bridge runs each sub-agent on a new event loop in a worker thread, but the sub-agents share the supervisor’s chat client, which is bound to the server’s loop. Failed delegations are logged as "failed", which the UI filters out, so the log stays at 0.',
      },
    ],
  },
  {
    title: 'Doc Sync',
    routes: [
      {
        path: '/doc-sync',
        title: 'Doc drift',
        docPath: '/angular/ms-agent-python',
        summary:
          'Re-fetches the markdown behind every tracked doc page and diffs it against the stored snapshot, flagging changes inside code blocks.',
        status: 'reference',
      },
    ],
  },
];

export const ALL_ROUTES: RouteMeta[] = NAV.flatMap((g) => g.routes);

export function findRoute(path: string): RouteMeta | undefined {
  return ALL_ROUTES.find((r) => r.path === path);
}

export function docUrl(route: RouteMeta): string {
  return `https://docs.copilotkit.ai${route.docPath}`;
}

export const STATUS_LABEL: Record<RouteStatus, string> = {
  working: 'Working',
  partial: 'Partial',
  reference: 'Reference',
  broken: 'Broken',
  'not-started': 'Not started',
};
