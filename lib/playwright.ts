import { BrowserContext, test as base, chromium } from "@playwright/test";
import { initialSetup } from "@synthetixio/synpress/commands/metamask";
import { prepareMetamask } from "@synthetixio/synpress/helpers";
import "./fix-elements";

export * from "@playwright/test";

export const test = base.extend<{
  context: BrowserContext;
}>({
  context: async ({ headless }, use) => {
    const metamaskPath = await prepareMetamask(process.env.METAMASK_VERSION || "11.16.14");

    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      "--remote-debugging-port=9222",
      headless && "--headless=new",
      process.env.CI && "--disable-gpu",
    ].filter(Boolean as unknown as (x: unknown) => x is string);

    // for loading chrome extension in headless mode
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: browserArgs,
    });

    // waiting for the extension to load
    const p = await context.waitForEvent("page", {
      predicate: (page) => {
        return /^chrome-extension:/.test(page.url());
      },
    });

    await p.waitForLoadState("load");

    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: process.env.SECRET_WORDS_OR_PRIVATE_KEY,
      network: process.env.NETWORK,
      password: process.env.PASSWORD,
      enableAdvancedSettings: true,
    });

    await use(context);
  },
});
