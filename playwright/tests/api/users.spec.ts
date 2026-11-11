import { test, expect } from '@playwright/test';
import { buildUser, DEMO_USER } from '../../utils/data';

test.describe('API /users', () => {
  test('registro + login de un usuario nuevo', async ({ request }) => {
    const user = buildUser();
    const reg = await request.post('/users/register', { data: user });
    expect(reg.status()).toBe(201);

    const login = await request.post('/users/login', { data: { email: user.email, password: user.password } });
    expect(login.ok()).toBeTruthy();
    const { access_token } = await login.json();
    expect(access_token).toBeTruthy();
  });

  test('perfil requiere autenticación', async ({ request }) => {
    const res = await request.get('/users/me');
    expect(res.status()).toBe(401);
  });

  test('perfil con token del usuario demo', async ({ request }) => {
    const login = await request.post('/users/login', { data: DEMO_USER });
    const { access_token } = await login.json();
    const me = await request.get('/users/me', { headers: { Authorization: `Bearer ${access_token}` } });
    expect(me.ok()).toBeTruthy();
    expect((await me.json()).email).toBe(DEMO_USER.email);
  });

  // Matriz generada con IA desde el OpenAPI (lab 12). Los status marcados como SUPUESTO se validan contra la API real.
  const invalid = [
    { campo: 'email', valor: 'sin-arroba', status: 422 },
    { campo: 'password', valor: '123', status: 422 },
    { campo: 'first_name', valor: '', status: 422 },
  ];
  for (const c of invalid) {
    test(`registro inválido: ${c.campo}="${c.valor}"`, async ({ request }) => {
      const user: Record<string, unknown> = { ...buildUser(), [c.campo]: c.valor };
      const res = await request.post('/users/register', { data: user });
      expect(res.status()).toBe(c.status);
    });
  }
});
