class CatalogPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator("//div[@class='_title_641wy_6']/h1");
    this.quantityOfGoodsInTitle = page.locator("//div[@class='_title_641wy_6']/span"); // -удалить буквы (товар)
    this.catalogNavigationSectionsLink = page.locator("a[class='_root_clp6c_2 _label_clp6c_17 _link_ki68p_27 _itemTitle_ki68p_10 _link_ki68p_27 _itemTitle_ki68p_10']");
    this.catalogNavigationSubSectionsLink = page.locator("a[class='_root_clp6c_2 _label_clp6c_17 _link_ki68p_27 _link_ki68p_27']"); // на сублинки нужно иногда кликать, чтобы появились другие
    this.quantityOfGoodsSectionAndSubsection = page.locator("span[class='_found_ki68p_22']");
    this.filterItem = async (nameFilterItem) => `//div[@class='_item_2zwbo_2']//span[text()='${nameFilterItem}']`; 
    this.resetFilter = page.locator('._reset_1dux9_8');
    this.sortingItem = page.locator("._item_2zwbo_2").nth(0)
    this.sortingItemRadioButton = async (sortBy) => `//div[@class='_item_g6flk_14']/span[text()='${sortBy}']`;
    this.filterItemCheckbox = async (filterValue) => `//div[@class='_content_iqi8f_47']//span[text()='${filterValue}']`;
    this.applyButton = page.locator('._footer_kmd4e_7 button');
    this.productCardLink = page.locator(`div[class='_area_552z7_8']`);
    this.productPriceWithoutDiscont = page.locator('//div[@class=\'x-product-card-description__microdata-wrap\']//span[@class=\'x-product-card-description__price-single x-product-card-description__price-WEB8507_price_no_bold _price_k0rqx_8\']');
    this.productPriceDiscount = page.locator('//div[@class=\'x-product-card-description__microdata-wrap\']//span[@class=\'x-product-card-description__price-new x-product-card-description__price-WEB8507_price_no_bold _price_k0rqx_8\']');
    this.productCardBrandName = page.locator(`div[class='x-product-card-description__brand-name _brandName_k0rqx_6']`); 
    this.productCardName = page.locator('x-product-card-description__product-name _productName_k0rqx_7');
    this.productCardSize = page.locator('x-product-card-sizes__size x-product-card-sizes__link__catalog');
    this.seeSimilarButton = page.locator('.icon_similar-products-catalog');
    this.addToFavoritesButton = page.locator('.icon_heart-catalog');
    this.quickViewButton = page.locator('._quickView_1pjd5_67'); 
    this.showMoreButton = page.locator('._showMore_z1yqr_2');
    this.nextPageButton = page.locator('_nextPage_7g9n8_74');
    
  }


  async goToSorting(sortBy) {
    await this.sortingItem.click();
    await this.page.locator(await this.sortingItemRadioButton(sortBy)).click();
  }

  async goToFilter(nameFilterItem, filterValue) {
    await this.page.locator(await this.filterItem(nameFilterItem)).click();
    await this.page.locator(await this.filterItemCheckbox(filterValue)).click();
    await this.applyButton.click();
  }
  async addToCart (){
    await this.page.locator(await this.productCardLink.nth(5)).click();
    await this.page.locator (await this.openSizeButtonProductPage).click();
    await this.page.locator (await this.productsizeintoProductPage.nth(2)).click()
    await this.page.locator (await this.addToCartButton).click();
    await this.page.locator (await this.goToCartProductPage).click();
  }

  async chooseProductBynumber(number){
    await this.productCardLink.nth(number).click();
  }
} 

module.exports = CatalogPage;
