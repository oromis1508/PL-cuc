import { Page, Browser, BrowserContext } from "playwright-core";

export class TestPage {
  public readonly page: Page;
  public readonly browser: Browser;
  public readonly context: BrowserContext;
  private static testPageInstance: TestPage;

  private constructor(browser: Browser, context: BrowserContext, page: Page) {
    this.page = page;
    this.browser = browser;
    this.context = context;
  }

  static init(browser: Browser, context: BrowserContext, page: Page) {
    this.testPageInstance = new TestPage(browser, context, page);
  }

  static get instance() {
    return this.testPageInstance;
  }
}
