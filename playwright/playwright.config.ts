import { defineConfig, devices } from '@playwright/test';

const WEB = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
const API = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 7_000, toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }], // insumo del agente de triage (S21)
  ],
  use: {
    baseURL: WEB,
    testIdAttribute: 'data-test', // Toolshop usa data-test="..."
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'ui', testDir: './tests/ui', use: { ...devices['Desktop Chrome'] } },
    { name: 'api', testDir: './tests/api', use: { baseURL: API } },
    { name: 'visual', testDir: './tests/visual', use: { ...devices['Desktop Chrome'] } },
    { name: 'visual-mobile', testDir: './tests/visual', use: { ...devices['Pixel 7'] } },
    { name: 'a11y', testDir: './tests/a11y', use: { ...devices['Desktop Chrome'] } },
  ],
});
