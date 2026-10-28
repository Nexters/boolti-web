import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { sdk, bridge } = vi.hoisted(() => ({
  sdk: {
    init: vi.fn(),
    track: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
    get_property: vi.fn(),
    people: { set: vi.fn(), set_once: vi.fn() },
  },
  bridge: {
    checkIsWebView: vi.fn(() => false),
    isWebViewBridgeAvailable: vi.fn(() => false),
    requestClientInfo: vi.fn(),
  },
}));
vi.mock('mixpanel-browser', () => ({ default: sdk }));
vi.mock('@boolti/bridge', () => bridge);

const env = {
  VITE_MIXPANEL_DEV_TOKEN: 'test-dev',
  VITE_MIXPANEL_PROD_TOKEN: 'test-prod',
  VITE_MIXPANEL_DEBUG: 'true',
};
const info = {
  platform: 'Android',
  osVersion: '14',
  appVersion: '1.15.0',
  deviceModel: 'SM-S918N',
  screenResolution: '1080x2340',
  isLoggedIn: false,
  userId: null,
};
const load = () => import('../src/runtime');
const logs = () => JSON.parse(localStorage.getItem('boolti_analytics_local_logs') ?? '[]');
const debugLogs = () => JSON.parse(localStorage.getItem('boolti_analytics_debug_logs') ?? '[]');
const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=dev.boolti.in`;
    document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
};

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.unstubAllGlobals();
  clearCookies();
  localStorage.clear();
  document.body.replaceChildren();
  bridge.checkIsWebView.mockReturnValue(false);
  bridge.isWebViewBridgeAvailable.mockReturnValue(false);
  bridge.requestClientInfo.mockResolvedValue({ data: info });
  let userId: string | undefined;
  sdk.identify.mockImplementation((id) => {
    userId = id;
  });
  sdk.reset.mockImplementation(() => {
    userId = undefined;
  });
  sdk.get_property.mockImplementation((key) => (key === '$user_id' ? userId : undefined));
  history.replaceState(null, '', '/');
});
afterEach(() => vi.restoreAllMocks());

const trackMap = (analytics: Awaited<ReturnType<typeof load>>['analytics']) =>
  analytics.track('Click', { screen: 'ShowDetail', object_role: 'Item', object_value: 'Map' });

describe('develop tracking API compatibility', () => {
  it('accepts the existing single token and initializes the collector only once', async () => {
    const { initAnalytics, trackViewScreen } = await import('../src/tracker');
    initAnalytics('legacy-token');
    initAnalytics('another-token');
    trackViewScreen('PlaceSearch', { source: 'Direct' });
    expect(sdk.init).toHaveBeenCalledTimes(1);
    expect(sdk.init).toHaveBeenCalledWith(
      'legacy-token',
      expect.objectContaining({
        api_host: 'https://api-js.mixpanel.com',
      }),
    );
    expect(sdk.init.mock.calls[0][1]).not.toHaveProperty('persistence_name');
    expect(sdk.track.mock.calls.filter(([name]) => name === 'View Screen')).toHaveLength(1);
  });

  it('preserves the existing First Open cookie without recording a second first visit', async () => {
    document.cookie = 'boolti_analytics_first_open=true; Path=/';
    const { initAnalytics } = await import('../src/tracker');
    initAnalytics('legacy-token');
    expect(sdk.track).not.toHaveBeenCalled();
  });

  it('queues navigation clicks through the public API and keeps their immediate transport', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    let respond!: (value: unknown) => void;
    bridge.requestClientInfo.mockReturnValue(
      new Promise((resolve) => {
        respond = resolve;
      }),
    );
    const { initAnalytics, trackClick } = await import('../src/tracker');
    initAnalytics(env);
    trackClick('Profile', 'Item', 17, { item_rank: 2 }, { beforeNavigation: true });
    await vi.waitFor(() => expect(bridge.requestClientInfo).toHaveBeenCalledOnce());
    expect(sdk.init).not.toHaveBeenCalled();
    respond({ data: { ...info, isLoggedIn: true, userId: 'native-user' } });
    await vi.waitFor(() => expect(sdk.track).toHaveBeenCalledOnce());
    expect(sdk.track).toHaveBeenCalledWith(
      'Click',
      expect.objectContaining({
        screen: 'Profile',
        object_role: 'Item',
        object_value: '17',
        item_rank: 2,
        user_id: 'native-user',
        platform: 'Android',
      }),
      { transport: 'sendBeacon', send_immediately: true },
    );
  });

  it('identifies from the browser API using only user_id and clears it on resetUser', async () => {
    const { initAnalytics, identifyUser, resetUser, trackSearch } = await import('../src/tracker');
    initAnalytics(env, { isLoggedIn: true });
    identifyUser({ id: 42, userCode: 'viewer' });
    expect(sdk.people.set_once).toHaveBeenCalledWith({ user_id: '42' });
    expect(sdk.people.set).not.toHaveBeenCalled();
    resetUser();
    trackSearch('PlaceSearch', '홍대', { search_source: 'Direct', result_count: 0 });
    const lastEvent = sdk.track.mock.calls.at(-1)!;
    expect(lastEvent[1]).toMatchObject({ is_logged_in: false, search_keyword: '홍대' });
    expect(lastEvent[1]).not.toHaveProperty('user_id');
  });
});

describe('collection configuration', () => {
  it('sends once through the SDK and mirrors events and identity into the debug panel', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    analytics.identify('42');
    trackMap(analytics);
    const sdkClicks = sdk.track.mock.calls.filter(([event]) => event === 'Click');
    expect(sdkClicks).toHaveLength(1);
    const recorded = debugLogs().find((entry: { name: string }) => entry.name === 'Click');
    expect(recorded).toMatchObject({
      operation: 'event',
      userId: '42',
      properties: sdkClicks[0][1],
    });
    expect(sdk.identify).toHaveBeenCalledOnce();
    expect(sdk.people.set_once).toHaveBeenCalledOnce();
    expect(debugLogs()).toContainEqual(
      expect.objectContaining({
        operation: 'user',
        properties: { user_id: '42' },
      }),
    );
    const root = document.querySelector('#boolti-analytics-local')!.shadowRoot!;
    expect(root.querySelector('.intro')!.textContent).toContain('Mixpanel 전송 모드');
    expect(root.querySelector('.intro')!.textContent).not.toContain('전송 없음');
    expect(logs()).toEqual([]);
    analytics.logout();
    trackMap(analytics);
    expect(debugLogs().at(-1)).not.toHaveProperty('userId');
    expect(debugLogs().at(-1).properties).toMatchObject({ is_logged_in: false });
  });

  it('keeps normal SDK tracking without a panel when debug is false', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics({ ...env, VITE_MIXPANEL_DEBUG: 'false' });
    trackMap(analytics);
    expect(sdk.track).toHaveBeenCalled();
    expect(document.querySelector('#boolti-analytics-local')).toBeNull();
    expect(debugLogs()).toEqual([]);
  });

  it('continues SDK tracking when debug storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    trackMap(analytics);
    expect(sdk.track.mock.calls.filter(([event]) => event === 'Click')).toHaveLength(1);
    expect(
      document
        .querySelector('#boolti-analytics-local')!
        .shadowRoot!.querySelector('[role="status"]')!.textContent,
    ).toContain('저장 실패');
  });

  it('records local events and only user_id profile properties without using the SDK', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics({ ...env, VITE_MIXPANEL_MODE: 'local' });
    analytics.identify('42', 'viewer');
    trackMap(analytics);
    expect(logs()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'First Open', operation: 'event' }),
        expect.objectContaining({ name: 'set_once', properties: { user_id: '42' } }),
        expect.objectContaining({
          name: 'Click',
          userId: '42',
          properties: expect.objectContaining({
            user_id: '42',
            is_logged_in: true,
            platform: 'Web_desktop',
          }),
        }),
      ]),
    );
    for (const fn of [
      sdk.init,
      sdk.track,
      sdk.identify,
      sdk.reset,
      sdk.get_property,
      sdk.people.set,
      sdk.people.set_once,
    ])
      expect(fn).not.toHaveBeenCalled();
    expect(debugLogs()).toEqual([]);
  });

  it('records locally without a project token', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics({ VITE_MIXPANEL_MODE: 'local' });
    expect(analytics.isReady()).toBe(true);
    expect(logs()).toHaveLength(1);
    expect(sdk.init).not.toHaveBeenCalled();
  });

  it('routes only exact HTTPS production origins to prod', async () => {
    const { getAnalyticsConfig } = await load();
    for (const host of ['boolti.in', 'place.boolti.in', 'preview.boolti.in', 'profile.boolti.in'])
      expect(getAnalyticsConfig(`https://${host}`, env)).toMatchObject({
        token: 'test-prod',
        debug: true,
        cookieDomain: 'boolti.in',
      });
    for (const origin of [
      'http://localhost:8080',
      'http://boolti.in:8080',
      'https://preview.dev.boolti.in',
      'https://boolti.in.evil.test',
    ])
      expect(getAnalyticsConfig(origin, env).token).toBe('test-dev');
    expect(
      getAnalyticsConfig('https://boolti.in', { VITE_MIXPANEL_DEV_TOKEN: 'test-dev' }).token,
    ).toBeUndefined();
    expect(
      getAnalyticsConfig('https://boolti.in', { ...env, VITE_MIXPANEL_DEBUG: 'false' }).debug,
    ).toBe(false);
  });

  it('does not initialize or request client info without a selected token', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics({});
    trackMap(analytics);
    expect(sdk.init).not.toHaveBeenCalled();
    expect(bridge.requestClientInfo).not.toHaveBeenCalled();
  });

  it('uses US, disables automatic tracking and preserves browser First Open across logout/reload', async () => {
    let client = await load();
    client.initializeAnalytics(env);
    expect(sdk.init).toHaveBeenCalledWith(
      'test-dev',
      expect.objectContaining({
        api_host: 'https://api-js.mixpanel.com',
        autocapture: false,
        track_pageview: false,
        record_sessions_percent: 0,
      }),
    );
    client.analytics.logout();
    vi.resetModules();
    client = await load();
    client.initializeAnalytics(env);
    expect(sdk.track.mock.calls.filter(([event]) => event === 'First Open')).toHaveLength(1);
    expect(bridge.requestClientInfo).not.toHaveBeenCalled();
  });
});

