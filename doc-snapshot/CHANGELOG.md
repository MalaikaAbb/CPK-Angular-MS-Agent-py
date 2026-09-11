# Doc drift changelog

What the CopilotKit Angular + Microsoft Agent Framework docs changed under this repo.
Only pages that actually moved are recorded — a sync that finds everything unchanged writes nothing here at all.

Holds the 3 most recent dated entries. When a change lands on a fourth date, the oldest entry is dropped.

## 2026-08-30

### 13:43 UTC — 2 pages, highest severity low

**Low — Angular**

`/angular/ms-agent-python` · route `/` · under “Getting started”

0 code lines, 2 prose lines changed.

```diff
          ### Open Inspector and confirm setup
  
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
+ On localhost, click the Inspector button in the corner of the app.
  
```

**Low — Angular**

`/angular/ms-agent-python/quickstart` · route `/quickstart` · under “Getting started”

0 code lines, 2 prose lines changed.

```diff
          ### Open Inspector and confirm setup
  
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
+ On localhost, click the Inspector button in the corner of the app.
  
```

## 2026-08-27

### 07:29 UTC — 4 pages, highest severity high

**Medium — Angular**

`/angular/ms-agent-python` · route `/` · under “Next steps”

0 code lines, 368 prose lines changed.

```diff
- # Angular
- 
- > Connect an Angular app to Copilot Runtime with CopilotKit.
- 
- 
- `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/ms-agent-python/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
- 
- The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
-   surface="docs:angular/quickstart:production"
- />
- 
- ## What is CopilotKit for Angular?
- 
- CopilotKit for Angular is the first-party, signal-based Angular frontend for
- AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
- headless APIs, and it supports zoneless applications.
- 
- ## Prerequisites
- 
- - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 22
- - Node.js 22
- 
- ## Getting started
- 
- <Steps>
-     <Step>
-         ### Create your Angular app
- 
-         If you don't have one already, pin the CLI to the supported major:
- 
-         ```bash
-         npx @angular/cli@22 new my-copilot-app
-         cd my-copilot-app
-         ```
-     </Step>
-     <Step>
-         ### Install CopilotKit
- 
-         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
- 
-         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
-             <Tab value="npm">
-                 ```bash
-                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 npm install -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="pnpm">
-                 ```bash
-                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 pnpm add -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="yarn">
-                 ```bash
-                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 yarn add -D tsx typescript @types/node
-                 ```
-             </Tab>
-         </Tabs>
- 
-         <Callout type="info" title="Match @angular/cdk to your Angular version">
-           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
-         </Callout>
-     </Step>
-     
-     
-       <Step>
-         ### Connect the selected agent backend
- 
-         This URL keeps the agent backend selected. The Angular setup remains
-         shared; the backend setup below comes from that integration's canonical
-         showcase source.
- 
-         <!-- setup skipped: agent-setup is not bundled for ms-agent-python -->
- 
-         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
-           Configure Copilot Runtime to register this backend as the `default`
-           agent at `/api/copilotkit`. Continue with the selected backend's
-           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
-           adapter, credentials, and server command. Do not replace it with the
-           `BuiltInAgent` server from the standalone Angular path.
-         </Callout>
-       </Step>
-     
-     <Step>
-         ### Import the styles
- 
-         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
- 
-         ```css title="src/styles.css"
-         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
-         ```
-     </Step>
-     <Step>
-         ### Connect to Copilot Runtime
- 
-         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
- 
-         ```ts title="src/app/app.config.ts"
-         import { ApplicationConfig } from "@angular/core";
-         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
- 
-         export const appConfig: ApplicationConfig = {
-           providers: [
-             // [!code highlight:3]
-             provideCopilotKit({
-               runtimeUrl: "http://localhost:8200/api/copilotkit",
-             }),
-           ],
-         };
-         ```
-     </Step>
-     <Step>
-         ### Add the chat UI
- 
-         Import the `CopilotChat` component into your root component and drop it into the template.
- 
-         ```ts title="src/app/app.ts"
-         import { Component } from "@angular/core";
-         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
- 
-         @Component({
-           selector: "app-root",
-           imports: [CopilotChat], // [!code highlight]
-           template: `
-             <!-- [!code highlight:3] -->
-             <div style="height: 100vh">
-               <copilot-chat />
-             </div>
-           `,
-         })
-         export class App {}
-         ```
- 
-     </Step>
-     
-     
-       <Step>
-         ### Run the backend, runtime, and Angular app
- 
-         Start the selected agent backend and Copilot Runtime with the commands
-         from its runtime guide. Confirm
-         `http://localhost:8200/api/copilotkit/info` reports the `default`
-         agent, then start Angular:
- 
-         ```bash
-         npm start
-         ```
- 
-         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
-         message. The request now follows the selected path end to end:
-         Angular → Copilot Runtime → your selected agent backend.
-       </Step>
-     
-     <Step>
-         ### Open Inspector and confirm setup
- 
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
- 
- 1. Open **Agents**, then **Agent**. Your agent is listed.
- 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
- 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
- 
- More detail: [Inspector](/angular/ms-agent-python/inspector).
- 
-     </Step>
- 
- </Steps>
- 
- ## Next steps
- 
- - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
- - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
- - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
- - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
- - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
- - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
+ # Angular
+ 
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/ms-agent-python/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
+ />
+ 
+ ## What is CopilotKit for Angular?
+ 
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for ms-agent-python -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/ms-agent-python/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
```

**Medium — Angular**

`/angular/ms-agent-python/quickstart` · route `/quickstart` · under “Next steps”

0 code lines, 368 prose lines changed.

```diff
- # Angular
- 
- > Connect an Angular app to Copilot Runtime with CopilotKit.
- 
- 
- `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/ms-agent-python/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
- 
- The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
- 
- <OpsPlatformCTA
-   variant="inline"
-   title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
-   surface="docs:angular/quickstart:production"
- />
- 
- ## What is CopilotKit for Angular?
- 
- CopilotKit for Angular is the first-party, signal-based Angular frontend for
- AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
- headless APIs, and it supports zoneless applications.
- 
- ## Prerequisites
- 
- - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 22
- - Node.js 22
- 
- ## Getting started
- 
- <Steps>
-     <Step>
-         ### Create your Angular app
- 
-         If you don't have one already, pin the CLI to the supported major:
- 
-         ```bash
-         npx @angular/cli@22 new my-copilot-app
-         cd my-copilot-app
-         ```
-     </Step>
-     <Step>
-         ### Install CopilotKit
- 
-         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
- 
-         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
-             <Tab value="npm">
-                 ```bash
-                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 npm install -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="pnpm">
-                 ```bash
-                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 pnpm add -D tsx typescript @types/node
-                 ```
-             </Tab>
-             <Tab value="yarn">
-                 ```bash
-                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
-                 yarn add -D tsx typescript @types/node
-                 ```
-             </Tab>
-         </Tabs>
- 
-         <Callout type="info" title="Match @angular/cdk to your Angular version">
-           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
-         </Callout>
-     </Step>
-     
-     
-       <Step>
-         ### Connect the selected agent backend
- 
-         This URL keeps the agent backend selected. The Angular setup remains
-         shared; the backend setup below comes from that integration's canonical
-         showcase source.
- 
-         <!-- setup skipped: agent-setup is not bundled for ms-agent-python -->
- 
-         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
-           Configure Copilot Runtime to register this backend as the `default`
-           agent at `/api/copilotkit`. Continue with the selected backend's
-           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
-           adapter, credentials, and server command. Do not replace it with the
-           `BuiltInAgent` server from the standalone Angular path.
-         </Callout>
-       </Step>
-     
-     <Step>
-         ### Import the styles
- 
-         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
- 
-         ```css title="src/styles.css"
-         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
-         ```
-     </Step>
-     <Step>
-         ### Connect to Copilot Runtime
- 
-         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
- 
-         ```ts title="src/app/app.config.ts"
-         import { ApplicationConfig } from "@angular/core";
-         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
- 
-         export const appConfig: ApplicationConfig = {
-           providers: [
-             // [!code highlight:3]
-             provideCopilotKit({
-               runtimeUrl: "http://localhost:8200/api/copilotkit",
-             }),
-           ],
-         };
-         ```
-     </Step>
-     <Step>
-         ### Add the chat UI
- 
-         Import the `CopilotChat` component into your root component and drop it into the template.
- 
-         ```ts title="src/app/app.ts"
-         import { Component } from "@angular/core";
-         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
- 
-         @Component({
-           selector: "app-root",
-           imports: [CopilotChat], // [!code highlight]
-           template: `
-             <!-- [!code highlight:3] -->
-             <div style="height: 100vh">
-               <copilot-chat />
-             </div>
-           `,
-         })
-         export class App {}
-         ```
- 
-     </Step>
-     
-     
-       <Step>
-         ### Run the backend, runtime, and Angular app
- 
-         Start the selected agent backend and Copilot Runtime with the commands
-         from its runtime guide. Confirm
-         `http://localhost:8200/api/copilotkit/info` reports the `default`
-         agent, then start Angular:
- 
-         ```bash
-         npm start
-         ```
- 
-         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
-         message. The request now follows the selected path end to end:
-         Angular → Copilot Runtime → your selected agent backend.
-       </Step>
-     
-     <Step>
-         ### Open Inspector and confirm setup
- 
- Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
- 
- 1. Open **Agents**, then **Agent**. Your agent is listed.
- 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
- 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
- 
- More detail: [Inspector](/angular/ms-agent-python/inspector).
- 
-     </Step>
- 
- </Steps>
- 
- ## Next steps
- 
- - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
- - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
- - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
- - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
- - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
- - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
+ # Angular
+ 
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/ms-agent-python/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
+ />
+ 
+ ## What is CopilotKit for Angular?
+ 
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for ms-agent-python -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/ms-agent-python/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
```

**High — A2UI schemas, styling, and recovery**

`/angular/ms-agent-python/guides/a2ui` · route `/a2ui` · under “Next steps”

236 code lines, 152 prose lines changed.

```diff
- # A2UI schemas, styling, and recovery
- 
- > Configure typed A2UI catalogs, Angular-owned styles, and incomplete-stream recovery.
- 
- A2UI renders declarative interface operations and snapshots inside Angular
- chat. Configure it with a catalog of allowed components; the renderer creates
- only components that the catalog defines.
- 
- ## What is A2UI?
- 
- A2UI is CopilotKit's declarative generative UI path for Angular. Instead of
- asking an agent to emit arbitrary component code, you give it a typed catalog
- and render only the operations that match that catalog.
- 
- ## Choose a schema strategy
- 
- Catalog component definitions use Zod schemas for their props. A broad catalog
- lets the agent compose several application primitives. A fixed catalog narrows
- the generated interface to a specific domain and set of shapes.
- 
- The flight example keeps its component vocabulary deliberately small:
- 
- ```typescript
- // features/a2ui/a2ui-catalogs.ts
- const fixedDefinitions = {
-   Card: { props: z.object({ child: z.string() }) },
-   Title: { props: z.object({ text: dynamicString }) },
-   Airport: { props: z.object({ code: dynamicString }) },
-   Arrow: { props: z.object({}) },
-   AirlineBadge: { props: z.object({ name: dynamicString }) },
-   PriceTag: { props: z.object({ amount: dynamicString }) },
-   Button: {
-     props: z.object({
-       child: z.string(),
-       variant: z.enum(["primary", "secondary", "ghost"]).optional(),
-       action: z.unknown().optional(),
-     }),
-   },
- };
- ```
- 
- Give each catalog a stable `catalogId`, then select it in the `a2ui` option
- passed to `provideCopilotKit`. The Showcase chooses a general catalog, a fixed
- flight catalog, or the recovery variant from the active feature:
- 
- ```typescript
- // features/a2ui/a2ui-catalogs.ts
- export function a2uiConfigForFeature(feature: string): A2UIConfig | undefined {
-   switch (feature) {
-     case "beautiful-chat":
-       return { catalog: beautifulCatalog };
-     case "declarative-gen-ui":
-       return { catalog: declarativeCatalog };
-     case "a2ui-recovery":
-       return {
-         catalog: declarativeCatalog,
-         recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
-       };
-     case "a2ui-fixed-schema":
-       return { catalog: fixedCatalog };
-     default:
-       return undefined;
-   }
- }
- ```
- 
- In an application config, pass the chosen catalog and lifecycle policy through
- the Angular provider:
- 
- ```ts title="src/app/app.config.ts"
- provideCopilotKit({
-   runtimeUrl: "/api/copilotkit",
-   a2ui: {
-     catalog: productCatalog,
-     recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
-   },
- });
- ```
- 
- By default, CopilotKit includes the catalog schema in agent context. Set
- `includeSchema: false` only when the server already supplies equivalent schema
- and generation instructions. Otherwise the agent cannot reliably know which
- components and props are valid.
- 
- ## Style rendered components
- 
- Catalog renderers return web-component templates with application-owned class
- names. Style those classes in the global stylesheet so generated surfaces and
- their nested elements receive the same rules:
- 
- ```css
- /* styles.css */
- .a2ui-row {
-   display: flex;
-   flex-wrap: wrap;
-   align-items: stretch;
-   width: 100%;
- }
- 
- .a2ui-row > * {
-   flex: 1 1 10rem;
-   min-width: 0;
- }
- 
- .a2ui-column {
-   display: flex;
-   flex-direction: column;
-   width: 100%;
- }
- 
- [data-testid="declarative-card"],
- .a2ui-chart-card,
- .a2ui-flight-card {
-   display: block;
-   padding: 1rem;
-   border: 1px solid var(--line);
-   border-radius: 0.9rem;
-   background: white;
-   box-shadow: 0 8px 22px -18px rgb(15 23 42 / 0.4);
- }
- 
- .a2ui-metric {
-   display: grid;
-   min-width: 8rem;
-   gap: 0.25rem;
- }
- 
- .a2ui-metric > span,
- .a2ui-metric > small {
-   color: var(--muted);
-   font-size: 0.75rem;
- }
- 
- .a2ui-metric > strong {
-   font-size: 1.4rem;
- }
- 
- .a2ui-status,
- .a2ui-airline {
-   display: inline-flex;
-   width: fit-content;
-   padding: 0.25rem 0.55rem;
-   border-radius: 999px;
-   background: #eef2ff;
-   font-size: 0.75rem;
-   font-weight: 700;
- }
- 
- .a2ui-status-success {
-   background: #dcfce7;
-   color: #166534;
- }
- .a2ui-status-warning {
-   background: #fef3c7;
-   color: #92400e;
- }
- .a2ui-status-error {
-   background: #fee2e2;
-   color: #991b1b;
- }
- ```
- 
- Keep semantic state in explicit classes such as `a2ui-status-success` rather
- than asking the model to invent colors. You can also pass an A2UI `theme`
- through `provideCopilotKit` for renderer-level theme values; catalog CSS
- remains the right place for product-specific layout and visual states.
- 
- ## Recover incomplete streams
- 
- An interrupted stream can leave an A2UI surface without a terminal lifecycle
- event. Configure `recovery.showAfterMs` to avoid flashing recovery UI during a
- normal pause and `recovery.showAfterAttempts` to wait through transient retry
- attempts. The Showcase uses two seconds and two attempts, as shown in the
- catalog-selection snippet above.
- 
- Use `recovery.debugExposure` only when users should see protocol diagnostics.
- Keep it hidden in consumer-facing chat, or choose a collapsed or verbose mode
- for internal debugging. Recovery thresholds affect client display; the server
- still owns activity lifecycle status and retry behavior.
- 
- ## Angular support boundaries
- 
- - **Hashbrown is unsupported.** The stable Hashbrown Angular package does not support the Angular 22 policy.
-   Do not add it to an Angular integration; use A2UI with a typed catalog instead.
- - **JSON Renderer is not applicable.** JSON Renderer does not provide an Angular renderer; use A2UI for declarative Angular interfaces.
- 
- These are authoritative framework support states, not missing examples.
- 
- ## Next steps
- 
- - [Dynamic catalog](/angular/ms-agent-python/features#declarative-gen-ui)
- - [Fixed schema](/angular/ms-agent-python/features#a2ui-fixed-schema)
- - [Recovery behavior](/angular/ms-agent-python/features#a2ui-recovery)
- - [Other generative UI paths](/angular/ms-agent-python/guides/frontend-tools-generative-ui)
+ # A2UI schemas, styling, and recovery
+ 
+ > Configure typed A2UI catalogs, Angular-owned styles, and incomplete-stream recovery.
+ 
+ A2UI renders declarative interface operations and snapshots inside Angular
+ chat. Configure it with a catalog of allowed components; the renderer creates
+ only components that the catalog defines.
+ 
+ ## What is A2UI?
+ 
+ A2UI is CopilotKit's declarative generative UI path for Angular. Instead of
+ asking an agent to emit arbitrary component code, you give it a typed catalog
+ and render only the operations that match that catalog.
+ 
+ ## Choose a schema strategy
+ 
+ Catalog component definitions use Zod schemas for their props. A broad catalog
+ lets the agent compose several application primitives. A fixed catalog narrows
+ the generated interface to a specific domain and set of shapes.
+ 
+ The flight example keeps its component vocabulary deliberately small:
+ 
+ ```typescript
+ // features/a2ui/a2ui-catalogs.ts
+ const fixedDefinitions = {
+   Card: { props: z.object({ child: z.string() }) },
+   Title: { props: z.object({ text: dynamicString }) },
+   Airport: { props: z.object({ code: dynamicString }) },
+   Arrow: { props: z.object({}) },
+   AirlineBadge: { props: z.object({ name: dynamicString }) },
+   PriceTag: { props: z.object({ amount: dynamicString }) },
+   Button: {
+     props: z.object({
+       child: z.string(),
+       variant: z.enum(["primary", "secondary", "ghost"]).optional(),
+       action: z.unknown().optional(),
+     }),
+   },
+ };
+ ```
+ 
+ Give each catalog a stable `catalogId`, then select it in the `a2ui` option
+ passed to `provideCopilotKit`. The Showcase chooses a general catalog, a fixed
+ flight catalog, or the recovery variant from the active feature:
+ 
+ ```typescript
+ // features/a2ui/a2ui-catalogs.ts
+ export function a2uiConfigForFeature(feature: string): A2UIConfig | undefined {
+   switch (feature) {
+     case "beautiful-chat":
+       return { catalog: beautifulCatalog };
+     case "declarative-gen-ui":
+       return { catalog: declarativeCatalog };
+     case "a2ui-recovery":
+       return {
+         catalog: declarativeCatalog,
+         recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
+       };
+     case "a2ui-fixed-schema":
+       return { catalog: fixedCatalog };
+     default:
+       return undefined;
+   }
+ }
+ ```
+ 
+ In an application config, pass the chosen catalog and lifecycle policy through
+ the Angular provider:
+ 
+ ```ts title="src/app/app.config.ts"
+ provideCopilotKit({
+   runtimeUrl: "/api/copilotkit",
+   a2ui: {
+     catalog: productCatalog,
+     recovery: { showAfterMs: 2_000, showAfterAttempts: 2 },
+   },
+ });
+ ```
+ 
+ By default, CopilotKit includes the catalog schema in agent context. Set
+ `includeSchema: false` only when the server already supplies equivalent schema
+ and generation instructions. Otherwise the agent cannot reliably know which
+ components and props are valid.
+ 
+ ## Style rendered components
+ 
+ Catalog renderers return web-component templates with application-owned class
+ names. Style those classes in the global stylesheet so generated surfaces and
+ their nested elements receive the same rules:
+ 
+ ```css
+ /* styles.css */
+ .a2ui-row {
+   display: flex;
+   flex-wrap: wrap;
+   align-items: stretch;
+   width: 100%;
+ }
+ 
+ .a2ui-row > * {
+   flex: 1 1 10rem;
+   min-width: 0;
+ }
+ 
+ .a2ui-column {
+   display: flex;
+   flex-direction: column;
+   width: 100%;
+ }
+ 
+ [data-testid="declarative-card"],
+ .a2ui-chart-card,
+ .a2ui-flight-card {
+   display: block;
+   padding: 1rem;
+   border: 1px solid var(--line);
+   border-radius: 0.9rem;
+   background: white;
+   box-shadow: 0 8px 22px -18px rgb(15 23 42 / 0.4);
+ }
+ 
+ .a2ui-metric {
+   display: grid;
+   min-width: 8rem;
+   gap: 0.25rem;
+ }
+ 
+ .a2ui-metric > span,
+ .a2ui-metric > small {
+   color: var(--muted);
+   font-size: 0.75rem;
+ }
+ 
+ .a2ui-metric > strong {
+   font-size: 1.4rem;
+ }
+ 
+ .a2ui-status,
+ .a2ui-airline {
+   display: inline-flex;
+   width: fit-content;
+   padding: 0.25rem 0.55rem;
+   border-radius: 999px;
+   background: #eef2ff;
+   font-size: 0.75rem;
+   font-weight: 700;
+ }
+ 
+ .a2ui-status-success {
+   background: #dcfce7;
+   color: #166534;
+ }
+ .a2ui-status-warning {
+   background: #fef3c7;
+   color: #92400e;
+ }
+ .a2ui-status-error {
+   background: #fee2e2;
+   color: #991b1b;
+ }
+ ```
+ 
+ Keep semantic state in explicit classes such as `a2ui-status-success` rather
+ than asking the model to invent colors. You can also pass an A2UI `theme`
+ through `provideCopilotKit` for renderer-level theme values; catalog CSS
+ remains the right place for product-specific layout and visual states.
+ 
+ ## Recover incomplete streams
+ 
+ An interrupted stream can leave an A2UI surface without a terminal lifecycle
+ event. Configure `recovery.showAfterMs` to avoid flashing recovery UI during a
+ normal pause and `recovery.showAfterAttempts` to wait through transient retry
+ attempts. The Showcase uses two seconds and two attempts, as shown in the
+ catalog-selection snippet above.
+ 
+ Use `recovery.debugExposure` only when users should see protocol diagnostics.
+ Keep it hidden in consumer-facing chat, or choose a collapsed or verbose mode
+ for internal debugging. Recovery thresholds affect client display; the server
+ still owns activity lifecycle status and retry behavior.
+ 
+ ## Angular support boundaries
+ 
+ - **Hashbrown is unsupported.** The stable Hashbrown Angular package does not support the Angular 22 policy.
+   Do not add it to an Angular integration; use A2UI with a typed catalog instead.
+ - **JSON Renderer is not applicable.** JSON Renderer does not provide an Angular renderer; use A2UI for declarative Angular interfaces.
+ 
+ These are authoritative framework support states, not missing examples.
+ 
+ ## Next steps
+ 
+ - [Dynamic catalog](/angular/ms-agent-python/features#declarative-gen-ui)
+ - [Fixed schema](/angular/ms-agent-python/features#a2ui-fixed-schema)
+ - [Recovery behavior](/angular/ms-agent-python/features#a2ui-recovery)
+ - [Other generative UI paths](/angular/ms-agent-python/guides/frontend-tools-generative-ui)
  
```

**High — Human-in-the-loop and interrupts**

`/angular/ms-agent-python/guides/human-in-the-loop` · route `/human-in-the-loop` · under “Next steps”

386 code lines, 160 prose lines changed.

```diff
- # Human-in-the-loop and interrupts
- 
- > Pause an Angular agent flow for a user decision, then resume it from a typed component or interrupt controller.
- 
- Human-in-the-loop flows pause agent work until a person supplies a decision.
- Angular has two paths with different owners.
- 
- | Pattern | Who chooses the pause? | Angular API |
- | --- | --- | --- |
- | Human-in-the-loop tool | The agent calls a registered browser tool | `registerHumanInTheLoop` |
- | Interrupt | The backend agent emits an AG-UI interrupt | `AgentStore.interruptController`, `injectInterrupt` |
- 
- Use a tool when the model should decide whether to ask. Use an interrupt when
- the backend workflow must stop at a fixed checkpoint.
- 
- ## Register a decision tool
- 
- The renderer receives a `toolCall` signal. Call `respond(result)` once the user
- has made a choice.
- 
- ```ts title="src/app/approval-card.component.ts"
- import { Component, input } from "@angular/core";
- import {
-   type HumanInTheLoopToolCall,
-   type HumanInTheLoopToolRenderer,
- } from "@copilotkit/angular";
- 
- type ApprovalArgs = {
-   action: string;
-   reason: string;
- };
- 
- @Component({
-   selector: "app-approval-card",
-   template: `
-     @let call = toolCall();
-     <article>
-       <h3>Approve {{ call.args.action ?? "this action" }}?</h3>
-       <p>{{ call.args.reason }}</p>
- 
-       @if (call.status !== "complete") {
-         <button type="button" (click)="call.respond({ approved: true })">
-           Approve
-         </button>
-         <button type="button" (click)="call.respond({ approved: false })">
-           Reject
-         </button>
-       }
-     </article>
-   `,
- })
- export class ApprovalCardComponent
-   implements HumanInTheLoopToolRenderer<ApprovalArgs>
- {
-   readonly toolCall =
-     input.required<HumanInTheLoopToolCall<ApprovalArgs>>();
- }
- ```
- 
- Register the tool from the component or service that owns the decision UI:
- 
- ```ts title="src/app/approval-tools.service.ts"
- import { Injectable } from "@angular/core";
- import { registerHumanInTheLoop } from "@copilotkit/angular";
- import { z } from "zod";
- import { ApprovalCardComponent } from "./approval-card.component";
- 
- @Injectable()
- export class ApprovalToolsService {
-   constructor() {
-     registerHumanInTheLoop({
-       name: "requestApproval",
-       description: "Ask the user before a consequential action",
-       parameters: z.object({
-         action: z.string(),
-         reason: z.string(),
-       }),
-       component: ApprovalCardComponent,
-     });
-   }
- }
- ```
- 
- There is no handler. CopilotKit supplies one that waits for `respond`, returns
- the decision to the agent, and continues the run. The registration is removed
- when the owning injector is destroyed.
- 
- ## Handle an interrupt from the store
- 
- An interrupt is a state of one conversation: this agent, this thread, this run
- is waiting for a decision. The store that already exposes that conversation's
- messages and state exposes its pending interrupt too, so a component that holds
- a store needs nothing else:
- 
- ```ts title="src/app/ticket-approval.component.ts"
- import { Component } from "@angular/core";
- import { injectAgentStore } from "@copilotkit/angular";
- 
- @Component({
-   selector: "app-ticket-approval",
-   template: `
-     @let interrupts = store().interruptController;
- 
-     @if (interrupts.hasInterrupt()) {
-       <section>
-         <p>{{ interrupts.interrupt()?.message }}</p>
-         <button type="button" (click)="interrupts.resolve({ approved: true })">
-           Approve
-         </button>
-         <button type="button" (click)="interrupts.cancel()">Reject</button>
-       </section>
-     }
-   `,
- })
- export class TicketApprovalComponent {
-   protected readonly store = injectAgentStore("ticketing");
- }
- ```
- 
- The controller is created and connected with the store, then destroyed when the
- store is torn down or replaced. Standard AG-UI interrupts already retained by
- the agent are visible immediately, and legacy `on_interrupt` events are observed
- for the store's full lifetime.
- 
- ## Handle an interrupt with a typed controller
- 
- `injectInterrupt` subscribes to one agent and exposes the pending decision as
- signals. It supports standard AG-UI interrupts and the legacy
- `on_interrupt` custom event. Use it when the store default is not enough — a
- typed payload, an `enabled` filter, or a `handler` that prepares data for the
- view.
- 
- <Callout type="warn">
-   Do not render an `injectInterrupt` controller and
-   `store().interruptController` for the same decision. Both independently
-   observe the agent, so the same interrupt becomes visible in both and two UI
-   actions could attempt to resume it. Render only the specialized controller
-   when you need filtering or typed handling.
- </Callout>
- 
- ```ts title="src/app/interrupt-panel.component.ts"
- import { Component } from "@angular/core";
- import { injectInterrupt } from "@copilotkit/angular";
- 
- type ReviewRequest = {
-   title?: string;
-   choices?: Array<{ id: string; label: string }>;
- };
- 
- @Component({
-   selector: "app-interrupt-panel",
-   template: `
-     @if (controller.event(); as event) {
-       @let request = asReviewRequest(event.value);
-       <section aria-labelledby="review-title">
-         <h2 id="review-title">{{ request.title ?? "Review required" }}</h2>
- 
-         @for (choice of request.choices ?? []; track choice.id) {
-           <button type="button" (click)="resolve(choice.id)">
-             {{ choice.label }}
-           </button>
-         }
- 
-         <button type="button" (click)="cancel()">Cancel</button>
-       </section>
-     }
- 
-     @if (controller.error()) {
-       <p role="alert">The decision could not be submitted.</p>
-     }
-   `,
- })
- export class InterruptPanelComponent {
-   protected readonly controller =
-     injectInterrupt<ReviewRequest>("default");
- 
-   protected asReviewRequest(value: unknown): ReviewRequest {
-     return typeof value === "object" && value !== null
-       ? (value as ReviewRequest)
-       : {};
-   }
- 
-   protected resolve(choiceId: string): void {
-     this.controller.resolve({ choiceId }).catch(() => undefined);
-   }
- 
-   protected cancel(): void {
-     this.controller.cancel().catch(() => undefined);
-   }
- }
- ```
- 
- The controller clears stale decisions when the thread changes. Calls to
- `resolve` or `cancel` share one in-flight resume promise, so a double click
- does not start two resume runs.
- 
- The runnable Showcase uses the same controller API in its route-aware feature:
- 
- ```typescript
- // features/interrupt/interrupt-feature.component.ts
- export class InterruptFeatureComponent {
-   private readonly route = inject(ActivatedRoute);
-   protected readonly feature =
-     (this.route.snapshot.data["feature"] as string | undefined) ??
-     "gen-ui-interrupt";
-   protected readonly isHeadless = this.feature === "interrupt-headless";
-   private readonly agentId = agentIdForCurrentIntegration(this.feature);
-   protected readonly controller = injectInterrupt({ agentId: this.agentId });
-   protected readonly payload = computed(() =>
-     parseInterruptPayload(this.controller.event()?.value),
-   );
-   protected readonly pickedLabel = signal<string | null>(null);
-   private lastInterruptEvent: object | null = null;
- 
-   constructor() {
-     effect(() => {
-       const event = this.controller.event();
-       if (event && event !== this.lastInterruptEvent) {
-         this.lastInterruptEvent = event;
-         this.pickedLabel.set(null);
-       }
-     });
- 
-     if (usesFrontendSchedulingTool(this.feature, integrationId())) {
-       const config: HumanInTheLoopConfig<ScheduleMeetingArgs> = {
-         agentId: this.agentId,
-         name: "schedule_meeting",
-         description:
-           "Ask the user to pick a meeting time and return the selected slot.",
-         parameters: z.object({
-           topic: z.string(),
-           attendee: z.string().optional(),
-         }),
-         component:
-           TimePickerCard as unknown as HumanInTheLoopConfig<ScheduleMeetingArgs>["component"],
-       };
-       registerHumanInTheLoop(config);
-     }
-   }
- 
-   /** Resolve the active decision while retaining its visible confirmation. */
-   protected resolve(slot: InterruptSlot): void {
-     this.pickedLabel.set(slot.label);
-     this.controller
-       .resolve({
-         chosen_time: slot.iso,
-         chosen_label: slot.label,
-       })
-       .catch(() => undefined);
-   }
- 
-   /** Cancel only the currently displayed interrupt. */
-   protected cancel(): void {
-     this.controller.cancel().catch(() => undefined);
-   }
- }
- ```
- 
- Use the controller's `enabled` option when several components listen to the
- same agent and each should accept only certain interrupt payloads. Use
- `handler` when the view needs async data prepared before it appears.
- 
- ## Place the decision UI
- 
- The tool renderer appears in the tool-call flow inside chat. An interrupt
- controller is headless: bind its signals anywhere in the application, including
- a route-level dialog, side panel, or task view.
- 
- ## Next steps
- 
- - [registerHumanInTheLoop API](/reference/angular/functions/registerHumanInTheLoop)
- - [injectInterrupt API](/reference/angular/functions/injectInterrupt)
- - [Runnable interrupt examples](/angular/ms-agent-python/features#gen-ui-interrupt)
+ # Human-in-the-loop and interrupts
+ 
+ > Pause an Angular agent flow for a user decision, then resume it from a typed component or interrupt controller.
+ 
+ Human-in-the-loop flows pause agent work until a person supplies a decision.
+ Angular has two paths with different owners.
+ 
+ | Pattern | Who chooses the pause? | Angular API |
+ | --- | --- | --- |
+ | Human-in-the-loop tool | The agent calls a registered browser tool | `registerHumanInTheLoop` |
+ | Interrupt | The backend agent emits an AG-UI interrupt | `AgentStore.interruptController`, `injectInterrupt` |
+ 
+ Use a tool when the model should decide whether to ask. Use an interrupt when
+ the backend workflow must stop at a fixed checkpoint.
+ 
+ ## Register a decision tool
+ 
+ The renderer receives a `toolCall` signal. Call `respond(result)` once the user
+ has made a choice.
+ 
+ ```ts title="src/app/approval-card.component.ts"
+ import { Component, input } from "@angular/core";
+ import {
+   type HumanInTheLoopToolCall,
+   type HumanInTheLoopToolRenderer,
+ } from "@copilotkit/angular";
+ 
+ type ApprovalArgs = {
+   action: string;
+   reason: string;
+ };
+ 
+ @Component({
+   selector: "app-approval-card",
+   template: `
+     @let call = toolCall();
+     <article>
+       <h3>Approve {{ call.args.action ?? "this action" }}?</h3>
+       <p>{{ call.args.reason }}</p>
+ 
+       @if (call.status !== "complete") {
+         <button type="button" (click)="call.respond({ approved: true })">
+           Approve
+         </button>
+         <button type="button" (click)="call.respond({ approved: false })">
+           Reject
+         </button>
+       }
+     </article>
+   `,
+ })
+ export class ApprovalCardComponent
+   implements HumanInTheLoopToolRenderer<ApprovalArgs>
+ {
+   readonly toolCall =
+     input.required<HumanInTheLoopToolCall<ApprovalArgs>>();
+ }
+ ```
+ 
+ Register the tool from the component or service that owns the decision UI:
+ 
+ ```ts title="src/app/approval-tools.service.ts"
+ import { Injectable } from "@angular/core";
+ import { registerHumanInTheLoop } from "@copilotkit/angular";
+ import { z } from "zod";
+ import { ApprovalCardComponent } from "./approval-card.component";
+ 
+ @Injectable()
+ export class ApprovalToolsService {
+   constructor() {
+     registerHumanInTheLoop({
+       name: "requestApproval",
+       description: "Ask the user before a consequential action",
+       parameters: z.object({
+         action: z.string(),
+         reason: z.string(),
+       }),
+       component: ApprovalCardComponent,
+     });
+   }
+ }
+ ```
+ 
+ There is no handler. CopilotKit supplies one that waits for `respond`, returns
+ the decision to the agent, and continues the run. The registration is removed
+ when the owning injector is destroyed.
+ 
+ ## Handle an interrupt from the store
+ 
+ An interrupt is a state of one conversation: this agent, this thread, this run
+ is waiting for a decision. The store that already exposes that conversation's
+ messages and state exposes its pending interrupt too, so a component that holds
+ a store needs nothing else:
+ 
+ ```ts title="src/app/ticket-approval.component.ts"
+ import { Component } from "@angular/core";
+ import { injectAgentStore } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-ticket-approval",
+   template: `
+     @let interrupts = store().interruptController;
+ 
+     @if (interrupts.hasInterrupt()) {
+       <section>
+         <p>{{ interrupts.interrupt()?.message }}</p>
+         <button type="button" (click)="interrupts.resolve({ approved: true })">
+           Approve
+         </button>
+         <button type="button" (click)="interrupts.cancel()">Reject</button>
+       </section>
+     }
+   `,
+ })
+ export class TicketApprovalComponent {
+   protected readonly store = injectAgentStore("ticketing");
+ }
+ ```
+ 
+ The controller is created and connected with the store, then destroyed when the
+ store is torn down or replaced. Standard AG-UI interrupts already retained by
+ the agent are visible immediately, and legacy `on_interrupt` events are observed
+ for the store's full lifetime.
+ 
+ ## Handle an interrupt with a typed controller
+ 
+ `injectInterrupt` subscribes to one agent and exposes the pending decision as
+ signals. It supports standard AG-UI interrupts and the legacy
+ `on_interrupt` custom event. Use it when the store default is not enough — a
+ typed payload, an `enabled` filter, or a `handler` that prepares data for the
+ view.
+ 
+ <Callout type="warn">
+   Do not render an `injectInterrupt` controller and
+   `store().interruptController` for the same decision. Both independently
+   observe the agent, so the same interrupt becomes visible in both and two UI
+   actions could attempt to resume it. Render only the specialized controller
+   when you need filtering or typed handling.
+ </Callout>
+ 
+ ```ts title="src/app/interrupt-panel.component.ts"
+ import { Component } from "@angular/core";
+ import { injectInterrupt } from "@copilotkit/angular";
+ 
+ type ReviewRequest = {
+   title?: string;
+   choices?: Array<{ id: string; label: string }>;
+ };
+ 
+ @Component({
+   selector: "app-interrupt-panel",
+   template: `
+     @if (controller.event(); as event) {
+       @let request = asReviewRequest(event.value);
+       <section aria-labelledby="review-title">
+         <h2 id="review-title">{{ request.title ?? "Review required" }}</h2>
+ 
+         @for (choice of request.choices ?? []; track choice.id) {
+           <button type="button" (click)="resolve(choice.id)">
+             {{ choice.label }}
+           </button>
+         }
+ 
+         <button type="button" (click)="cancel()">Cancel</button>
+       </section>
+     }
+ 
+     @if (controller.error()) {
+       <p role="alert">The decision could not be submitted.</p>
+     }
+   `,
+ })
+ export class InterruptPanelComponent {
+   protected readonly controller =
+     injectInterrupt<ReviewRequest>("default");
+ 
+   protected asReviewRequest(value: unknown): ReviewRequest {
+     return typeof value === "object" && value !== null
+       ? (value as ReviewRequest)
+       : {};
+   }
+ 
+   protected resolve(choiceId: string): void {
+     this.controller.resolve({ choiceId }).catch(() => undefined);
+   }
+ 
+   protected cancel(): void {
+     this.controller.cancel().catch(() => undefined);
+   }
+ }
+ ```
+ 
+ The controller clears stale decisions when the thread changes. Calls to
+ `resolve` or `cancel` share one in-flight resume promise, so a double click
+ does not start two resume runs.
+ 
+ The runnable Showcase uses the same controller API in its route-aware feature:
+ 
+ ```typescript
+ // features/interrupt/interrupt-feature.component.ts
+ export class InterruptFeatureComponent {
+   private readonly route = inject(ActivatedRoute);
+   protected readonly feature =
+     (this.route.snapshot.data["feature"] as string | undefined) ??
+     "gen-ui-interrupt";
+   protected readonly isHeadless = this.feature === "interrupt-headless";
+   private readonly agentId = agentIdForCurrentIntegration(this.feature);
+   protected readonly controller = injectInterrupt({ agentId: this.agentId });
+   protected readonly payload = computed(() =>
+     parseInterruptPayload(this.controller.event()?.value),
+   );
+   protected readonly pickedLabel = signal<string | null>(null);
+   private lastInterruptEvent: object | null = null;
+ 
+   constructor() {
+     effect(() => {
+       const event = this.controller.event();
+       if (event && event !== this.lastInterruptEvent) {
+         this.lastInterruptEvent = event;
+         this.pickedLabel.set(null);
+       }
+     });
+ 
+     if (usesFrontendSchedulingTool(this.feature, integrationId())) {
+       const config: HumanInTheLoopConfig<ScheduleMeetingArgs> = {
+         agentId: this.agentId,
+         name: "schedule_meeting",
+         description:
+           "Ask the user to pick a meeting time and return the selected slot.",
+         parameters: z.object({
+           topic: z.string(),
+           attendee: z.string().optional(),
+         }),
+         component:
+           TimePickerCard as unknown as HumanInTheLoopConfig<ScheduleMeetingArgs>["component"],
+       };
+       registerHumanInTheLoop(config);
+     }
+   }
+ 
+   /** Resolve the active decision while retaining its visible confirmation. */
+   protected resolve(slot: InterruptSlot): void {
+     this.pickedLabel.set(slot.label);
+     this.controller
+       .resolve({
+         chosen_time: slot.iso,
+         chosen_label: slot.label,
+       })
+       .catch(() => undefined);
+   }
+ 
+   /** Cancel only the currently displayed interrupt. */
+   protected cancel(): void {
+     this.controller.cancel().catch(() => undefined);
+   }
+ }
+ ```
+ 
+ Use the controller's `enabled` option when several components listen to the
+ same agent and each should accept only certain interrupt payloads. Use
+ `handler` when the view needs async data prepared before it appears.
+ 
+ ## Place the decision UI
+ 
+ The tool renderer appears in the tool-call flow inside chat. An interrupt
+ controller is headless: bind its signals anywhere in the application, including
+ a route-level dialog, side panel, or task view.
+ 
+ ## Next steps
+ 
+ - [registerHumanInTheLoop API](/reference/angular/functions/registerHumanInTheLoop)
+ - [injectInterrupt API](/reference/angular/functions/injectInterrupt)
+ - [Runnable interrupt examples](/angular/ms-agent-python/features#gen-ui-interrupt)
  
```

## 2026-08-26

### 20:04 UTC — 4 pages, highest severity high

**Medium — Angular**

`/angular/ms-agent-python` · route `/` · under “Next steps”

0 code lines, 227 prose lines changed.

```diff
- # Introduction
+ # Angular
  
- > Bring your Microsoft Agent Framework agents to your Angular users with CopilotKit via AG-UI.
+ > Connect an Angular app to Copilot Runtime with CopilotKit.
  
- <FrameworkOverview
-   frameworkName="Microsoft Agent Framework"
-   frameworkIcon={<MicrosoftIcon className="h-10 w-10 text-primary" width={40} height={40} />}
-   header="Bring your Microsoft Agent Framework agents to your Angular users"
-   subheader="Give your Microsoft Agent Framework agents real user-interactivity using CopilotKit and AG-UI. Build rich, interactive, agent-powered Angular applications."
-   bannerVideo="https://cdn.copilotkit.ai/docs/copilotkit/videos/coagents/overview.mp4"
-   guideLink="/angular/ms-agent-python/quickstart"
-   initCommand="npx copilotkit@latest init"
-   featuresLink="https://feature-viewer.copilotkit.ai/microsoft-agent-framework-python/feature/agentic_chat"
-   supportedFeatures={[
-     {
-       title: "Generative UI",
-       description: "Render your agent's state, progress, outputs, and tool calls with custom Angular components in real-time.",
-       documentationLink: "/angular/ms-agent-python/guides/frontend-tools-generative-ui",
-       demoLink: "https://feature-viewer.copilotkit.ai",
-       videoUrl: "https://cdn.copilotkit.ai/docs/copilotkit/videos/coagents/haiku.mp4"
-     },
-     {
-       title: "Human in the Loop",
-       description: "Empower users to guide agents at key checkpoints. Combine AI and human judgment for controllable agent behavior.",
-       documentationLink: "/angular/ms-agent-python/guides/human-in-the-loop",
-       demoLink: "https://feature-viewer.copilotkit.ai",
-       videoUrl: "https://cdn.copilotkit.ai/docs/copilotkit/images/coagents/human-in-the-loop-example.mp4"
-     },
-     {
-       title: "Shared State",
-       description: "Keep your agent and your Angular app in sync with reactive signals in real-time.",
-       documentationLink: "/angular/ms-agent-python/guides/shared-state",
-       demoLink: "https://feature-viewer.copilotkit.ai",
-       videoUrl: "https://cdn.copilotkit.ai/docs/copilotkit/videos/coagents/shared-state.mp4"
-     }
-   ]}
-   architectureImage="https://cdn.copilotkit.ai/docs/copilotkit/images/microsoft-agent-framework/maf-ag-ui.png"
-   afterFeatures={
-     <OpsPlatformCTA
-       variant="card"
-       title="Bring your Agent Framework agents to production"
-       body="Add persistent threads and the inspector with the Enterprise Intelligence Platform."
-       ctaLabel="Create a free account"
-       surface="docs_microsoft_agent_framework_overview"
-     />
-   }
-   tutorialLink="/angular/ms-agent-python/quickstart"
+ 
+ `@copilotkit/angular` provides Angular components, directives, and services for CopilotKit. This guide gets you to a working Angular app with a chat UI backed by [Copilot Runtime](/angular/ms-agent-python/backend/copilot-runtime). When you select an agent backend in the sidebar, the backend step below changes with it; without a selection, the guide uses CopilotKit's `BuiltInAgent`.
+ 
+ The runtime runs on your server, keeps model credentials out of the browser, and exposes the `default` agent that `CopilotChat` uses automatically.
+ 
+ <OpsPlatformCTA
+   variant="inline"
+   title="Take your Angular copilot from local to production"
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
+   surface="docs:angular/quickstart:production"
  />
  
- ## Resources
+ ## What is CopilotKit for Angular?
  
- - [Agent Framework User Guide](https://learn.microsoft.com/en-us/agent-framework/user-guide/overview)
- - [Agent Framework Tutorials](https://learn.microsoft.com/en-us/agent-framework/tutorials/overview)
+ CopilotKit for Angular is the first-party, signal-based Angular frontend for
+ AG-UI agents and Copilot Runtime. It provides complete chat surfaces and
+ headless APIs, and it supports zoneless applications.
+ 
+ ## Prerequisites
+ 
+ - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
+ - Angular 22
+ - Node.js 22
+ 
+ ## Getting started
+ 
+ <Steps>
+     <Step>
+         ### Create your Angular app
+ 
+         If you don't have one already, pin the CLI to the supported major:
+ 
+         ```bash
+         npx @angular/cli@22 new my-copilot-app
+         cd my-copilot-app
+         ```
+     </Step>
+     <Step>
+         ### Install CopilotKit
+ 
+         Install the Angular frontend package, `@angular/cdk`, and `@copilotkit/runtime` for your local Copilot Runtime server:
+ 
+         <Tabs groupId="package-manager" items={['npm', 'pnpm', 'yarn']}>
+             <Tab value="npm">
+                 ```bash
+                 npm install @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 npm install -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="pnpm">
+                 ```bash
+                 pnpm add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 pnpm add -D tsx typescript @types/node
+                 ```
+             </Tab>
+             <Tab value="yarn">
+                 ```bash
+                 yarn add @copilotkit/angular @angular/cdk @copilotkit/runtime
+                 yarn add -D tsx typescript @types/node
+                 ```
+             </Tab>
+         </Tabs>
+ 
+         <Callout type="info" title="Match @angular/cdk to your Angular version">
+           `@angular/cdk` must share your Angular major version. Most package managers resolve this for you, but if you hit a peer-dependency error, pin it explicitly (for example `@angular/cdk@^22`).
+         </Callout>
+     </Step>
+     
+     
+       <Step>
+         ### Connect the selected agent backend
+ 
+         This URL keeps the agent backend selected. The Angular setup remains
+         shared; the backend setup below comes from that integration's canonical
+         showcase source.
+ 
+         <!-- setup skipped: agent-setup is not bundled for ms-agent-python -->
+ 
+         <Callout type="info" title="Expose the selected backend through Copilot Runtime">
+           Configure Copilot Runtime to register this backend as the `default`
+           agent at `/api/copilotkit`. Continue with the selected backend's
+           [Copilot Runtime guide](backend/copilot-runtime) for its runtime
+           adapter, credentials, and server command. Do not replace it with the
+           `BuiltInAgent` server from the standalone Angular path.
+         </Callout>
+       </Step>
+     
+     <Step>
+         ### Import the styles
+ 
+         Add the package stylesheet to your global styles. It's self-contained, so the chat renders without any other CSS.
+ 
+         ```css title="src/styles.css"
+         @import "@copilotkit/angular/styles.css"; /* [!code highlight] */
+         ```
+     </Step>
+     <Step>
+         ### Connect to Copilot Runtime
+ 
+         Point `provideCopilotKit` at the runtime endpoint. The chat uses the agent that your runtime registers as `default`.
+ 
+         ```ts title="src/app/app.config.ts"
+         import { ApplicationConfig } from "@angular/core";
+         import { provideCopilotKit } from "@copilotkit/angular"; // [!code highlight]
+ 
+         export const appConfig: ApplicationConfig = {
+           providers: [
+             // [!code highlight:3]
+             provideCopilotKit({
+               runtimeUrl: "http://localhost:8200/api/copilotkit",
+             }),
+           ],
+         };
+         ```
+     </Step>
+     <Step>
+         ### Add the chat UI
+ 
+         Import the `CopilotChat` component into your root component and drop it into the template.
+ 
+         ```ts title="src/app/app.ts"
+         import { Component } from "@angular/core";
+         import { CopilotChat } from "@copilotkit/angular"; // [!code highlight]
+ 
+         @Component({
+           selector: "app-root",
+           imports: [CopilotChat], // [!code highlight]
+           template: `
+             <!-- [!code highlight:3] -->
+             <div style="height: 100vh">
+               <copilot-chat />
+             </div>
+           `,
+         })
+         export class App {}
+         ```
+ 
+     </Step>
+     
+     
+       <Step>
+         ### Run the backend, runtime, and Angular app
+ 
+         Start the selected agent backend and Copilot Runtime with the commands
+         from its runtime guide. Confirm
+         `http://localhost:8200/api/copilotkit/info` reports the `default`
+         agent, then start Angular:
+ 
+         ```bash
+         npm start
+         ```
+ 
+         Open the Angular CLI URL (usually `http://localhost:4200`) and send a
+         message. The request now follows the selected path end to end:
+         Angular → Copilot Runtime → your selected agent backend.
+       </Step>
+     
+     <Step>
+         ### Open Inspector and confirm setup
+ 
+ Angular does not mount Inspector by default. First follow [Inspector for Angular](/angular/ms-agent-python/inspector). Then, on localhost, click the Inspector button.
+ 
+ 1. Open **Agents**, then **Agent**. Your agent is listed.
+ 2. Send a chat message. Open **Agents**, then **AG-UI Events**. Events are moving.
+ 3. Open **Threads**. The list is unlocked (Intelligence is on), or locked with Enable Intelligence (Intelligence is off).
+ 
+ More detail: [Inspector](/angular/ms-agent-python/inspector).
+ 
+     </Step>
+ 
+ </Steps>
+ 
+ ## Next steps
+ 
+ - [Runtime and backend docs](backend/copilot-runtime): configure the server, secure requests, and deploy without leaving the selected Angular surface.
+ - [CopilotKit Intelligence](premium/overview): add durable threads, inspection, and cloud-hosted or self-hosted operations.
+ - [Angular task guides](guides/chat-ui): build chat UI, tools, generative UI, interrupts, shared state, threads, memory, attachments, and headless UI.
+ - [Angular feature examples](features): find runnable examples and canonical shared Angular source for each supported feature.
+ - [Angular API reference](/reference/angular): use components, signals, tools, context, and runtime services.
+ - [Production and lifecycle](/reference/angular/production-lifecycle): handle cleanup, errors, server rendering, hydration, zoneless Angular, and browser-only features.
  
```

**Medium — Angular**

`/angular/ms-agent-python/quickstart` · route `/quickstart` · under “Angular”

0 code lines, 21 prose lines changed.

```diff
  
  > Connect an Angular app to Copilot Runtime with CopilotKit.
+ 
  
    variant="inline"
    title="Take your Angular copilot from local to production"
-   body="Add durable threads, inspection, and managed or self-hosted Enterprise Intelligence without changing the Angular frontend APIs in this guide."
+   body="Add durable threads, inspection, and managed or self-hosted CopilotKit Intelligence without changing the Angular frontend APIs in this guide."
    surface="docs:angular/quickstart:production"
  
  - An OpenAI API key (or another model provider supported by [Model Selection](/angular/model-selection))
- - Angular 20, 21, or 22
+ - Angular 22
  - Node.js 22
```

**Low — A2UI schemas, styling, and recovery**

`/angular/ms-agent-python/guides/a2ui` · route `/a2ui` · under “Angular support boundaries”

0 code lines, 2 prose lines changed.

```diff
  ## Angular support boundaries
  
- - **Hashbrown is unsupported.** The stable Hashbrown Angular package does not support the complete Angular 20 through 22 policy.
+ - **Hashbrown is unsupported.** The stable Hashbrown Angular package does not support the Angular 22 policy.
    Do not add it to an Angular integration; use A2UI with a typed catalog instead.
```

**High — Human-in-the-loop and interrupts**

`/angular/ms-agent-python/guides/human-in-the-loop` · route `/human-in-the-loop` · under “Human-in-the-loop and interrupts”

24 code lines, 31 prose lines changed.

```diff
  | --- | --- | --- |
  | Human-in-the-loop tool | The agent calls a registered browser tool | `registerHumanInTheLoop` |
- | Interrupt | The backend agent emits an AG-UI interrupt | `injectInterrupt` |
+ | Interrupt | The backend agent emits an AG-UI interrupt | `AgentStore.interruptController`, `injectInterrupt` |
  
  when the owning injector is destroyed.
  
- ## Handle an interrupt
+ ## Handle an interrupt from the store
+ 
+ An interrupt is a state of one conversation: this agent, this thread, this run
+ is waiting for a decision. The store that already exposes that conversation's
+ messages and state exposes its pending interrupt too, so a component that holds
+ a store needs nothing else:
+ 
+ ```ts title="src/app/ticket-approval.component.ts"
+ import { Component } from "@angular/core";
+ import { injectAgentStore } from "@copilotkit/angular";
+ 
+ @Component({
+   selector: "app-ticket-approval",
+   template: `
+     @let interrupts = store().interruptController;
+ 
+     @if (interrupts.hasInterrupt()) {
+       <section>
+         <p>{{ interrupts.interrupt()?.message }}</p>
+         <button type="button" (click)="interrupts.resolve({ approved: true })">
+           Approve
+         </button>
+         <button type="button" (click)="interrupts.cancel()">Reject</button>
+       </section>
+     }
+   `,
+ })
+ export class TicketApprovalComponent {
+   protected readonly store = injectAgentStore("ticketing");
+ }
+ ```
+ 
+ The controller is created and connected with the store, then destroyed when the
+ store is torn down or replaced. Standard AG-UI interrupts already retained by
+ the agent are visible immediately, and legacy `on_interrupt` events are observed
+ for the store's full lifetime.
+ 
+ ## Handle an interrupt with a typed controller
  
  `injectInterrupt` subscribes to one agent and exposes the pending decision as
  signals. It supports standard AG-UI interrupts and the legacy
- `on_interrupt` custom event.
+ `on_interrupt` custom event. Use it when the store default is not enough — a
+ typed payload, an `enabled` filter, or a `handler` that prepares data for the
+ view.
+ 
+ <Callout type="warn">
+   Do not render an `injectInterrupt` controller and
+   `store().interruptController` for the same decision. Both independently
+   observe the agent, so the same interrupt becomes visible in both and two UI
+   actions could attempt to resume it. Render only the specialized controller
+   when you need filtering or typed handling.
+ </Callout>
  
  export class InterruptPanelComponent {
    protected readonly controller =
-     injectInterrupt<ReviewRequest>({ agentId: "default" });
+     injectInterrupt<ReviewRequest>("default");
  
```
