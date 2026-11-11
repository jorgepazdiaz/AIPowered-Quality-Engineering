import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DEMO_USER } from '../../utils/data';

test.describe('Login', () => {
  test('usuario demo inicia sesión @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(DEMO_USER.email, DEMO_USER.password);
    await login.expectLoggedIn();
  });

  // Data-driven: casos negativos generados con IA en el lab 7 y revisados por el equipo
  const invalid = [
    { name: 'password incorrecto', email: DEMO_USER.email, password: 'incorrecto123' },
    { name: 'email no registrado', email: 'no.existe@example.com', password: 'welcome01' },
  ];
  for (const c of invalid) {
    test(`login falla: ${c.name}`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(c.email, c.password);
      await expect(page).not.toHaveURL(/\/account/);
      await expect(login.error).toBeVisible();
    });
  }
});
