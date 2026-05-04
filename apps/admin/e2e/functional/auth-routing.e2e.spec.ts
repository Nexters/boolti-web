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
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
    await expect(page.getByRole('button', { name: '카카오톡으로 시작하기' })).toBeVisible();
  });
});
