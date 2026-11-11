import { faker } from '@faker-js/faker';

/** Usuarios demo publicados por Toolshop (verificar en la página de login). */
export const DEMO_USER = {
  email: process.env.DEMO_EMAIL ?? 'customer@practicesoftwaretesting.com',
  password: process.env.DEMO_PASSWORD ?? 'welcome01',
};

/** Datos sintéticos únicos por ejecución: nunca datos reales. */
export function buildUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    dob: '1990-05-15',
    phone: faker.string.numeric(9),
    email: `qa.${Date.now()}.${faker.string.alphanumeric(5)}@example.com`.toLowerCase(),
    password: `Qa!${faker.string.alphanumeric(10)}9x`,
    address: {
      street: faker.location.streetAddress(),
      city: 'Lima',
      state: 'Lima',
      country: 'PE',
      postal_code: '15001',
    },
  };
}
