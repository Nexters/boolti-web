/**
 * Mixpanel 이벤트 정의. 값은 이벤트 정의 시트(웹 이벤트 속성, 파라미터 속성)와 같아야 한다.
 * iOS `AnalyticsTypes.swift`, Android `common/tracker` 와 같은 값을 쓴다.
 */
export const AnalyticsEvent = {
  FIRST_OPEN: 'First Open',
  VIEW_SCREEN: 'View Screen',
  CLICK: 'Click',
  IMPRESSION: 'Impression',
  SEARCH: 'Search',
  COMPLETE_SIGN_UP: 'Complete SignUp',
  COMPLETE_EVENT_CREATION: 'Complete EventCreation',
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

export type Screen =
  | 'Login'
  | 'Home'
  | 'ShowDetail'
  | 'EventCreationType'
  | 'EventCreationBasicInfo'
  | 'EventCreationDetailedInfo'
  | 'EventCreationTicketInfo'
  | 'Profile'
  | 'ProfileEdit'
  | 'MyPage'
  | 'PlaceProfile'
  | 'PlaceSearch';

export type ObjectRole =
  | 'Button'
  | 'BottomSheet'
  | 'Banner'
  | 'Item'
  | 'Tab'
  | 'Link'
  | 'Chip'
  | 'Section'
  | 'EmptyState';

export type LoginMethod = 'Kakao' | 'Apple';

export type TicketingType = 'Paid' | 'None';

export type SearchSource = 'Direct' | 'Recent' | 'Trending' | 'AutoComplete' | 'RecommendedRegion';

export type Platform = 'Web_mobile' | 'Web_desktop';

export type PropertyValue = string | number | boolean | null | undefined;

export type Properties = Record<string, PropertyValue>;
