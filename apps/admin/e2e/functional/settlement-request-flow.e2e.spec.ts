import { expect, test } from '@playwright/test';

import { prepareE2EContext } from '../helpers/msw';

test.describe('Settlement request flow', () => {
  test.beforeEach(async ({ page }) => {
    await prepareE2EContext(page);
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'access-token');
      localStorage.setItem('refreshToken', 'refresh-token');
    });
  });

  test('동의 체크 전 비활성, 체크 후 활성화되고 요청이 전송된다', async ({ page }) => {
    await page.goto('/show/1/settlement');
    const submitButton = page.getByRole('button', { name: '정산 요청하기' });
    await expect(submitButton).toBeDisabled();

    await page.getByText('정산 내역 및 안내사항을 모두 확인하였으며 정산을 요청합니다.').click();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(page.getByText('정산을 요청했습니다')).toBeVisible();
  });

  test('요청 실패 시 에러 토스트가 노출된다', async ({ page }) => {
    await page.goto('/show/1/settlement');
    await page.evaluate(() => {
      localStorage.setItem('__E2E_SCENARIO__', 'settlement-request-fail');
    });
    await page.getByText('정산 내역 및 안내사항을 모두 확인하였으며 정산을 요청합니다.').click();
    await page.getByRole('button', { name: '정산 요청하기' }).click();

    await expect(page.getByText('정산 요청에 실패했습니다. 잠시 후에 다시 시도해주세요.')).toBeVisible();
  });
});
