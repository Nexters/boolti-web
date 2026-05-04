import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/functional',
  timeout: 30_000,
  use: {
    baseURL: 'https://127.0.0.1:4173',
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'VITE_BASE_API_URL=https://127.0.0.1:4173/ yarn workspace admin dev --host 127.0.0.1 --port 4173',
    url: 'https://127.0.0.1:4173',
    ignoreHTTPSErrors: true,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});
