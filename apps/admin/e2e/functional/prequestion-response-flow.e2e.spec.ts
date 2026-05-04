import { expect, test } from '@playwright/test';

import { prepareE2EContext } from '../helpers/msw';

test.describe('Pre-question response flow', () => {
  test.beforeEach(async ({ page }) => {
    await prepareE2EContext(page);
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'access-token');
      localStorage.setItem('refreshToken', 'refresh-token');
    });
  });

  test('응답 확인 탭에서 참여자별 응답/검색 플로우가 동작한다', async ({ page }) => {
    await page.goto('/show/1/pre-question');
    await expect(page.getByText('응답 확인')).toBeVisible();

    await page.getByText('응답 확인').click();
    await page.getByRole('button', { name: '참여자별 응답' }).click();

    await expect(page.getByText('홍길동', { exact: true })).toBeVisible();
    await page.getByPlaceholder('참여자명 검색').fill('홍길동');
    await page.waitForTimeout(400);
    await expect(page.getByText('홍길동', { exact: true })).toBeVisible();
  });

  test('검색 결과가 없으면 빈 상태 메시지가 노출된다', async ({ page }) => {
    await page.goto('/show/1/pre-question');
    await page.getByText('응답 확인').click();
    await page.getByRole('button', { name: '참여자별 응답' }).click();

    await page.getByPlaceholder('참여자명 검색').fill('없는이름');
    await page.waitForTimeout(400);

    await expect(page.getByText('검색 결과가 없어요.')).toBeVisible();
  });
});
