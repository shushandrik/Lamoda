class Autorization {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator("//div[@class='_root_12pcw_2']/a[1]");
    this.authFrame = page.locator('.d-modal__frame');
    this.registerLink = page.locator("//div[@class='_register_3a8g7_8']/a");
    this.numberOrEmailInputForLogin = page.locator("//div[@class='input-material__input-wrapper']/input");
    this.passwordField = page.locator("//div[@class='input-material__input-wrapper']/input[@type='password']");
    this.forgotPasswordLink = page.locator("//div[@class='_forgotPwd_3a8g7_18']/a");
    this.entrance = page.locator("//div[@class='_footer_3a8g7_36']/button");
    this.quickAuthVk = page.locator("//div[@class='_row_1jtb3_6']/span[1]");
    this.quickAuthGoogle = page.locator("//div[@class='_row_1jtb3_6']/span[2]");
    this.quickAuthMailru = page.locator("//div[@class='_row_1jtb3_6']/span[3]");
    this.profileLinkAfterRegistration = page.locator('._brokenUnhoverFix_gkbwv_8');
    this.favoritsLinkAfterAuthorization = page.locator("a[class='_root_clp6c_2 _secondaryLabel_clp6c_13 _link_12pcw_8 _link_12pcw_8']")
    this.profileQuitButton = page.locator("//div[@class='_dropdown_p8sn6_20']//a[text()='Выйти']")
    this.notificationWrongCredentials = page.locator('._notification_11do5_2');
    this.emailWhenRestorePasswordField = page.locator("div[class='d-modal__content d-modal__content_paddings d-modal__content_web8923'] input");
    this.restoreButton = page.locator('._footer_ht48r_34 button');
    this.enterNameField = page.locator("//div[@class='_content_1ekkp_13']//input[@type='text']");
    this.enterEmailField = page.locator("//div[@class='input-material__input-wrapper']//input[@type='email'] ");
    this.enterPhoneNumberField = page.locator = ("//div[@class='_content_1ekkp_13']//input[@type='tel']");
    this.enterPasswordField = page.locator = ("//div[@class='_content_1ekkp_13']//input[@name='password']");
    this.ConfirmPasswordField = page.locator = ("//div[@class='_content_1ekkp_13']//input[@name='password_confirmation']");
    this.subscribeNewsCheckbox = page.locator = ("//div[@class='x-checkbox x-checkbox_alignment_center _checkboxMargin_1cc0m_7 _checkbox_1cc0m_7']//span");
    this.policyAgreementCheckbox = page.locator = ("//div[@class='x-checkbox x-checkbox_alignment_center _root_g83ar_2 _inputMargin_1cc0m_44 _policyAgreement_1cc0m_16']//span");
    this.regisrationButton = page.locator = (`div[class='_footer_1cc0m_56']`);
  }

  async doLoginWithCredentials(email, password) {
    await this.loginButton.click();
    await this.numberOrEmailInputForLogin.click();
    await this.numberOrEmailInputForLogin.fill(email);
    await this.page.keyboard.press('Tab');
    await this.passwordField.click();
    await this.passwordField.fill(password);
    await this.entrance.click();
  }

  async doPasswordRecovery(email) {
    await this.loginButton.click();
    await this.forgotPasswordLink.click();
    await this.emailWhenRestorePasswordField.click();
    await this.emailWhenRestorePasswordField.fill(email);
  }

  async quickVkloginButton() {
    await this.loginButton.click();
    await this.quickAuthVk.click();
  }

  async registrationNewUser(name, email, phoneNumber9digit, password) {
    await this.loginButton.click();
    await this.registerLink.click();
    await this.enterNameField.fill(name);
    await this.page.keyboard.press('Tab');
    await this.enterEmailField.fill(email);
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(phoneNumber9digit);
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(password);
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(password);   
    await this.page.check(this.policyAgreementCheckbox);
  }
}
module.exports = Autorization;

