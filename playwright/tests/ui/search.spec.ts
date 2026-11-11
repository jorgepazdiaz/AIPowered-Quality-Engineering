import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Búsqueda de productos', () => {
  test('buscar un término existente muestra resultados relacionados @critical', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.search('hammer');
    await expect(home.productNames.first()).toContainText(/hammer/i);
  });

  test('buscar un término inexistente no muestra productos', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.search('zzz-no-existe-123');
    await expect(home.productNames).toHaveCount(0);
  });
});
