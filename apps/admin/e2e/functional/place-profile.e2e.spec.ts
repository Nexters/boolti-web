import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { ConcertHallProfileResponse } from '@boolti/api';

const images = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  imageUrl: `/place-test-photo-${index + 1}.svg`,
  sequence: index,
}));

const profile = {
  id: 1,
  name: '테스트홀',
  hasHomeTabData: true,
  hasRentalTabData: true,
  home: {
    introduction: '공연장 소개입니다. '.repeat(80),
    images: images.slice(0, 5),
    totalImageCount: images.length,
  },
  rental: {
    rentalTime: { rentalTimeHours: 7 },
    rentalFees: [{ id: 1, dayType: 'WEEKDAY', dayTypeName: '평일', fee: 800000, sequence: 0 }],
    additionalFees: [{ id: 2, dayType: 'WEEKEND', dayTypeName: '주말', fee: 100000, sequence: 0 }],
    paidOptions: [{ id: 1, name: '녹음', price: 50000 }],
  },
} satisfies ConcertHallProfileResponse;

const openProfile = async (page: Page) => {
  await page.route('**/place-test-photo-*.svg', (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#4b5773"/></svg>',
    }),
  );
  await page.route('**/web/papi/v1/concert-halls/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/images')) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      await route.fulfill({ json: { items: images } });
    } else if (path.endsWith('/search')) {
      await route.fulfill({
        json: {
          items: [{ concertHallId: 1, name: profile.name, defaultFee: 800000 }],
          currentPage: 0,
          pageSize: 12,
          totalPages: 1,
          totalElements: 1,
          hasNext: false,
        },
      });
    } else if (path.endsWith('/recommended-regions')) {
      await route.fulfill({ json: [] });
    } else {
      await route.fulfill({ json: profile });
    }
  });
  await page.goto('/place');
  await page.getByRole('button', { name: '테스트홀 상세 보기' }).click();
  await expect(
    page.getByRole('heading', { name: profile.name, level: 1, exact: true }),
  ).toBeVisible();
};

test('desktop profile stays 480px wide and rental cards remain distinct', async ({
  page,
}, testInfo) => {
  await openProfile(page);
  const panel = page.locator('aside');
  for (const width of [1120, 1280, 1408, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(async () => (await panel.boundingBox())?.width).toBe(480);
  }
  await page.getByRole('tab', { name: '대관 정보' }).click();
  const panelColor = await panel.evaluate((element) => getComputedStyle(element).backgroundColor);
  for (const name of ['대관료', '시간당 추가 요금', '유료 옵션']) {
    const section = page.getByRole('heading', { name, exact: true }).locator('..');
    await section.scrollIntoViewIfNeeded();
    const cardColor = await section
      .locator(':scope > div')
      .last()
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(cardColor).not.toBe(panelColor);
    expect(cardColor).not.toBe('rgba(0, 0, 0, 0)');
  }
  await page.screenshot({ path: testInfo.outputPath('rental.png') });
});

test('gallery fills its panel, keeps the selected photo and restores profile scroll', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1408, height: 900 });
  await openProfile(page);
  await page.getByRole('button', { name: '사진 3 크게 보기', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: '테스트홀 사진 갤러리' });
  await expect(dialog.getByRole('img', { name: '테스트홀 사진 3', exact: true })).toBeVisible();
  await expect
    .poll(async () => {
      const photo = await dialog
        .getByRole('img', { name: '테스트홀 사진 3', exact: true })
        .boundingBox();
      const bounds = await dialog.boundingBox();
      return Boolean(
        photo && bounds && photo.x >= bounds.x && photo.x + photo.width <= bounds.x + bounds.width,
      );
    })
    .toBe(true);
  await expect(dialog).toHaveJSProperty('clientHeight', 808);
  const box = await dialog.boundingBox();
  expect(box?.width).toBe(480);
  expect(box?.y).toBe(92);
  await expect(dialog.getByRole('button', { name: '닫기', exact: true })).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath('viewer.png') });
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await page.getByRole('button', { name: '사진 19장 더 보기' }).click();
  await page.screenshot({ path: testInfo.outputPath('gallery.png') });
  await expect(dialog.getByRole('button', { name: '사진 24 크게 보기' })).toBeAttached();
  await expect(dialog).toHaveJSProperty('clientHeight', 808);
  const profileScroll = await page
    .getByRole('heading', { name: '사진', level: 2, exact: true })
    .evaluate((element) => {
      let parent = element.parentElement;
      while (parent && parent.scrollHeight <= parent.clientHeight) parent = parent.parentElement;
      return parent?.scrollTop;
    });
  await dialog.getByRole('button', { name: '사진 1 크게 보기', exact: true }).hover();
  await page.mouse.wheel(0, 1200);
  await expect(dialog.getByRole('button', { name: '사진 24 크게 보기' })).toBeInViewport();
  await dialog.getByRole('button', { name: '사진 24 크게 보기' }).click();
  await page.keyboard.press('Escape');
  await expect(dialog.getByRole('button', { name: '사진 24 크게 보기' })).toBeAttached();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  const restoredScroll = await page
    .getByRole('heading', { name: '사진', level: 2, exact: true })
    .evaluate((element) => {
      let parent = element.parentElement;
      while (parent && parent.scrollHeight <= parent.clientHeight) parent = parent.parentElement;
      return parent?.scrollTop;
    });
  expect(restoredScroll).toBe(profileScroll);
  await expect(page.getByRole('tab', { name: '홈', exact: true })).toBeAttached();
});

test('mobile gallery fills the viewport and closes back to its profile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openProfile(page);
  await page.getByRole('button', { name: '사진 19장 더 보기' }).click();
  const dialog = page.getByRole('dialog', { name: '테스트홀 사진 갤러리' });
  await expect(dialog).toHaveJSProperty('clientHeight', 844);
  const box = await dialog.boundingBox();
  expect(box?.width).toBe(390);
  expect(box?.y).toBe(0);
  await dialog.getByRole('button', { name: '뒤로', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('tab', { name: '홈', exact: true })).toBeAttached();
});
