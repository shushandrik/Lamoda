class Header {
  constructor(page) {
    this.page = page;
    this.deliveryRegionButton = page.locator('.header__go-geo-wrapper'); 
    this.contactlessDeliveryButton = page.locator('._yellow_hj1sl_24'); 
    this.genuineGoodsButton = page.locator('._right_f20wj_20 a[href*="podlinnost-produkcii-by"]'); 
    this.PayWhenYouWantButton = page.locator('._red_hj1sl_20'); 
    this.womenSectionButton = page.locator("//nav[@class='_root_1o7df_2']/a[1]"); 
    this.menSectionButton = page.locator("//nav[@class='_root_1o7df_2']/a[2]"); 
    this.childrenSectionButton = page.locator("//nav[@class='_root_1o7df_2']/a[3]"); 
    this.logo = page.locator('._mainLogo_vldjj_15'); 
    this.loginButton = page.locator('\'//div[@class=\'_root_12pcw_2\']/a[1]\''); 
    this.cartButton = page.locator('._count_1kpa7_11'); 
    this.searchField = page.locator("div[class='_root_lw8ys_2'] input");
    this.searchButton = page.locator("div[class='_root_lw8ys_2'] button"); 
    this.topMenuBarSections = async (section) => `//*[@class='_root_1416b_2']/a[text()="${section}"]`; //попробовать normalize-space()
    this.topMenuBarSubSections = async (subSectionName) => `//nav[@class ='_root_1416b_2'][@role='menubar']//*[@role='link' and text()="${subSectionName}"]`;
    this.cityDeliveryLink = async (city) => `//div[@class='_citiesList_rq1gl_34']//span[text()="${city}"]`;
    this.goShoppingButton = page.locator('._controls_rq1gl_69 button:first-child') 

  }

  async goToPageWithTopMenuBar(section, subSection) {
    await this.page.locator(await this.topMenuBarSections(section)).hover();
    await this.page.locator(await this.topMenuBarSubSections(subSection)).click();
  }

  async chooseCityForDelivery (city) {
    await this.deliveryRegionButton.click();
    await this.page.locator(await this.cityDeliveryLink (city)). click();
    await this.goShoppingButton.click();

  }
}

module.exports = Header;
