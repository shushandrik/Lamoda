class Search {
  constructor(page) {
    this.page = page;
    this.searchField = page.locator("div[class='_root_lw8ys_2'] input");
    this.searchButton = page.locator("div[class='_root_lw8ys_2'] button");
  }

  async doSearch(searchQuery) {
    await this.searchField.fill(searchQuery);
    await this.searchButton.click();
  }
}

module.exports = Search;
