import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home sin violaciones críticas de accesibilidad', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('product-name').first().waitFor();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const critical = results.violations.filter((v) => v.impact === 'critical');
  // Lab 13: pasar results.violations a la IA para obtener explicación y fix sugerido
  expect(critical, JSON.stringify(critical.map((v) => v.id))).toEqual([]);
});
