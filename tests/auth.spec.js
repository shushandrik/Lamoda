const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Autorization = require('../page-objects/page-components/authorization');

test.describe('Authorization page', async () => {
  let basePage;
  let authorization;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    authorization = new Autorization(page);
    await basePage.navigate('https://www.lamoda.by/men-home/');
  });

  test('Should logged with correct credentials', async ({ page }) => {
    await authorization.doLoginWithCredentials('400500@tut.by', 'QweQ62148333');
    await expect(authorization.profileLinkAfterRegistration).toContainText('Профиль');
  });

  test('Should don`t logged with wrong credentials', async ({ page }) => {
    await authorization.doLoginWithCredentials('400500@tut.by', 'QweQ62148333глргш');
    await expect(authorization.notificationWrongCredentials).toContainText('Неверный');
  });

  test('Button recovery password should be active after input email ', async ({ page }) => {
    await authorization.doPasswordRecovery('wrong@email.ru');
    await expect(authorization.restoreButton).toBeEnabled();
  });

  test('The button for quick authorization should be enabled', async ({ page }) => {
    await authorization.loginButton.click();
    await expect(authorization.quickAuthVk).toBeEnabled();
  });

  test('Should registration new user', async ({ page }) => {
    await authorization.registrationNewUser('Андрей', '400500@tut.by', '296214833', 'QweQ123456');
    await expect(await authorization.regisrationButton).toBeEnabled();
  });

  test('Should log out', async ({ page }) => {
    await authorization.doLoginWithCredentials('400500@tut.by', 'QweQ62148333');
    await authorization.profileLinkAfterRegistration.hover();
    await authorization.profileQuitButton.click();
    await expect(authorization.loginButton).toContainText('Войти');
  });
});
