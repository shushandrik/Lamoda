class Header {
  constructor(page) {
    this.page = page;
    this.deliveryRegionButton = page.locator('.header__go-geo-wrapper'); // top
    this.contactlessDeliveryButton = page.locator('._yellow_hj1sl_24'); // top
    this.genuineGoodsButton = page.locator('._right_f20wj_20 a[href*="podlinnost-produkcii-by"]'); // top  можно изменить
    this.PayWhenYouWantButton = page.locator('._red_hj1sl_20'); // top
    this.womenSectionButton = page.locator("//nav[@class='_root_1o7df_2']/a[1]"); // middle
    this.menSectionButton = page.locator("//nav[@class='_root_1o7df_2']/a[2]"); // middle
    this.childrenSectionButton = page.locator("//nav[@class='_root_1o7df_2']/a[3]"); // middle
    this.logo = page.locator('._mainLogo_vldjj_15'); // middle
    this.loginButton = page.locator('\'//div[@class=\'_root_12pcw_2\']/a[1]\''); // middle
    this.cartButton = page.locator('._count_1kpa7_11'); // middle
    this.searchField = page.locator("div[class='_root_lw8ys_2'] input");// bottom
    this.searchButton = page.locator("div[class='_root_lw8ys_2'] button"); // bottom
    this.topMenuBarSections = async (section) => `//*[@class='_root_1416b_2']/a[text()="${section}"]`;
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
