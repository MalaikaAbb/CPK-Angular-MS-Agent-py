/**
 * The Authentication guide's browser half, against the gated
 * `/api/copilotkit-auth` runtime in server.ts.
 * https://docs.copilotkit.ai/angular/ms-agent-python/auth
 *
 * Flow and layout follow the Angular Showcase's auth demo
 * (features/app-settings/app-settings-feature.component.ts): signed out, only
 * the sign-in card shows; signed in, the chat appears with the card above it.
 * The header update is the guide's "When sign-in state changes after
 * bootstrap" snippet; signing out sends `{}`, as its production checklist
 * asks.
 *
 * Harness-only: this app's one `provideCopilotKit` points at the ungated
 * runtime, so this demo also switches `runtimeUrl` to the gated one while
 * signed in, and restores the configured runtime when it signs out or leaves.
 */
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  CopilotChat,
  CopilotKit,
  injectCopilotKitConfig,
} from '@copilotkit/angular';

import { AuthCardComponent } from './auth-card';

/** The showcase's demo token, checked by `verifySession` in server.ts. */
const DEMO_TOKEN = 'demo-token-123';
const AUTH_RUNTIME_URL = 'http://localhost:8220/api/copilotkit-auth';

@Component({
  selector: 'app-auth-demo',
  imports: [CopilotChat, AuthCardComponent],
  template: `
    @if (!signedIn()) {
      <main class="sign-in-page">
        <showcase-auth-card [authenticated]="false" (signIn)="signIn()" />
      </main>
    } @else {
      <main class="settings-page">
        <section class="settings-panel">
          <showcase-auth-card [authenticated]="true" (signOut)="signOut()" />
        </section>
        <section class="chat-surface" aria-label="CopilotKit assistant">
          <copilot-chat />
        </section>
      </main>
    }
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .sign-in-page {
      display: grid;
      height: 100%;
      min-height: 0;
      place-items: center;
      padding: 1.5rem;
      background: radial-gradient(circle at 50% 20%, #eef2ff, #eef3f7 55%);
    }
    .settings-page {
      display: grid;
      height: 100%;
      min-height: 0;
      grid-template-rows: auto minmax(0, 1fr);
      gap: 1rem;
      padding: 1rem;
      background: #eef3f7;
    }
    .settings-panel {
      min-width: 0;
    }
    .chat-surface {
      min-height: 0;
      overflow: hidden;
      border: 1px solid #d8e0ea;
      border-radius: 1rem;
      background: #fff;
    }
  `,
})
export class AuthDemoComponent {
  private readonly copilotKit = inject(CopilotKit);
  private readonly defaultRuntimeUrl = injectCopilotKitConfig().runtimeUrl;
  protected readonly signedIn = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.signOut());
  }

  protected signIn(): void {
    // Header first: switching the URL triggers discovery against the gated
    // runtime, which must already carry the token.
    this.updateSession(DEMO_TOKEN);
    this.copilotKit.updateRuntime({ runtimeUrl: AUTH_RUNTIME_URL });
    this.signedIn.set(true);
  }

  protected signOut(): void {
    this.updateSession(null);
    this.copilotKit.updateRuntime({ runtimeUrl: this.defaultRuntimeUrl });
    this.signedIn.set(false);
  }

  private updateSession(sessionToken: string | null): void {
    const copilotKit = this.copilotKit;
    // auth : update headers after sign-in start
    copilotKit.updateRuntime({
      headers: sessionToken
        ? { Authorization: `Bearer ${sessionToken}` }
        : {},
    });
    // auth : update headers after sign-in end
  }
}
