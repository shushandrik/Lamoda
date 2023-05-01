class Footer {
  constructor(page) {
    this.page = page;
    this.emailFieldForSubscribe = page.locator('.input__input');
    this.personalDataCheckbox = page.locator("span[class='_icon_1qrec_2 x-checkbox__icon']")
    this.forHerSubscribeButton = page.locator("div[class='_buttons_1ud0a_11'] button:first-child")
    this.forHimSubscribeButton = page.locator("div[class='_buttons_1ud0a_11'] button:nth-child(2)")
    this.vkSocialMediaButton = page.locator(".social-items a:first-child")
    this.twitterSocialMediaButton = page.locator(".social-items a:nth-child(2)")
    this.okSocialMediaButton = page.locator(".social-items a:nth-child(3)")
    this.changeCountryButton = page.locator("._description_ue1al_51")
    this.footerMenuBar = async (tabName) => `//div[@class='x-footer-seo-menu-tab-title' and text()="${tabName}"]`
    this.footerMenuBarCategories = async (category) => `//div[@class='x-footer-seo-menu-tab-category' and text()="${category}"]`
    this.footrMenuBarLinks = async (link) =>`//div[@class='x-footer-seo-menu-tab-links']//a[@class='_root_clp6c_2 _label_clp6c_17 _item_6hb9c_2 _item_default_6hb9c_11 _item_6hb9c_2 _item_default_6hb9c_11' and text()="${link}"]`
    this.chooseLanguage = async (city) => `//a[@class='_item_ue1al_19']/span[text()="${city}"]`

  }

    async fillingSubscribeField (email) {
      await this.emailFieldForSubscribe.fill(email);
      await this.personalDataCheckbox.check();   
  
}
  async doChangeLanguage (city) {
    await this.changeCountryButton.click();
    await this.page.locator( await this.chooseLanguage(city)).click();
}

async doSelectCategoriesFromFooter (tabName, category, link){
  await this.page.locator(await this.footerMenuBar(tabName)).click()
  await this.page.locator(await this.footerMenuBarCategories(category)).nth(1).click();
  await this.page.locator (await this.footrMenuBarLinks(link)).click()
}

}

module.exports = Footer;
  