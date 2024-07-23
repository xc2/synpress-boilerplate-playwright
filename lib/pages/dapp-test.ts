import { setupSerial } from "@/hooks";
import { Locator, Page } from "@playwright/test";
import { createPageRegistry } from "./page-registry";

export class DappTestPage {
  readonly page: Page;
  readonly useMetamaskButton: Locator;
  readonly connectButton: Locator;
  readonly accountNameEl: Locator;
  constructor(page: Page) {
    this.page = page;
    this.useMetamaskButton = page.locator("#provider button");
    this.connectButton = page.locator("#connectButton");
    this.accountNameEl = page.locator("#accounts");
  }

  async goto() {
    await this.page.goto(process.env.TESTAPP_URL || "https://metamask.github.io/test-dapp/");
  }

  async useMetamask() {
    await this.useMetamaskButton.click();
  }
  async connect() {
    await this.connectButton.click();
  }
}

export const getDappTestPage = createPageRegistry(DappTestPage);

export const setupDappTestPage = () =>
  setupSerial(async ({ page }) => {
    const p = getDappTestPage(page);
    await p.goto();
    return p;
  });
