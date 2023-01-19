import { Locator } from "playwright-core";
import { TestPage } from "../helpers/page-singleton";

export abstract class BaseElement {
  protected readonly page = TestPage.instance.page;

  public constructor(protected readonly locator: string) {}

  public get visible() {
    return this.getElement().isVisible();
  }

  public get elementsCount() {
    return this.page
      .locator(this.locator)
      .all()
      .then((els) => els.length);
  }

  public get text() {
    return this.waitForExists().then(() =>
      this.getElement()
        .textContent()
        .then((text) => text?.trim())
    );
  }

  protected getElement(): Locator {
    return this.page.locator(this.locator);
  }

  protected waitForExists() {
    return this.getElement().waitFor({ state: "attached" });
  }

  protected async waitForVisible() {
    await this.waitForExists();
    await this.getElement().waitFor({ state: "visible" });

    return this.getElement();
  }

  public async click() {
    const el = await this.waitForVisible();
    await el.click();
  }

  public async hover() {
    const el = await this.waitForVisible();
    await el.hover();
  }

  public async rightClick() {
    const el = await this.waitForVisible();

    await el.click({ button: "right" });
  }

  public async getAttribute(attr: string) {
    await this.waitForExists();
    return await this.getElement().getAttribute(attr);
  }
}
