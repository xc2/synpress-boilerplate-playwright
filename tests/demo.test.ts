import { setupDappTestPage } from "@/pages/dapp-test";
import { expect, test } from "@/playwright";
import * as metamask from "@synthetixio/synpress/commands/metamask";

const getPage = setupDappTestPage();

test("test-1", async ({}) => {
  const p = getPage();
  await p.useMetamask();
  await p.connect();
  await metamask.acceptAccess();
  await expect(p.accountNameEl).toHaveText(/^0x/);
});

test("test-2", async ({}) => {
  const p = getPage();
  await expect(p.accountNameEl).toHaveText(/^0x/);
});