describe('native client context', () => {
  it('identifies the native user and sets only user_id before sending the first queued event', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    bridge.requestClientInfo.mockResolvedValue({
      id: 'correlation-not-user-id',
      data: { ...info, isLoggedIn: true, userId: '42', $name: 'not-allowed', email: 'not-allowed' },
    });
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    analytics.track('View Screen', { screen: 'PlaceSearch' });
    expect(sdk.init).not.toHaveBeenCalled();
    expect(sdk.identify).not.toHaveBeenCalled();
    await vi.waitFor(() => expect(analytics.isReady()).toBe(true));
    expect(sdk.identify).toHaveBeenCalledTimes(1);
    expect(sdk.identify).toHaveBeenCalledWith('42');
    expect(sdk.people.set_once).toHaveBeenCalledWith({ user_id: '42' });
    expect(sdk.people.set).not.toHaveBeenCalled();
    expect(sdk.identify.mock.invocationCallOrder[0]).toBeLessThan(
      sdk.track.mock.invocationCallOrder[0],
    );
    expect(sdk.people.set_once.mock.invocationCallOrder[0]).toBeLessThan(
      sdk.track.mock.invocationCallOrder[0],
    );
    expect(sdk.track.mock.lastCall?.[1]).toMatchObject({
      user_id: '42',
      is_logged_in: true,
      platform: 'Android',
    });
    expect(JSON.stringify(sdk.track.mock.calls)).not.toMatch(/correlation-not-user-id|not-allowed/);
    expect(document.cookie).not.toContain('_member=');
  });

  it('resets the SDK before switching native accounts on a new webview document', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    bridge.requestClientInfo.mockResolvedValue({
      data: { ...info, isLoggedIn: true, userId: '42' },
    });
    let client = await load();
    client.initializeAnalytics(env);
    await vi.waitFor(() => expect(client.analytics.isReady()).toBe(true));
    vi.resetModules();
    bridge.requestClientInfo.mockResolvedValue({
      data: { ...info, isLoggedIn: true, userId: '43' },
    });
    client = await load();
    client.initializeAnalytics(env);
    trackMap(client.analytics);
    await vi.waitFor(() => expect(client.analytics.isReady()).toBe(true));
    expect(sdk.reset).toHaveBeenCalledTimes(1);
    expect(sdk.identify).toHaveBeenLastCalledWith('43');
    expect(sdk.track.mock.lastCall?.[1]).toMatchObject({ user_id: '43', is_logged_in: true });
  });

  it('records local native identity and queued events with the same confirmed user_id', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    bridge.requestClientInfo.mockResolvedValue({
      data: { ...info, isLoggedIn: true, userId: '42' },
    });
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics({ VITE_MIXPANEL_MODE: 'local' });
    trackMap(analytics);
    expect(logs()).toHaveLength(0);
    await vi.waitFor(() => expect(analytics.isReady()).toBe(true));
    expect(logs().map((entry: { name: string }) => entry.name)).toEqual([
      'identify',
      'set_once',
      'Click',
    ]);
    expect(logs()[1]).toMatchObject({ userId: '42', properties: { user_id: '42' } });
    expect(logs()[2]).toMatchObject({
      userId: '42',
      properties: { user_id: '42', is_logged_in: true },
    });
    expect(sdk.init).not.toHaveBeenCalled();
  });

  it('buffers the first view and clicks before the response without initializing the SDK', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    let resolve!: (value: { data: typeof info }) => void;
    bridge.requestClientInfo.mockReturnValue(
      new Promise((done) => {
        resolve = done;
      }),
    );
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    initializeAnalytics(env);
    analytics.track('View Screen', { screen: 'PlaceSearch' });
    const firstTime = Date.now() / 1000;
    trackMap(analytics);
    analytics.identify('untrusted-web-user');
    expect(analytics.isEnabled()).toBe(true);
    expect(analytics.isReady()).toBe(false);
    for (const fn of [sdk.init, sdk.track, sdk.identify, sdk.people.set, sdk.people.set_once])
      expect(fn).not.toHaveBeenCalled();
    await Promise.resolve();
    expect(bridge.requestClientInfo).toHaveBeenCalledTimes(1);
    resolve({ data: info });
    await vi.waitFor(() => expect(analytics.isReady()).toBe(true));
    expect(sdk.track.mock.calls.map(([event]) => event)).toEqual(['View Screen', 'Click']);
    expect(sdk.track.mock.calls[0][1].time).toBeLessThanOrEqual(firstTime);
    for (const [, properties] of sdk.track.mock.calls)
      expect(properties).toMatchObject({
        platform: 'Android',
        os_version: '14',
        app_version: '1.15.0',
        device_model: 'SM-S918N',
        screen_resolution: '1080x2340',
        is_logged_in: false,
      });
    expect(sdk.track.mock.calls[0][1]).not.toHaveProperty('user_id');
    expect(document.cookie).not.toContain('first_open');
  });

  it.each(['iOS', 'Android'])(
    'uses native %s metadata even without a Boolti UA marker',
    async (platform) => {
      bridge.isWebViewBridgeAvailable.mockReturnValue(true);
      bridge.requestClientInfo.mockResolvedValue({ data: { ...info, platform } });
      const { analytics, initializeAnalytics } = await load();
      initializeAnalytics(env);
      trackMap(analytics);
      await vi.waitFor(() => expect(sdk.track).toHaveBeenCalledTimes(1));
      expect(sdk.track).toHaveBeenCalledWith(
        'Click',
        expect.objectContaining({ platform, screen_resolution: '1080x2340' }),
        undefined,
      );
    },
  );

  it('keeps local native events behind the same gate and makes no SDK calls', async () => {
    bridge.checkIsWebView.mockReturnValue(true);
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics({ VITE_MIXPANEL_MODE: 'local' });
    trackMap(analytics);
    expect(logs()).toEqual([]);
    await vi.waitFor(() => expect(logs()).toHaveLength(1));
    expect(logs()[0]).toMatchObject({
      name: 'Click',
      properties: { platform: 'Android', screen_resolution: '1080x2340' },
    });
    expect(sdk.init).not.toHaveBeenCalled();
    expect(sdk.track).not.toHaveBeenCalled();
  });

  it.each(['timeout', 'invalid metadata', 'missing logged-in user ID'])(
    'does not send incomplete events on %s',
    async (reason) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      bridge.checkIsWebView.mockReturnValue(true);
      if (reason === 'timeout') bridge.requestClientInfo.mockRejectedValue(new Error('timeout'));
      else
        bridge.requestClientInfo.mockResolvedValue({
          data: {
            ...info,
            ...(reason === 'invalid metadata' ? { platform: 'Web_mobile' } : { isLoggedIn: true }),
          },
        });
      const { analytics, initializeAnalytics } = await load();
      initializeAnalytics(env);
      trackMap(analytics);
      await vi.waitFor(() => expect(analytics.isEnabled()).toBe(false));
      trackMap(analytics);
      expect(sdk.init).not.toHaveBeenCalled();
      expect(sdk.track).not.toHaveBeenCalled();
    },
  );

  it('does not reuse a browser identity or profile properties in an anonymous webview', async () => {
    document.cookie = `boolti_analytics_dev_member=${encodeURIComponent(JSON.stringify({ id: '99', userCode: 'stale', loggedIn: true }))}; Domain=dev.boolti.in; Path=/`;
    bridge.checkIsWebView.mockReturnValue(true);
    sdk.get_property.mockReturnValue('99');
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    trackMap(analytics);
    await vi.waitFor(() => expect(analytics.isReady()).toBe(true));
    expect(sdk.reset).toHaveBeenCalled();
    expect(sdk.identify).not.toHaveBeenCalled();
    expect(sdk.people.set_once).not.toHaveBeenCalled();
    expect(sdk.track.mock.lastCall?.[1]).not.toHaveProperty('user_id');
    expect(analytics.currentUserCode()).toBeUndefined();
  });
});

