import { defineConfig, devices } from "@playwright/test";
import "./load-dotenv";

export default defineConfig({
  use: {
    ...devices["Desktop Chrome"],
    // add `DISPLAY_BROWSER=1` to your environment to see the browser
    headless: process.env.DISPLAY_BROWSER !== "1",
  },
});
