import type { Page } from '@playwright/test';

export const prepareE2EContext = async (page: Page, scenario: string = 'default') => {
  await page.addInitScript((currentScenario) => {
    (window as Window & { __ENABLE_E2E_MSW__?: boolean }).__ENABLE_E2E_MSW__ = true;
    localStorage.setItem('__E2E_SCENARIO__', currentScenario);
  }, scenario);

  await page.goto('/');
  await page.waitForFunction(() => window.__E2E_MSW_READY__ === true, null, { timeout: 5000 });
  await page.reload();
};
