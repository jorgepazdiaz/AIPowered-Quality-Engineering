import { test, expect } from '@playwright/test';

test.describe('Regresión visual', () => {
  test('home', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('product-name').first().waitFor();
    await expect(page).toHaveScreenshot('home.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [page.getByTestId('product-price')], // datos variables
    });
  });

  test('login', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByTestId('login-submit')).toBeVisible();
    await expect(page).toHaveScreenshot('login.png', { animations: 'disabled' });
  });
});
