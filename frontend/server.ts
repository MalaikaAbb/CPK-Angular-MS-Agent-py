/**
 * Copilot Runtime for this harness.
 *
 * Shape comes from the Angular quickstart's Node runtime server, with the
 * agent swapped for the Microsoft Agent Framework backend in `../backend`.
 *
 * That backend exposes a plain AG-UI endpoint —
 * `add_agent_framework_fastapi_endpoint(app=app, agent=agent, path="/")` in
 * backend/main.py mounts a single `POST /` that streams AG-UI events over SSE.
 *
 * `default` and `support` resolve to the same Agent Framework process.
 * `support` exists so the doc snippets that use `agentId="support"` (Chat UI,
 * Threads) run verbatim.
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
  },
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

// quickstart : create copilot node listener start
createServer(
  createCopilotNodeListener({
    runtime,
    basePath: "/api/copilotkit",
    cors: true,
  }),
).listen(port, () => {
  console.log(
    `Copilot Runtime listening at http://localhost:${port}/api/copilotkit`,
  );
  console.log(`Microsoft Agent Framework agent: ${agentUrl}`);
});
// quickstart : create copilot node listener end
