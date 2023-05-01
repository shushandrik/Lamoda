const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const CatalogPage = require('../page-objects/catalogPage');
const ProductPage = require('../page-objects/productPage');
const Header = require('../page-objects/page-components/header');
const Autorization = require('../page-objects/page-components/authorization');

test.describe('Catalog tests', async () => {
  test('Should sorting by price', async ({ page }) => {
    const basePage = new BasePage(page);
    const catalogPage = new CatalogPage(page);
    await basePage.navigate('https://www.lamoda.by/c/17/shoes-men/');
    // await catalogPage.goToSorting('По скидкам');
    const valueBeforeSorting = await catalogPage.productPriceWithoutDiscont;
    const innerTexts = await Promise.all(valueBeforeSorting.map(async (ele, i) => await ele.innerText()));
    console.log(await valueBeforeSorting);

    await page.pause(2000);
  });

  test('Should filter by given values', async ({ page }) => {
    const basePage = new BasePage(page);
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    await basePage.navigate('https://www.lamoda.by/c/17/shoes-men/');
    await catalogPage.goToFilter('Цвет', 'бежевый');
    await catalogPage.productCardLink.nth(1).click();

    await expect(productPage.productColorInDescription).toContainText('бежевый');
  });

  test('Quantity products on the page should match with quantity in description', async ({ page }) => {
    const basePage = new BasePage(page);
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);
    const header = new Header(page);
    await basePage.navigate('https://www.lamoda.by/c/17/shoes-men/');
    // await header.goToPageWithTopMenuBar(' Одежда', 'Рубашки');
    await page.evaluate(() => { window.scrollBy(0, 300); });
    //await page.waitForLoadState('networkidle');
    await page.evaluate(() => { window.scrollBy(300, 600); });
   // await page.waitForLoadState('networkidle');
    await page.evaluate(() => { window.scrollBy(600, 900); });
    await page.evaluate(() => { window.scrollBy(500, 1200); });
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => { window.scrollBy(0, 1500); });
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => { window.scrollBy(0, 1900); });
    await page.waitForLoadState('networkidle');
    //await page.evaluate(() => { window.scrollBy(0, 2800); });
    //await page.mouse.move(0,6000);
    //await page.mouse.down(0,6000);
    //await page.mouse.wheel(0,6000);
    
    await page.waitForLoadState('networkidle');
    //await page.pause(2000);
    const quantityOfProuctCards = await page.locator('div[class=\'_area_552z7_8\']').count();

    // проскроллить до низа страницы
    console.log(quantityOfProuctCards);
    // TODO: необходимо проскроллить до конца страницы, чтобы все товары прогрузились, видит только 12 из 60. Также забрать только 2 символа из 60 из 1280

    expect(quantityOfProuctCards).toEqual(60);
  });

  test('Product should be added to favorites', async ({ page }) => {
    const basePage = new BasePage(page);
    const catalogPage = new CatalogPage(page);
    const header = new Header(page);
    const authorization = new Autorization(page);
    await basePage.navigate('https://www.lamoda.by/c/17/shoes-men/');
    // await header.goToPageWithTopMenuBar(' Одежда', 'Толстовки и олимпийки');
    await authorization.doLoginWithCredentials('400500@tut.by', 'QweQ62148333');
    await catalogPage.addToFavoritesButton.nth(1).click();

    await authorization.favoritsLinkAfterAuthorization.click();

    await page.pause();

    // await expect (productPage.productColorInDescription).toContainText('бежевый')
  });
});

// await page.pause();
