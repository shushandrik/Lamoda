const CatalogPage = require('../catalogPage');
const Header = require('./header');

class Cart {
  constructor(page) {
    this.page = page;
    this.productQuantityItem = page.locator("span[class='ui-checkout-cart__products-count']");
    this.productPrice = page.locator("span[class='_currentPrice_9zmsu_71']"); // массив, если в корзине несколько товаров. Локатор одинаков для каждого товара
    this.productPriceWithDiscount = page.locator("span[class='_discountPrice_9zmsu_75']");
    this.totalPrice = page.locator("div[class='_root_1f8ev_2'] span");
    this.infoAboutProduct = page.locator("div[class='_desktopWrapper_tbv8w_23']");
    this.removeButton = page.locator('.icon_remove-item-checkout-inactive');
    this.messageCartEmpty = page.locator("div[class='_title_1wc5j_7']")
  }

}

module.exports = Cart;
