import { TestPage } from "../../helpers/page-singleton";
import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright-core";

setDefaultTimeout(30000);

// Synchronous
Before(async function () {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setDefaultNavigationTimeout(30000);
  await page.setDefaultTimeout(15000);

  TestPage.init(browser, context, page);
});

// Asynchronous Callback
After(async () => {
  await TestPage.instance.browser.close();
});
