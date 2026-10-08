/**
 * Copilot Runtime for this harness.
 *
 * Shape comes from the Angular quickstart's Node runtime server, with the
 * agent swapped for the Microsoft Agent Framework backend in `../backend`.
 *
 * That backend exposes plain AG-UI endpoints —
 * `add_agent_framework_fastapi_endpoint(...)` in backend/main.py mounts
 * `POST /` (the default agent), `POST /subagents` (the Sub-Agents supervisor)
 * and `POST /research` (the AG-UI guide's `research-agent`), each streaming
 * AG-UI events over SSE.
 *
 * `default` and `support` resolve to the same Agent Framework agent.
 * `support` exists so the doc snippets that use `agentId="support"` (Chat UI,
 * Threads) run verbatim. The agents-map key is the only name the frontend can
 * ask for (Copilot Runtime guide, "Which name identifies an agent").
 *
 * `a2ui: {}` enables A2UIMiddleware for every registered agent, per
 * https://docs.copilotkit.ai/angular/ms-agent-python/backend/copilot-runtime
 * — it is a runtime-side middleware and is independent of which agent binding
 * is used.
 *
 * Ports: backend/main.py binds 8221, so the runtime moved to 8220. Override
 * either side with PORT / MICROSOFT_AGENT_FRAMEWORK_URL.
 */
// quickstart : copilot runtime
import { createServer } from "node:http";
import { CopilotRuntime, CopilotKitIntelligence } from "@copilotkit/runtime/v2";
import { createCopilotNodeListener } from "@copilotkit/runtime/v2/node";
import { HttpAgent } from "@ag-ui/client";

const agentUrl =
  process.env["MICROSOFT_AGENT_FRAMEWORK_URL"] ?? "http://localhost:8221/";

/**
 * Intelligence client, verbatim from
 * https://docs.copilotkit.ai/angular/ms-agent-python/intelligence/connect-your-runtime
 * ("Wire the runtime"). Thread endpoints are served by Intelligence, so the
 * Threads guide's `injectThreads` list and `CopilotThreadsDrawer` resolve to
 * nothing until this is passed — which that guide never says.
 *
 * `apiUrl`/`wsUrl` default to the managed platform, so both stay unset.
 */
const intelligence = new CopilotKitIntelligence({
  apiKey: process.env["CPK_INTELLIGENCE_API_KEY"]!,
});

// quickstart : copilot runtime start
const runtime = new CopilotRuntime({
  agents: {
    // quickstart : connect selected agent backend
    default: new HttpAgent({ url: agentUrl }),
    // chat ui : support agent
    support: new HttpAgent({ url: agentUrl }),
    // subagents : supervisor agent (backend/subagents_agent.py)
    subagents: new HttpAgent({ url: `${agentUrl}subagents` }),
    // ag-ui : research agent (backend/research_agent.py, self-defined)
    "research-agent": new HttpAgent({ url: `${agentUrl}research` }),
  },
  // auth : forward identity deliberately start
  forwardHeaders: {
    allow: ["authorization", "x-tenant-id"],
  },
  // auth : forward identity deliberately end
  // a2ui : enable a2ui middleware start
  a2ui: {},
  // a2ui : enable a2ui middleware end
  intelligence,
  // Threads are per-user. Without this every visitor shares one history.
  identifyUser: (request) => ({
    id: request.headers.get("x-user-id") ?? "anonymous",
    name: request.headers.get("x-user-name") ?? "Anonymous",
  }),
});
// quickstart : copilot runtime end

const port = Number(process.env["PORT"] ?? 8220);

/**
 * Credentialed CORS, from the Authentication guide's "Send cookies to a
 * cross-origin runtime": the app sets `credentials: "include"`, so the runtime
 * must answer with `credentials: true` and the app's exact origins — never
 * `*`. These are the two origins this repo serves the app from: `ng serve`
 * (package.json `start`) and the built SSR server (src/server.ts).
 *
 * `allowHeaders` must be listed too. The default is `["*"]`, and browsers
 * treat `*` literally on credentialed requests — so every JSON POST and every
 * `Authorization` header failed its preflight until this list was added. It
 * holds what the client sends (`content-type`, `authorization`), the license
 * header `provideCopilotKit` adds when a key is set, the `x-user-*` headers
 * `identifyUser` reads, and the `x-tenant-id` the forwardHeaders allowlist
 * names.
 */
const cors = {
  origin: ["http://localhost:4220", "http://localhost:4222"],
  credentials: true,
  allowHeaders: [
    "content-type",
    "authorization",
    "x-copilotcloud-public-api-key",
    "x-user-id",
    "x-user-name",
    "x-tenant-id",
  ],
};

// auth : authenticated runtime start
/**
 * A second runtime for the /auth demo, gated by the Authentication guide's
 * `onRequest` hook. It is separate — as in the CopilotKit showcase's
 * `/api/copilotkit-auth` route — because gating the main runtime would answer
 * 401 to every other route in this harness.
 *
 * The guide's `createCopilotExpressHandler` is swapped for the
 * `createCopilotNodeListener` this server already uses; both take the same
 * `hooks` option. `verifySession` is not defined by the guide: it is the
 * showcase's static demo-token check. Never use a hard-coded shared secret
 * for real auth.
 */
const DEMO_TOKEN = "demo-token-123";

async function verifySession(token: string) {
  return token === DEMO_TOKEN ? { token } : null;
}

const authRuntime = new CopilotRuntime({
  agents: {
    default: new HttpAgent({ url: agentUrl }),
  },
});

const authListener = createCopilotNodeListener({
  runtime: authRuntime,
  basePath: "/api/copilotkit-auth",
  cors,
  hooks: {
    onRequest: async ({ request }) => {
      const token = request.headers
        .get("authorization")
        ?.replace(/^Bearer\s+/i, "");
      const session = token ? await verifySession(token) : null;

      if (!session) {
        throw new Response("Unauthorized", { status: 401 });
      }
    },
  },
});
// auth : authenticated runtime end

// quickstart : create copilot node listener start
const listener = createCopilotNodeListener({
  runtime,
  basePath: "/api/copilotkit",
  cors,
});

createServer((req, res) =>
  req.url?.startsWith("/api/copilotkit-auth")
    ? authListener(req, res)
    : listener(req, res),
).listen(port, () => {
  console.log(
    `Copilot Runtime listening at http://localhost:${port}/api/copilotkit`,
  );
  console.log(
    `Authenticated runtime listening at http://localhost:${port}/api/copilotkit-auth`,
  );
  console.log(`Microsoft Agent Framework agent: ${agentUrl}`);
});
// quickstart : create copilot node listener end
