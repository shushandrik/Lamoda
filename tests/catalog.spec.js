const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const CatalogPage = require('../page-objects/catalogPage');
const ProductPage = require('../page-objects/productPage');
const Header = require('../page-objects/page-components/header');
const Cart = require('../page-objects/page-components/cart');

test.describe('Catalog tests', async () => {
  let basePage;
  let header;
  let cart;
  let catalog;
  let productPage;
  let catalogPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    header = new Header(page);
    cart = new Cart(page);
    catalog = new CatalogPage(page);
    productPage = new ProductPage(page);
    catalogPage = new CatalogPage(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
  });

  test('Should filter by given values', async ({ page }) => {
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки');
    await catalogPage.goToFilter('Цвет', 'бежевый');
    await catalogPage.productCardLink.nth(1).click();

    await expect(productPage.productColorInDescription).toContainText('бежевый');
  });

  test('Quantity products on the page should match with quantity in description', async ({ page }) => {
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки');
    await page.waitForLoadState('networkidle');
    const quantityOfProuctCards = await catalogPage.productCardLink.count();
    await expect(quantityOfProuctCards).toEqual(60);
    // TODO: необходимо проскроллить до конца страницы, чтобы все товары прогрузились, видит только 12 из 60. Также забрать только 2 символа из 60 из 1280
  });
});
