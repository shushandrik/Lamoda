const { test, expect, chromium } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Footer = require('../page-objects/page-components/footer');
const CatalogPage = require('../page-objects/catalogPage');

test.describe('Testing footer', () => {
  let basePage;
  let footer;
  let catalog;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    footer = new Footer(page);
    catalog = new CatalogPage(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
  });

  test('The subscribe button should be enabled', async ({ page }) => {
    await footer.fillingSubscribeField('400500@tut.by');
    await expect(footer.forHerSubscribeButton).toBeEnabled();
  });

  test('After changing the country, the domain of this country should open', async ({ page }) => {
    await footer.doChangeLanguage('Казахстан');
    await expect(page).toHaveURL(/.*kz/);
  });

  test('Should go to the page on the social network after clicking on the icon in the footer', async ({ page }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const pages = await context.pages();
    // TODO: разобраться с контекстом
    await footer.vkSocialMediaButton.click();
    // await page.pause();
    // let pages = await context.pages();
    await expect(pages[1]).toHaveURL(/.*vk/);
  });

  test('Should navigate from the footer menu to the correct section', async ({ page }) => {
    await footer.doSelectCategoriesFromFooter('Мужчинам', 'Обувь', 'Кеды');
    expect(catalog.pageTitle).toContainText('Мужские кеды');
  });
});
