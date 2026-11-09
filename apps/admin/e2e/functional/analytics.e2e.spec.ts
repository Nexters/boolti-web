import { expect, test } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { Buffer } from 'node:buffer';

declare global {
  interface Window {
    __analyticsHarness: (typeof import('../../../../packages/analytics/src/runtime'))['analytics'];
    __replyClientInfo?: () => void;
  }
}

const clientPath = fileURLToPath(
  new URL('../../../../packages/analytics/src/runtime.ts', import.meta.url),
);
type Event = { event: string; properties: Record<string, unknown> };

const installHarness = async (
  context: BrowserContext,
  local = false,
  profiles: Record<string, unknown>[] = [],
  debug = false,
) => {
  const events: Event[] = [];
  // Exercise the real SDK and browser cookies; all collector traffic stays in this test.
  await context.route(/https:\/\/[^/]*(?:mixpanel|mxpnl)\.com\//, async (route) => {
    const request = route.request();
    const pathname = new URL(request.url()).pathname;
    if (pathname.startsWith('/track') || pathname.startsWith('/engage')) {
      const raw = request.postData() ?? new URL(request.url()).search.slice(1);
      const data = new URLSearchParams(raw).get('data') ?? raw;
      try {
        const parsed = JSON.parse(
          data.startsWith('[') || data.startsWith('{')
            ? data
            : Buffer.from(data, 'base64').toString(),
        );
        if (pathname.startsWith('/track'))
          events.push(...(Array.isArray(parsed) ? parsed : [parsed]));
        else profiles.push(...(Array.isArray(parsed) ? parsed : [parsed]));
      } catch {
        // Other SDK requests are not tracking payloads.
      }
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: '1' });
  });
  await context.route(/^http:\/\/(?:[a-z]+\.)?dev\.boolti\.in:4173\//, async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/__analytics_test') {
      await route.fulfill({
        contentType: 'text/html; charset=utf-8',
        body: `<!doctype html><html><head></head><body><button id="action">로그인 이벤트 테스트</button><script type="module">
        import { analytics } from '/@fs${clientPath}';
        import { initAnalytics, trackClick, trackViewScreen, identifyUser, resetUser } from '/@fs${clientPath.replace('runtime.ts', 'tracker.ts')}';
        initAnalytics({ VITE_MIXPANEL_DEV_TOKEN: 'browser-test-dev', VITE_MIXPANEL_PROD_TOKEN: 'browser-test-prod', VITE_MIXPANEL_MODE: '${local ? 'local' : ''}', VITE_MIXPANEL_DEBUG: '${debug}' });
        window.__analyticsHarness = {
          ...analytics,
          identify: (id, userCode) => identifyUser({ id, userCode }),
          logout: resetUser,
          track: (event, props) => event === 'View Screen'
            ? trackViewScreen(props.screen, props)
            : trackClick(props.screen, props.object_role, props.object_value, props)
        };
        document.querySelector('#action').addEventListener('click', () => analytics.track('Click', {
          screen: 'Login', object_role: 'Button', object_value: 'Login', login_method: 'Kakao'
        }));
      </script></body></html>`,
      });
      return;
    }
    const response = await route.fetch({
      url: `http://127.0.0.1:4173${url.pathname}${url.search}`,
    });
    await route.fulfill({ response });
  });
  return events;
};

const open = async (page: Page, host: string) => {
  await page.goto(`http://${host}:4173/__analytics_test`);
  await page.waitForFunction(() => Boolean(window.__analyticsHarness));
};

const deviceId = (page: Page) =>
  page.evaluate(() => {
    for (const cookie of document.cookie.split('; ')) {
      try {
        const value = JSON.parse(decodeURIComponent(cookie.slice(cookie.indexOf('=') + 1)));
        if (value.$device_id) return value.$device_id as string;
      } catch {
        /* Not an SDK cookie. */
      }
    }
    return undefined;
  });

