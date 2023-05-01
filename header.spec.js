const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Header = require('../page-objects/page-components/header');
const CatalogPage = require('../page-objects/catalogPage');

test.describe('Testing header', async () => {
  let basePage;
  let header;
  let catalogPage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    header = new Header(page);
    catalogPage = new CatalogPage(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
  });

  test('Should go to the corresponding section of the product catalog', async ({ page }) => {
    await header.goToPageWithTopMenuBar(' Одежда', 'Пиджаки и костюмы');
    await expect(catalogPage.pageTitle).toContainText('пиджак');
  });

  test('The delivery area should change', async ({ page }) => {
    await header.chooseCityForDelivery('г. Барановичи');
    expect(header.deliveryRegionButton).toContainText('Барановичи');
  });
});
