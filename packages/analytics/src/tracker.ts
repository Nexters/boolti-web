import mixpanel from 'mixpanel-browser';

import {
  AnalyticsEvent,
  type AnalyticsEventName,
  type ObjectRole,
  type Properties,
  type Screen,
  type SearchSource,
} from './constants';
import { getCommonProperties } from './superProperties';

const FIRST_OPEN_COOKIE_NAME = 'boolti_analytics_first_open';
const ROOT_DOMAIN = 'boolti.in';
const TEN_YEARS_IN_SECONDS = 60 * 60 * 24 * 365 * 10;

let isInitialized = false;

const omitEmpty = (properties: Properties) =>
  Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== undefined));

export type TrackOptions = {
  /** 클릭 직후 페이지를 떠나는 경우. 배치를 기다리지 않고 sendBeacon 으로 바로 보낸다. */
  beforeNavigation?: boolean;
};

const track = (
  eventName: AnalyticsEventName,
  properties: Properties = {},
  { beforeNavigation = false }: TrackOptions = {},
) => {
  if (!isInitialized) return;

  mixpanel.track(
    eventName,
    omitEmpty(properties),
    beforeNavigation ? { transport: 'sendBeacon', send_immediately: true } : undefined,
  );
};

// 앱마다 서브도메인이 달라서(boolti.in, place.boolti.in 등) 최초 방문 여부를 상위 도메인 쿠키에 둔다
const getCookieDomain = () =>
  window.location.hostname.endsWith(ROOT_DOMAIN) ? `; domain=.${ROOT_DOMAIN}` : '';

const trackFirstOpenIfNeeded = () => {
  // 앱 웹뷰에서는 앱이 First Open 을 보낸다
  if (getCommonProperties().is_webview) return;
  if (document.cookie.split('; ').some((cookie) => cookie.startsWith(`${FIRST_OPEN_COOKIE_NAME}=`)))
    return;

  track(AnalyticsEvent.FIRST_OPEN);
  document.cookie = `${FIRST_OPEN_COOKIE_NAME}=true; path=/; max-age=${TEN_YEARS_IN_SECONDS}${getCookieDomain()}`;
};

/** 최초 유입 경로. iOS setInitialUTM 과 같이 URL 에 UTM 이 있을 때 사용자 속성에 한 번만 기록한다. */
const setInitialUtmIfPresent = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const utmProperties = omitEmpty({
    initial_utm_source: searchParams.get('utm_source') ?? undefined,
    initial_utm_medium: searchParams.get('utm_medium') ?? undefined,
    initial_utm_campaign: searchParams.get('utm_campaign') ?? undefined,
  });

  if (Object.keys(utmProperties).length === 0) return;

  mixpanel.people.set_once(utmProperties);
};

/**
 * 앱 진입점에서 한 번 호출한다. 토큰이 없으면 아무것도 보내지 않는다.
 * 로그인을 모르는 앱(place, preview, profile)은 isLoggedIn 을 넘기지 않고, 그러면 is_logged_in 을 보내지 않는다.
 */
export const initAnalytics = (
  token: string | undefined,
  options: { debug?: boolean; isLoggedIn?: boolean } = {},
) => {
  if (isInitialized || !token) return;

  // 기본 persistence(쿠키, 서브도메인 공유)를 써야 서브도메인 사이에서 같은 사용자로 잡힌다
  mixpanel.init(token, {
    debug: options.debug ?? false,
    track_pageview: false,
  });
  isInitialized = true;

  mixpanel.register(omitEmpty({ ...getCommonProperties(), is_logged_in: options.isLoggedIn }));
  trackFirstOpenIfNeeded();
  setInitialUtmIfPresent();
};

/** 로그인 사용자 확인 시 호출. iOS 와 같이 userId 를 문자열로 identify 한다. */
export const identifyUser = (user: { id: number; nickname?: string; email?: string }) => {
  if (!isInitialized) return;

  mixpanel.identify(String(user.id));
  mixpanel.register({ is_logged_in: true });
  mixpanel.people.set(omitEmpty({ $name: user.nickname, $email: user.email }));
};

/** 회원가입 완료 시 가입일을 한 번만 기록한다. */
export const setSignUpDate = (date: string) => {
  if (!isInitialized) return;

  mixpanel.people.set_once({ sign_up_date: date });
};

/** 공연 등록 완료 시 주최자 속성을 갱신한다. */
export const updateOrganizerProfile = () => {
  if (!isInitialized) return;

  mixpanel.people.set_once({ is_organizer: true });
  mixpanel.people.increment('created_event_count', 1);
};

export const resetUser = () => {
  if (!isInitialized) return;

  mixpanel.reset();
  mixpanel.register({ ...omitEmpty(getCommonProperties()), is_logged_in: false });
};

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
