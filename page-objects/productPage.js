class ProductPage {
  constructor (page){
    this.page=page;
    this.brandName = page.locator("span[class='product-title__brand-name ui-product-brand-title']");
    this.modelName = page.locator('._modelName_rumwo_22');
    this.openSizeButton = page.locator(`//div[@class= '_placeholder_1widv_51 _placeholderDisabled_1widv_98']`);
    this.productSize = page.locator (`//div[@class='_colspan_1widv_150 ui-product-page-sizes-chooser-item_enabled ui-product-page-sizes-chooser-item']`);
    this.addToCartButton = page.locator(`div[class='recaptcha _recaptcha_sztd3_7']`);
    this.goToCartButton = page.locator ('.d-modal__bottom a'); 
    this.continueShoppingButtonModalWindow = ('.d-modal__bottom button')
    this.goToCartButtonModalWindow = page.locator ('.d-modal__bottom a');
    this.productColorInDescription = page.locator("span[class='_value_ajirn_27 ui-product-description-attribute-color_family']")
    this.descriptionProduct = async (descriptionItem) => (`//p[@class= '_item_ajirn_2']//span[text()="${descriptionItem}"]`);
}

async addProductToCart() {

  await this.openSizeButton.click();
  await this.productSize.nth(1).click()
  await this.addToCartButton.click();
  await this.goToCartButtonModalWindow.click();



}
}
module.exports = ProductPage;