test('shows and persists local click logs without any Mixpanel requests', async ({
  context,
  page,
}) => {
  const requests: string[] = [];
  context.on('request', (request) => {
    if (/https:\/\/[^/]*(?:mixpanel|mxpnl)\.com\//.test(request.url()))
      requests.push(request.url());
  });
  await installHarness(context, true, [], true);
  await open(page, 'dev.boolti.in');
  await page.getByRole('button', { name: '로그인 이벤트 테스트' }).click();
  await page.locator('#boolti-analytics-local summary').click();
  await expect(page.getByRole('status')).toContainText('저장 확인됨');
  await expect(page.locator('#boolti-analytics-local li').filter({ hasText: 'Kakao' })).toHaveCount(
    1,
  );
  await page.reload();
  await page.locator('#boolti-analytics-local summary').click();
  await expect(page.locator('#boolti-analytics-local li').filter({ hasText: 'Kakao' })).toHaveCount(
    1,
  );
  await page.getByRole('textbox', { name: '이벤트 검색' }).fill('Kakao');
  await expect(page.locator('#boolti-analytics-local li')).toHaveCount(1);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'JSON 다운로드' }).click();
  expect((await download).suggestedFilename()).toBe('boolti-local-events.json');
  await page.getByRole('button', { name: '기록 지우기' }).click();
  await expect(page.locator('#boolti-analytics-local summary')).toContainText('0건');
  expect(await page.evaluate(() => localStorage.getItem('boolti_analytics_local_logs'))).toBe('[]');
  expect(requests).toEqual([]);
});

test('shows live debug logs while the SDK sends events, without duplicate requests', async ({
  context,
  page,
}) => {
  const events = await installHarness(context, false, [], true);
  await open(page, 'dev.boolti.in');
  await page.getByRole('button', { name: '로그인 이벤트 테스트' }).click();
  await page.locator('#boolti-analytics-local summary').click();
  await expect(page.locator('#boolti-analytics-local .intro')).toContainText('Mixpanel 전송 모드');
  await expect(page.locator('#boolti-analytics-local li').filter({ hasText: 'Kakao' })).toHaveCount(
    1,
  );
  await expect
    .poll(() => events.filter((event) => event.event === 'Click').length, { timeout: 15000 })
    .toBe(1);
  const recorded = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('boolti_analytics_debug_logs')!).find(
      (entry: { name: string }) => entry.name === 'Click',
    ),
  );
  expect(events.find((event) => event.event === 'Click')!.properties).toMatchObject(
    recorded.properties,
  );
  expect(await page.evaluate(() => localStorage.getItem('boolti_analytics_local_logs'))).toBeNull();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'JSON 다운로드' }).click();
  expect((await download).suggestedFilename()).toBe('boolti-debug-events.json');
  await page.reload();
  await page.locator('#boolti-analytics-local summary').click();
  await expect(page.locator('#boolti-analytics-local li').filter({ hasText: 'Kakao' })).toHaveCount(
    1,
  );
});

test('shares anonymous identity, identifies the visitor, and propagates logout across sibling hosts', async ({
  context,
  page,
}) => {
  const profiles: Record<string, unknown>[] = [];
  const events = await installHarness(context, false, profiles);
  await open(page, 'dev.boolti.in');
  const firstDevice = await deviceId(page);
  expect(firstDevice).toBeTruthy();
  const sibling = await context.newPage();
  await open(sibling, 'place.dev.boolti.in');
  expect(await deviceId(sibling)).toBe(firstDevice);
  await page.evaluate(() => window.__analyticsHarness.identify('42', 'viewer'));
  await expect.poll(() => profiles.length, { timeout: 15000 }).toBeGreaterThan(0);
  await sibling.evaluate(() =>
    window.__analyticsHarness.track('View Screen', { screen: 'Profile' }),
  );
  await page.evaluate(() => window.__analyticsHarness.logout());
  await sibling.evaluate(() =>
    window.__analyticsHarness.track('View Screen', { screen: 'PlaceProfile' }),
  );
  await page.evaluate(() => window.__analyticsHarness.track('View Screen', { screen: 'Login' }));
  await expect
    .poll(() => events.filter((event) => event.event === 'View Screen').length, { timeout: 15000 })
    .toBe(3);
  const views = events.filter((event) => event.event === 'View Screen');
  expect(views.find((event) => event.properties.screen === 'Profile')?.properties.$user_id).toBe(
    '42',
  );
  const afterLogout = views.filter((event) => event.properties.screen !== 'Profile');
  expect(
    afterLogout.every(
      (event) => event.properties.is_logged_in === false && !event.properties.$user_id,
    ),
  ).toBe(true);
  expect(afterLogout[0].properties.distinct_id).toBe(afterLogout[1].properties.distinct_id);
  expect(events.filter((event) => event.event === 'First Open')).toHaveLength(1);
  await expect.poll(() => profiles.length, { timeout: 15000 }).toBeGreaterThan(0);
  expect(
    profiles.every(
      (profile) =>
        JSON.stringify(profile.$set_once) === JSON.stringify({ user_id: '42' }) && !profile.$set,
    ),
  ).toBe(true);
  expect(
    events
      .filter((event) => event.event !== '$identify')
      .every((event) => event.properties.token === 'browser-test-dev'),
  ).toBe(true);
});

