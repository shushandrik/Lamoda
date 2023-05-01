const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const CatalogPage = require('../page-objects/catalogPage');
const ProductPage = require('../page-objects/productPage');
const Header = require('../page-objects/page-components/header');


test.describe('Catalog tests', async () => {
  test('Should filter by given values', async ({ page }) => {
    const basePage = new BasePage(page);
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const header = new Header(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки');
    await catalogPage.goToFilter('Цвет', 'бежевый');
    await catalogPage.productCardLink.nth(1).click();

    await expect(productPage.productColorInDescription).toContainText('бежевый');
  });

  test('Quantity products on the page should match with quantity in description', async ({ page }) => {
    const basePage = new BasePage(page);
    const catalogPage = new CatalogPage(page);
    const header = new Header(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки');
    await page.waitForLoadState('networkidle');
    const quantityOfProuctCards = await catalogPage.productCardLink.count();
    await expect(quantityOfProuctCards).toEqual(60);
    // TODO: необходимо проскроллить до конца страницы, чтобы все товары прогрузились, видит только 12 из 60. Также забрать только 2 символа из 60 из 1280
  });
});
