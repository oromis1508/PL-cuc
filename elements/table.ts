import { Header } from "./header";
import { Row } from "./row";
import { BaseElement } from "./base-element";

export class Table extends BaseElement {
  private rowLocator = this.locator + "//tbody//tr";
  private headerLocator = this.locator + "//thead//th";
  protected rowRegex = /<tr((.*?)<td(.*?))<\/tr>/gms;
  protected cellRegex = /<td.*?(.*?)\/td>/gms;
  protected cellDataRegex = />(.*?)</gms;

  getRow(index: number) {
    return new Row(this.rowLocator + `[${index + 1}]`);
  }

  getHeader(index: number): Header;
  getHeader(index: string): Header;
  getHeader(head: number | string) {
    const suffix =
      typeof head === "number"
        ? `[${head + 1}]`
        : `[normalize-space()='${head}']`;

    return new Header(this.headerLocator + suffix);
  }

  getRowsCount() {
    return new Row(this.rowLocator).elementsCount;
  }

  async getTableText() {
    const html = await this.getElement().innerHTML();
    const rowRegex = this.rowRegex;
    const cellRegex = this.cellRegex;
    const cellDataRegex = this.cellDataRegex;

    let rowResult: RegExpExecArray | null;

    let result: string[][] = [];
    while ((rowResult = rowRegex.exec(html))) {
      result.push([]);
      let cellResult: RegExpExecArray | null;
      while ((cellResult = cellRegex.exec(rowResult[1]))) {
        let cellContent = "";
        let contentResult: RegExpExecArray | null;
        while ((contentResult = cellDataRegex.exec(cellResult[1]))) {
          cellContent += contentResult[1];
        }
        result.at(-1)?.push(cellContent.trim());
      }
    }

    return result;
  }
}

//tbody//tr[.//td[contains(text(), 'i') and position()=1]]