for (const [os, platform] of [
  ['IOS', 'iOS'],
  ['ANDROID', 'Android'],
]) {
  test(`collects ${platform} WebView interactions without app First Open`, async ({ browser }) => {
    const context = await browser.newContext({ userAgent: `Mozilla/5.0 BOOLTI/${os}` });
    await context.addInitScript((platform) => {
      const postMessage = (raw: string) => {
        const command = JSON.parse(raw);
        if (command.command !== 'REQUEST_CLIENT_INFO') throw new Error('Unexpected native command');
        window.__replyClientInfo = () =>
          window.__boolti__webview__bridge__.postMessage({
            ...command,
            timestamp: 1761177600000,
            data: {
              platform,
              osVersion: '14',
              appVersion: '1.15.0',
              deviceModel: 'native-model',
              screenResolution: '1080x2340',
              isLoggedIn: true,
              userId: '42',
            },
          });
      };
      if (platform === 'iOS') window.webkit = { messageHandlers: { boolti: { postMessage } } };
      else window.boolti = { postMessage };
    }, platform);
    const profiles: Record<string, unknown>[] = [];
    const events = await installHarness(context, false, profiles);
    const page = await context.newPage();
    await open(page, 'dev.boolti.in');
    expect(await page.evaluate(() => window.__analyticsHarness.isEnabled())).toBe(true);
    await page.getByRole('button', { name: '로그인 이벤트 테스트' }).click();
    await page.waitForFunction(() => Boolean(window.__replyClientInfo));
    expect(await page.evaluate(() => window.__analyticsHarness.isReady())).toBe(false);
    expect(await deviceId(page)).toBeUndefined();
    expect(events).toEqual([]);
    await page.evaluate(() => window.__replyClientInfo!());
    await expect
      .poll(() => events.filter((event) => event.event === 'Click').length, { timeout: 15000 })
      .toBe(1);
    expect(events.find((event) => event.event === 'Click')?.properties.platform).toBe(platform);
    expect(events.find((event) => event.event === 'Click')?.properties).toMatchObject({
      os_version: '14',
      app_version: '1.15.0',
      device_model: 'native-model',
      screen_resolution: '1080x2340',
      is_logged_in: true,
      user_id: '42',
    });
    expect(events.filter((event) => event.event === 'First Open')).toHaveLength(0);
    expect(events.find((event) => event.event === 'Click')?.properties.$user_id).toBe('42');
    await expect.poll(() => profiles.length, { timeout: 15000 }).toBeGreaterThan(0);
    expect(
      profiles.every(
        (profile) =>
          JSON.stringify(profile.$set_once) === JSON.stringify({ user_id: '42' }) && !profile.$set,
      ),
    ).toBe(true);
    await context.close();
  });
}

test('classifies a mobile browser as Web_mobile without adding undefined properties', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
  });
  const events = await installHarness(context);
  const page = await context.newPage();
  await open(page, 'dev.boolti.in');
  await page.evaluate(() =>
    window.__analyticsHarness.track('Click', {
      screen: 'Login',
      object_role: 'Button',
      object_value: 'Login',
      login_method: 'Kakao',
    }),
  );
  await expect
    .poll(() => events.filter((event) => event.event === 'Click').length, { timeout: 15000 })
    .toBe(1);
  const properties = events.find((event) => event.event === 'Click')!.properties;
  expect(properties.platform).toBe('Web_mobile');
  expect(properties).not.toHaveProperty('app_version');
  expect(properties).not.toHaveProperty('device_model');
  expect(properties).not.toHaveProperty('$current_url');
  await context.close();
});
