const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Header = require('../page-objects/page-components/header');
const Cart = require('../page-objects/page-components/cart');
const CatalogPage = require('../page-objects/catalogPage');
const ProductPage = require('../page-objects/productPage');

test.describe('Testing cart', async () => {
  let basePage;
  let header;
  let cart;
  let catalog;
  let productPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    header = new Header(page);
    cart = new Cart(page);
    catalog = new CatalogPage(page);
    productPage = new ProductPage(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
  });

  test('The product should be added to cart', async ({ page }) => {
    await basePage.navigate('https://www.lamoda.by/men-home/');
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки'); // "section" necessarily with a space
    await catalog.chooseProductBynumber(5)
    await productPage.addProductToCart();

    await expect(cart.productQuantityItem).toContainText('1');

    // await page.pause();
  });

  test('Product should removed from cart', async ({ page }) => {
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки'); // "section" necessarily with a space
    await catalog.chooseProductBynumber(5)
    await productPage.addProductToCart();
    await cart.infoAboutProduct.hover();
    await cart.removeButton.click();

    await expect(cart.messageCartEmpty).toContainText('В корзине нет товаров');
  });

  test('The price of the product and the value in the cart should be the same', async ({ page }) => {
    await basePage.navigate('https://www.lamoda.by/men-home/');
    await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки'); // "section" necessarily with a space
    await catalog.chooseProductBynumber(5)
    await productPage.addProductToCart();
    const priceProduct = await page.locator('._currentPrice_9zmsu_71').textContent();
    const totalPrice = await page.locator("div[class='_root_1f8ev_2'] span").textContent();

    expect(priceProduct).toEqual(totalPrice);
  });
});
