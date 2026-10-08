import { Component } from '@angular/core';

import { RouteHeader } from '../components/route-header';
import { Callout, DocSample, Panel, SourceCode, TryIt } from '../components/ui';

@Component({
  selector: 'app-auth-page',
  imports: [RouteHeader, Panel, Callout, TryIt, SourceCode, DocSample],
  template: `
    <app-route-header path="/auth" />

    <div class="space-y-6">
      <ui-try-it>
        <p class="mt-1 text-slate-700">
          First, the gate on its own:
          <code>curl -i http://localhost:8220/api/copilotkit-auth/info</code>
          returns <code>401 Unauthorized</code>, and the same request with
          <code>-H "Authorization: Bearer demo-token-123"</code> returns
          <code>200</code>. Then open the demo, press
          <strong>Sign in</strong>, and send <em>Hello</em>.
        </p>
        <p class="mt-2 text-slate-700">
          <strong>Pass:</strong> both curl results as above, and the signed-in
          chat replies. <strong>Sign out</strong> returns to the sign-in card.
          <strong>Fail:</strong> the chat shows a runtime connection error —
          the <code>Authorization</code> header did not reach the gated
          runtime.
        </p>
      </ui-try-it>

      <ui-panel heading="Validate every runtime request">
        <p class="mb-3 text-sm text-slate-700">
          A second runtime in <code>server.ts</code> at
          <code>/api/copilotkit-auth</code>, gated by the guide's
          <code>onRequest</code> hook. It is separate so the rest of this
          harness keeps working unauthenticated.
        </p>
        <ui-source path="server.ts" />
      </ui-panel>

      <ui-panel heading="Send the current session">
        <p class="mb-3 text-sm text-slate-700">
          The guide's snippet for "when sign-in state changes after
          bootstrap", sent on sign-in and cleared with <code>{{ '{' }}{{ '}' }}</code> on
          sign-out. The demo switches <code>runtimeUrl</code> to the gated
          runtime only while signed in.
        </p>
        <ui-source path="src/app/features/auth/auth-demo.component.ts" />
      </ui-panel>

      <ui-panel heading="Sign-in card">
        <ui-source path="src/app/features/auth/auth-card.ts" />
      </ui-panel>

      <ui-panel heading="Send cookies to a cross-origin runtime">
        <p class="mb-3 text-sm text-slate-700">
          The app runs on <code>:4220</code> and the runtime on
          <code>:8220</code>, so it is cross-origin.
          <code>app.config.ts</code> sets <code>credentials: 'include'</code>,
          and both runtimes answer with <code>credentials: true</code> and the
          app's exact origins — never <code>*</code>.
        </p>
        <ui-source path="src/app/app.config.ts" />
      </ui-panel>

      <ui-panel heading="Forward identity deliberately">
        <p class="text-sm text-slate-700">
          The main runtime in <code>server.ts</code> sets the guide's
          <code>forwardHeaders</code> allowlist, so only
          <code>authorization</code> and <code>x-tenant-id</code> reach the
          agent.
        </p>
      </ui-panel>

      <ui-panel heading="Initial headers in provideCopilotKit">
        <p class="mb-3 text-sm text-slate-700">
          Quoted from the guide, not mounted: this app's root provider serves
          every route, so a static session header there would sign in every
          demo. The demo uses the <code>updateRuntime</code> path instead.
        </p>
        <ui-doc-sample
          caption="src/app/app.config.ts — from the guide"
          [code]="initialHeadersSample"
        />
      </ui-panel>

      <ui-callout title="Not in the guide">
        <code>verifySession</code> and <code>readSessionToken</code> are not
        defined by the guide. <code>verifySession</code> here is the showcase's
        static demo-token check (<code>demo-token-123</code>), and the token is
        the showcase's <code>DEMO_AUTH_HEADERS</code> value. The guide's
        <code>createCopilotExpressHandler</code> is replaced by the
        <code>createCopilotNodeListener</code> this server already uses — both
        take the same <code>hooks</code>. The sign-in card is the showcase's
        <code>AuthCardComponent</code>, unchanged. Never use a hard-coded
        shared secret for real auth.
      </ui-callout>
    </div>
  `,
})
export default class AuthPage {
  protected readonly initialHeadersSample = `import { ApplicationConfig } from "@angular/core";
import { provideCopilotKit } from "@copilotkit/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideCopilotKit({
      runtimeUrl: "/api/copilotkit",
      headers: {
        Authorization: \`Bearer \${readSessionToken()}\`,
      },
    }),
  ],
};`;
}
