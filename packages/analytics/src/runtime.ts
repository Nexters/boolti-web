import { checkIsWebView, isWebViewBridgeAvailable, requestClientInfo } from '@boolti/bridge';
import type { ClientInfo } from '@boolti/bridge';
import mixpanel from 'mixpanel-browser';
import type { Config } from 'mixpanel-browser';

import { parseClientInfo } from './clientInfo';
import { createLocalCollector } from './local';
import type { AnalyticsEventName, Properties } from './constants';
import { getCommonProperties } from './superProperties';

export interface AnalyticsEnv {
  VITE_MIXPANEL_TOKEN?: string;
  VITE_MIXPANEL_DEV_TOKEN?: string;
  VITE_MIXPANEL_PROD_TOKEN?: string;
  VITE_MIXPANEL_DEBUG?: string;
  VITE_MIXPANEL_MODE?: string;
}

const PRODUCTION_ORIGINS = [
  'https://boolti.in',
  'https://place.boolti.in',
  'https://preview.boolti.in',
  'https://profile.boolti.in',
];

export const getAnalyticsConfig = (origin: string, env: AnalyticsEnv) => {
  const local = env.VITE_MIXPANEL_MODE === 'local';
  const hostname = new URL(origin).hostname;
  const production = PRODUCTION_ORIGINS.includes(origin);
  const cookieDomain = production
    ? 'boolti.in'
    : hostname === 'dev.boolti.in' || hostname.endsWith('.dev.boolti.in')
      ? 'dev.boolti.in'
      : undefined;
  return {
    local,
    token:
      (production ? env.VITE_MIXPANEL_PROD_TOKEN : env.VITE_MIXPANEL_DEV_TOKEN) ??
      env.VITE_MIXPANEL_TOKEN,
    namespace: `boolti_analytics_${production ? 'prod' : 'dev'}${local ? '_local' : ''}`,
    cookieDomain,
    debug: !production && env.VITE_MIXPANEL_DEBUG === 'true',
  };
};

type Member = { id: string | null; userCode?: string; loggedIn: boolean };
type PendingEvent = {
  event: AnalyticsEventName;
  properties: Properties;
  time: number;
  beforeNavigation: boolean;
};
let config: ReturnType<typeof getAnalyticsConfig> | undefined;
let state: 'disabled' | 'waiting' | 'ready' | 'failed' = 'disabled';
let collector: ReturnType<typeof createLocalCollector> = mixpanel;
let native = false;
let clientInfo: ClientInfo | undefined;
let member: Member | undefined;
let pending: PendingEvent[] = [];

export const isAnalyticsWebView = () => checkIsWebView() || isWebViewBridgeAvailable();

const safely = (action: () => void) => {
  try {
    action();
  } catch {
    // Analytics must never interrupt authentication, rendering or a business action.
  }
};

const readCookie = (suffix: string) => {
  const prefix = `${config?.namespace}_${suffix}=`;
  return document.cookie
    .split('; ')
    .find((item) => item.startsWith(prefix))
    ?.slice(prefix.length);
};

const writeCookie = (suffix: string, value: string) => {
  document.cookie = `${config?.namespace}_${suffix}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax${config?.cookieDomain ? `; Domain=${config.cookieDomain}` : ''}${location.protocol === 'https:' ? '; Secure' : ''}`;
};

const readMember = (): Member | undefined => {
  try {
    const value = readCookie('member');
    if (!value) return undefined;
    const parsed: unknown = JSON.parse(decodeURIComponent(value));
    if (!parsed || typeof parsed !== 'object') return undefined;
    const candidate = parsed as Member;
    if (
      (candidate.id === null || typeof candidate.id === 'string') &&
      typeof candidate.loggedIn === 'boolean'
    )
      return candidate;
  } catch {
    // Cookie restrictions do not prevent a page from working.
  }
  return undefined;
};

const syncMember = () => {
  // Webview identity comes exclusively from the native response, never browser cookies.
  if (native) return;
  const next = readMember();
  const sdkUserId = collector.get_property('$user_id') as unknown;
  if (next?.id !== member?.id || (sdkUserId && sdkUserId !== next?.id)) {
    if ((member?.id && member.id !== next?.id) || (sdkUserId && sdkUserId !== next?.id))
      collector.reset();
    if (next?.id) collector.identify(next.id);
  }
  member = next;
};

const clean = (properties: object) =>
  Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== undefined));