describe('browser identity', () => {
  it('sends only user_id to the profile, without names, email, signup, organizer or UTM', async () => {
    history.replaceState(null, '', '/?utm_source=instagram&utm_campaign=launch');
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    analytics.identify('42', 'visitor-code');
    expect(sdk.people.set).not.toHaveBeenCalled();
    expect(sdk.people.set_once).toHaveBeenCalledTimes(1);
    expect(sdk.people.set_once).toHaveBeenCalledWith({ user_id: '42' });
    expect(analytics.currentUserCode()).toBe('visitor-code');
    trackMap(analytics);
    expect(sdk.track.mock.lastCall?.[1]).toMatchObject({ user_id: '42', is_logged_in: true });
    expect(
      JSON.stringify([...sdk.people.set_once.mock.calls, ...sdk.track.mock.calls]),
    ).not.toMatch(/\$name|\$email|sign_up_date|is_organizer|initial_utm/);
  });

  it('filters SDK-generated and restored profile payloads before network transport', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    analytics.identify('42');
    const hook = sdk.init.mock.calls[0][1].hooks.before_send_people;
    expect(
      hook({
        $token: 'test-dev',
        $distinct_id: '42',
        $set: { user_id: '42', $name: 'old-name', $email: 'old-email' },
        $add: { total_purchase_count: 1 },
      }),
    ).toEqual({ $token: 'test-dev', $distinct_id: '42', $set_once: { user_id: '42' } });
    expect(hook({ $set_once: { $initial_referrer: 'old-referrer' } })).toBeNull();
    expect(hook({ $set_once: { initial_utm_source: 'old-source' } })).toBeNull();
    expect(
      hook({ $distinct_id: 'previous-user', $set_once: { user_id: 'previous-user' } }),
    ).toBeNull();
    expect(sdk.init.mock.calls[0][1].ip).toBe(false);
  });

  it('resets after logout and observes shared-cookie logout without leaking user_id', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    analytics.identify('42');
    document.cookie = `boolti_analytics_dev_member=${encodeURIComponent(JSON.stringify({ id: null, loggedIn: false }))}; Domain=dev.boolti.in; Path=/`;
    trackMap(analytics);
    expect(sdk.reset).toHaveBeenCalledTimes(1);
    expect(sdk.track.mock.lastCall?.[1]).toMatchObject({ is_logged_in: false });
    expect(sdk.track.mock.lastCall?.[1]).not.toHaveProperty('user_id');
    analytics.identify('43');
    analytics.logout();
    trackMap(analytics);
    expect(sdk.reset).toHaveBeenCalledTimes(2);
    expect(sdk.track.mock.lastCall?.[1]).not.toHaveProperty('user_id');
  });

  it('keeps iPhone and Android browsers classified as Web_mobile without fake app metadata', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    for (const userAgent of ['Mozilla/5.0 iPhone Safari', 'Mozilla/5.0 Android Chrome']) {
      vi.stubGlobal('navigator', { userAgent });
      trackMap(analytics);
      expect(sdk.track.mock.lastCall?.[1]).toMatchObject({ platform: 'Web_mobile' });
      for (const key of ['os_version', 'app_version', 'device_model'])
        expect(sdk.track.mock.lastCall?.[1]).not.toHaveProperty(key);
    }
  });

  it('does not break business operations when tracking throws', async () => {
    const { analytics, initializeAnalytics } = await load();
    initializeAnalytics(env);
    sdk.track.mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => trackMap(analytics)).not.toThrow();
  });
});
