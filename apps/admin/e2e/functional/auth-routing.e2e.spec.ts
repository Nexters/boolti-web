import { expect, test } from '@playwright/test';

import { prepareE2EContext } from '../helpers/msw';

test.describe('Auth routing guard', () => {
  test.beforeEach(async ({ page }) => {
    await prepareE2EContext(page);
  });

  test('비로그인 + 일반 브라우저는 /home 접근 시 /login으로 이동한다', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    });

    await page.goto('/home');
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText('로그인')).toBeVisible();
  });

  test('로그인 상태는 /home 접근이 허용된다', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'access-token');
      localStorage.setItem('refreshToken', 'refresh-token');
    });

    await page.goto('/home');
    await expect(page).toHaveURL(/\/home$/);
    await expect(page.getByText('로그인')).toHaveCount(0);
  });

  test('비로그인이라도 webview userAgent면 /home 접근이 허용된다', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Object.defineProperty(window.navigator, 'userAgent', {
        configurable: true,
        value: 'Mozilla/5.0 BOOLTI/ANDROID',
      });
    });

    await page.goto('/home');
    await expect(page).toHaveURL(/\/home$/);
  });
});
