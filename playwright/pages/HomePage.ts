import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.productNames = page.getByTestId('product-name');
  }

  async goto() {
    await this.page.goto('/');
    await this.productNames.first().waitFor();
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async openProduct(index = 0) {
    await this.productNames.nth(index).click();
  }
}
