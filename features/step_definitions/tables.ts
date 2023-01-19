import { TablesPage } from "./../../page-objects/tables";
import { expect } from "@playwright/test";
import { TestPage } from "../../helpers/page-singleton";
import { Given, When, Then } from "@cucumber/cucumber";

const expectedContent = [
  [
    "Smith",
    "John",
    "jsmith@gmail.com",
    "$50.00",
    "http://www.jsmith.com",
    "edit\n          delete",
  ],
  [
    "Bach",
    "Frank",
    "fbach@yahoo.com",
    "$51.00",
    "http://www.frank.com",
    "edit\n          delete",
  ],
  [
    "Doe",
    "Jason",
    "jdoe@hotmail.com",
    "$100.00",
    "http://www.jdoe.com",
    "edit\n          delete",
  ],
  [
    "Conway",
    "Tim",
    "tconway@earthlink.net",
    "$50.00",
    "http://www.timconway.com",
    "edit\n          delete",
  ],
];

Given(/I am on the tables page/, async () => {
  await TestPage.instance.page.goto(
    "https://the-internet.herokuapp.com/tables"
  );
  expect(await new TablesPage().table1.visible).toBe(true);
});
Then(/I check table content/, async () => {
  const table = new TablesPage().table1;
  let now = Date.now();
  expect(await table.getTableText()).toEqual(expectedContent);
  console.log(Date.now() - now);

  now = Date.now();
  const rows = await table.getRowsCount();
  for (let index = 0; index < rows; index++) {
    const row = table.getRow(index);
    const cells = await row.getCellsCount();
    for (let index2 = 0; index2 < cells; index2++) {
      const cell = row.getCell(index2);
      expect(await cell.text).toBe(expectedContent[index][index2]);
    }
  }
  console.log(Date.now() - now);
});

When(/I click (.*?) header/, async (header: string) => {
  await new TablesPage().table1.getHeader(header).click();
});
Then(/Table is sorted by (.*?) header/, (header: string) => {
  
});
