/**
 * Escalón 4 · Test data-driven generado con Copilot.
 * Lee los casos de data/HU-CART-03.casos.json:
 *   - en el Escalón 4 ese archivo sale de la tabla del Escalón 3 (chat → Copilot → JSON);
 *   - en el Escalón 5 se reemplaza por la salida del agente con `npm run use:agent-cases`.
 * HU-CART-03 es didáctica: si un caso inválido falla contra Toolshop, el test está mostrando
 * que la app no implementa esa regla (conversarlo con el PO: ¿bug o HU incorrecta?).
 */
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

type Caso = { id: string; field: string; value: number; valid: boolean; expected: string };
const archivo = path.join(__dirname, '../../data/HU-CART-03.casos.json');
const casos: Caso[] = JSON.parse(fs.readFileSync(archivo, 'utf8')).cases.filter((c: Caso) => c.field === 'cantidad');

test.describe('HU-CART-03 · valores límite de cantidad', () => {
  for (const c of casos) {
    test(`${c.id} cantidad=${c.value} (${c.valid ? 'válido' : 'inválido'})`, async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('product-name').first().click();
      await page.getByTestId('quantity').fill(String(c.value));
      await page.getByTestId('add-to-cart').click();

      if (c.valid) {
        await expect(page.getByTestId('cart-quantity')).toHaveText(String(c.value));
      } else {
        // Esperado según la HU: no se agrega al carrito
        await expect(page.getByTestId('cart-quantity')).toBeHidden();
      }
    });
  }
});
