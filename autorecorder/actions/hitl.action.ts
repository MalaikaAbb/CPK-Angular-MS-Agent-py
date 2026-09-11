/**
 * Human-in-the-loop — the run pauses until a human answers.
 *
 * https://docs.copilotkit.ai/angular/ms-agent-python/guides/human-in-the-loop
 *
 * The prompt is phrased to make the agent reach for `requestApproval` rather
 * than answer directly; the recording is only worth anything if the card
 * actually appears and the run visibly resumes after the click.
 */
import { type Page } from 'playwright';

import { sendPrompt, waitForAgentResponseCompletion } from '../core/actions';
import { humanClick, humanGlide, sleep } from '../core/overlays/cursor';
import { type PageActionHandler, type PageRecordConfig } from '../core/types';

export const runHitlAction: PageActionHandler = async (
  page: Page,
  config: PageRecordConfig,
  _rootPath,
  ctx,
) => {
  console.log(`   🛡️ Asking for something consequential enough to need approval...`);
  const msgCount = await sendPrompt(page, config.prompt);

  const approvalCard = page.locator('app-approval-card').first();
  const cardAppeared = await approvalCard
    .waitFor({ state: 'visible', timeout: 25000 })
    .then(() => true)
    .catch(() => false);

  if (!cardAppeared) {
    // The whole point of the page is the interrupt. The reply still has to
    // arrive so the clip shows what the agent did instead, but a run with no
    // approval card is a failed run, not a pass with a console line nobody
    // reads.
    ctx.fail(
      'app-approval-card never appeared -- the agent answered without calling ' +
        'requestApproval, so nothing was paused.',
    );
  } else {
    await sleep(1500);
    const approveBtn = page
      .locator('app-approval-card button:has-text("Approve")')
      .first();

    const box = await approveBtn.boundingBox().catch(() => null);
    if (box) {
      console.log(`   👉 Approving.`);
      await humanGlide(page, box.x + box.width / 2, box.y + box.height / 2, 22);
      await sleep(600);
      await humanClick(page);
    } else {
      ctx.warn('Approval card rendered but no Approve button was found on it.');
      await approveBtn.click().catch(() => {});
    }
  }

  // The decision returns to the agent and the run continues, so the reply that
  // matters is the one after the click.
  await waitForAgentResponseCompletion(page, config.waitAfterPromptMs ?? 4000, msgCount);
};
