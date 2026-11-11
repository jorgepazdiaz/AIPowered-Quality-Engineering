import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('agregar un producto al carrito actualiza el contador @critical', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.openProduct(0);
  await page.getByTestId('add-to-cart').click();
  await expect(page.getByTestId('cart-quantity')).toHaveText('1');
});
