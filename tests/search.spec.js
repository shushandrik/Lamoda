const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Search = require('../page-objects/page-components/search');
const CatalogPage = require('../page-objects/catalogPage');

test.describe('Testing search', async () => {
  let basePage;
  let catalogPage;
  let search;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    catalogPage = new CatalogPage(page);
    search = new Search(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
  });

  test('Should do search', async ({ page }) => {
    await search.doSearch('Кроссовки Puma');
    await expect(await catalogPage.productCardBrandName.nth(0)).toContainText('PUMA');
  });
});