const initializeCollector = () => {
  if (config!.local) {
    collector = createLocalCollector();
    return;
  }
  // v2.84 runs before_send_<batch type> for people as well as events. Its TS
  // declaration only lists the events hook. Filter at transport time too so SDK
  // referrer defaults and restored profile batches cannot send other properties.
  const hooks: Config['hooks'] & {
    before_send_people: (payload: Record<string, unknown>) => Record<string, unknown> | null;
  } = {
    before_send_people: (payload) => {
      const properties = payload.$set_once ?? payload.$set;
      if (!properties || typeof properties !== 'object') return null;
      const userId = (properties as Record<string, unknown>).user_id;
      if (typeof userId !== 'string' || !userId.trim()) return null;
      const currentUserId = native ? member?.id : readMember()?.id;
      if (userId !== currentUserId || payload.$distinct_id !== userId) return null;
      return clean({
        $token: payload.$token,
        $distinct_id: payload.$distinct_id,
        $device_id: payload.$device_id,
        $user_id: payload.$user_id,
        $had_persisted_distinct_id: payload.$had_persisted_distinct_id,
        $set_once: { user_id: userId },
      });
    },
  };
  mixpanel.init(config!.token!, {
    api_host: 'https://api-js.mixpanel.com',
    autocapture: false,
    track_pageview: false,
    record_sessions_percent: 0,
    flags: false,
    ip: false,
    save_referrer: false,
    skip_first_touch_marketing: true,
    hooks,
    // OAuth callback URLs can carry authorization codes.
    property_blacklist: ['$current_url', '$referrer', '$initial_referrer'],
    persistence: 'cookie',
    // Keep develop's token-scoped SDK cookie so returning anonymous visitors retain identity.
    cookie_domain: config!.cookieDomain ?? location.hostname,
    cross_subdomain_cookie: Boolean(config!.cookieDomain),
    secure_cookie: location.protocol === 'https:',
    debug: config!.debug,
  });
};

const sendEvent = (entry: PendingEvent) => {
  syncMember();
  collector.track(
    entry.event,
    clean({
      ...entry.properties,
      ...getCommonProperties(clientInfo),
      is_logged_in: member?.loggedIn ?? false,
      user_id: member?.loggedIn ? member.id ?? undefined : undefined,
      time: entry.time,
    }),
    entry.beforeNavigation ? { transport: 'sendBeacon', send_immediately: true } : undefined,
  );
};

const flush = () => {
  const entries = pending;
  pending = [];
  entries.forEach((entry) => safely(() => sendEvent(entry)));
};

export const initializeAnalytics = (
  env: AnalyticsEnv,
  options: { debug?: boolean; isLoggedIn?: boolean } = {},
) => {
  if (state !== 'disabled' || typeof window === 'undefined') return;
  config = getAnalyticsConfig(location.origin, {
    ...env,
    VITE_MIXPANEL_DEBUG: env.VITE_MIXPANEL_DEBUG ?? String(options.debug ?? false),
  });
  if (!config.local && !config.token?.trim()) return;
  native = isAnalyticsWebView();
  if (native) {
    state = 'waiting';
    // The SDK itself is initialized only after native context is confirmed, so even
    // restored SDK batches cannot be sent before REQUEST_CLIENT_INFO completes.
    void Promise.resolve()
      .then(requestClientInfo)
      .then(({ data }) => {
        const info = parseClientInfo(data);
        clientInfo = info;
        member = { id: info.userId, loggedIn: info.isLoggedIn };
        initializeCollector();
        const restoredUserId = collector.get_property('$user_id');
        if (restoredUserId && restoredUserId !== member.id) collector.reset();
        if (member.id) {
          collector.identify(member.id);
          collector.people.set_once({ user_id: member.id });
        }
        state = 'ready';
        flush();
      })
      .catch(() => {
        state = 'failed';
        pending = [];
        console.warn('[analytics] REQUEST_CLIENT_INFO failed; webview collection is disabled.');
      });
    return;
  }
  safely(() => {
    initializeCollector();
    state = 'ready';
    syncMember();
    if (options.isLoggedIn === false) analytics.logout();
    else if (options.isLoggedIn && !member?.id) analytics.loginPending();
    const legacyFirstOpen = document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith('boolti_analytics_first_open='));
    if (!readCookie('first_open') && !legacyFirstOpen) {
      analytics.track('First Open', {});
      writeCookie('first_open', '1');
    }
  });
};

export const analytics = {
  // Waiting collectors still accept events so impression observers can start on mount.
  isEnabled: () => state === 'waiting' || state === 'ready',
  isReady: () => state === 'ready',
  loginPending: () => {
    if (state !== 'ready' || native) return;
    safely(() => {
      syncMember();
      if (member?.id || collector.get_property('$user_id')) collector.reset();
      member = { id: null, loggedIn: true };
      writeCookie('member', JSON.stringify(member));
    });
  },
  track: (
    event: AnalyticsEventName,
    properties: Properties,
    options: { beforeNavigation?: boolean } = {},
  ) => {
    if (!analytics.isEnabled()) return;
    const entry: PendingEvent = {
      event,
      properties: { ...properties },
      time: Date.now() / 1000,
      beforeNavigation: options.beforeNavigation ?? false,
    };
    if (state === 'waiting') pending.push(entry);
    else safely(() => sendEvent(entry));
  },
  identify: (id: string, userCode?: string) => {
    if (state !== 'ready' || native || !id.trim()) return;
    safely(() => {
      syncMember();
      if (member?.id && member.id !== id) collector.reset();
      collector.identify(id);
      member = { id, userCode, loggedIn: true };
      writeCookie('member', JSON.stringify(member));
      // set_once adds only the requested property; people.set also adds SDK defaults.
      collector.people.set_once({ user_id: id });
    });
  },
  logout: () => {
    if (state !== 'ready' || native) return;
    safely(() => {
      syncMember();
      if (member?.id || collector.get_property('$user_id')) collector.reset();
      member = { id: null, loggedIn: false };
      writeCookie('member', JSON.stringify(member));
    });
  },
  currentUserCode: () => {
    if (state !== 'ready' || native) return undefined;
    try {
      return readMember()?.userCode;
    } catch {
      return undefined;
    }
  },
};
