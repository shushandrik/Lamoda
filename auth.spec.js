const { test, expect } = require('@playwright/test');
const BasePage = require('../page-objects/basePage');
const Header = require('../page-objects/page-components/header');
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
    await expect(authorization.profileLinkAfterRegistration).toContainText('Профиль'); // проверяет, что с верными кредами происходит вход в ЛК.
  });

  test('Should don`t logged with wrong credentials', async ({ page }) => {
    await authorization.doLoginWithCredentials('400500@tut.by', 'QweQ62148333глргш');
    await expect(authorization.notificationWrongCredentials).toContainText('Неверный'); // проверяет, что при не верных кредах появляется сообщение с ошибкой
  });

  test('Button recovery password should be active ', async ({ page }) => {
    await authorization.doPasswordRecovery('wrong@email.ru');
    await expect(authorization.restoreButton).toBeEnabled(); // проверяет, что кнопка "Восстановить" становится активной и письмо может быть отправлено
  });

  test('The button for quick authorization should be enabled', async ({ page }) => { // можно сделать параметризированный тест
    await authorization.loginButton.click();
    await expect(authorization.quickAuthVk).toBeEnabled();
  });

  test('Should reg new user', async ({ page }) => {
    await authorization.registrationNewUser('Андрей', '400500@tut.by', '296214833', 'QweQ123456');
    //await expect(authorization.policyAgreementCheckbox).toBeChecked();
    await expect (await authorization.regisrationButton).toBeEnabled();
  });

  test('Should log out', async ({ page }) => {
    await authorization.doLoginWithCredentials('400500@tut.by', 'QweQ62148333');
    await authorization.profileLinkAfterRegistration.hover();
    await authorization.profileQuitButton.click();
    await expect(authorization.loginButton).toContainText('Войти');
  });
});
