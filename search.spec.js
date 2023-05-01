const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Search = require('../page-objects/page-components/search');
const CatalogPage = require('../page-objects/catalogPage');

test('Should do search', async ({ page }) => {
  const search = new Search(page);
  const basePage = new BasePage(page);
  const catalogPage = new CatalogPage(page);
  await basePage.navigate('https://www.lamoda.by/men-home/');
  await search.doSearch('Кроссовки Puma');
  await expect(await catalogPage.productCardBrandName.nth(0)).toContainText('PUMA');
});
