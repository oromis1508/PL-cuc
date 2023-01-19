import { Cell } from "./cell";
import { BaseElement } from "./base-element";

export class Row extends BaseElement {
  private cellLocator = this.locator + "//td";
  getCell(index: number) {
    return new Cell(this.cellLocator + `[${index + 1}]`);
  }
  getCellsCount() {
    return new Cell(this.cellLocator).elementsCount;
  }
}
