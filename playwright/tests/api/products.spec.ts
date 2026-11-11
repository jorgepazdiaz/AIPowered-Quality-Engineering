import { test, expect } from '@playwright/test';

test.describe('API /products', () => {
  test('lista productos paginados @critical', async ({ request }) => {
    const res = await request.get('/products');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
    // validación de "contrato" mínima; en el lab 12 se reemplaza por un esquema completo
    for (const p of body.data) {
      expect(typeof p.id).toBe('string');
      expect(typeof p.name).toBe('string');
      expect(typeof p.price).toBe('number');
    }
  });

  test('búsqueda por término', async ({ request }) => {
    const res = await request.get('/products/search', { params: { q: 'hammer' } });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.data.every((p: { name: string }) => /hammer/i.test(p.name))).toBeTruthy();
  });

  test('producto inexistente devuelve 404', async ({ request }) => {
    const res = await request.get('/products/00000000-no-existe');
    expect(res.status()).toBe(404);
  });
});
