import {
  AnalyticsEvent,
  type AnalyticsEventName,
  type ObjectRole,
  type Properties,
  type Screen,
  type SearchSource,
} from './constants';

import { analytics, initializeAnalytics, type AnalyticsEnv } from './runtime';

export { getAnalyticsConfig, isAnalyticsWebView } from './runtime';
export type { AnalyticsEnv } from './runtime';

export type TrackOptions = {
  /** 클릭 직후 페이지를 떠나는 경우. 배치를 기다리지 않고 sendBeacon 으로 바로 보낸다. */
  beforeNavigation?: boolean;
};

const track = (
  eventName: AnalyticsEventName,
  properties: Properties = {},
  options: TrackOptions = {},
) => analytics.track(eventName, properties, options);

/** 기존 단일 토큰 호출도 지원한다. 앱 진입점은 dev/prod 토큰을 포함한 env를 전달한다. */
export const initAnalytics = (
  tokenOrEnv: string | AnalyticsEnv | undefined,
  options: { debug?: boolean; isLoggedIn?: boolean } = {},
) =>
  initializeAnalytics(
    typeof tokenOrEnv === 'object' ? tokenOrEnv : { VITE_MIXPANEL_TOKEN: tokenOrEnv },
    options,
  );

/** 웹뷰는 REQUEST_CLIENT_INFO의 userId만 사용한다. */
export const identifyUser = (user: { id: string | number; userCode?: string }) =>
  analytics.identify(String(user.id), user.userCode);

export const resetUser = () => analytics.logout();

export const trackViewScreen = (screen: Screen, properties: Properties = {}) => {
  track(AnalyticsEvent.VIEW_SCREEN, { ...properties, screen });
};

export const trackClick = (
  screen: Screen,
  objectRole: ObjectRole,
  objectValue: string | number,
  properties: Properties = {},
  options?: TrackOptions,
) => {
  track(
    AnalyticsEvent.CLICK,
    {
      ...properties,
      screen,
      object_role: objectRole,
      object_value: String(objectValue),
    },
    options,
  );
};

export const trackImpression = (
  screen: Screen,
  objectRole: ObjectRole,
  objectValue: string,
  properties: Properties = {},
) => {
  track(AnalyticsEvent.IMPRESSION, {
    ...properties,
    screen,
    object_role: objectRole,
    object_value: objectValue,
  });
};

export const trackSearch = (
  screen: Screen,
  searchKeyword: string,
  properties: Properties & { search_source?: SearchSource; result_count?: number } = {},
) => {
  track(AnalyticsEvent.SEARCH, { ...properties, screen, search_keyword: searchKeyword });
};

export const trackComplete = (
  eventName: typeof AnalyticsEvent.COMPLETE_SIGN_UP | typeof AnalyticsEvent.COMPLETE_EVENT_CREATION,
  properties: Properties = {},
) => {
  track(eventName, properties);
};
