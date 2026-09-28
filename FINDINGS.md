# Findings — MsPy-angular
Open doc defects only. An entry is added only after the user approves it. Numbers are stable IDs.
Stack: `@copilotkit/angular` 0.5.2, `@copilotkit/runtime` 1.73.3, `@copilotkit/web-inspector` 1.70.2 (exact-pinned by angular). `ng serve` type-checks, so TS errors show up in dev.

## Dev blockers (seen with `ng serve` and normal use of the page)

### Guides - Frontend tools and generative UI
- #2 **Server-rendered weather card shows an empty heading.** The page's `registerRenderToolCall` path renders a tool that runs on the agent, but the page never shows that server tool. It writes the renderer against `city` only:
  ```ts
  type WeatherArgs = { city: string };
  …
  <strong>{{ call.args.city }}</strong>
  …
  registerRenderToolCall({
    name: "getWeather",
    args: z.object({ city: z.string() }),
    component: WeatherCardComponent,
  });
  ```
  The Agent Framework agent's `getWeather` takes `location` (`def getWeather(location: Annotated[str, Field(description="The location to get weather for")])`), so `call.args.city` is `undefined`. The card renders with a blank `<strong>` and no error. Nothing on the page says the renderer's arg names must match the agent tool's parameters. Recorded 2026-09-25 (`MSPY-angular-03-FrontendToolsGenerativeUi.webm`): "Weather card heading rendered empty -- the argument names in the renderer do not match the tool call." Installed `@copilotkit/angular` 0.5.2 (declared `^0.5.2`).

## Minor notes
- #1 Quickstart (and landing): Step 3 says to open **Rich Threads**, but the web-inspector 1.70.2 tab is "Threads". "Rich Threads" is only the launcher menu row.

## Build-only
None.
