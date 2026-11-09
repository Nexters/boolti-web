import { trackClick } from '@boolti/analytics';

/** 프로필 화면 Click 이벤트. 하위 화면(지난 공연, 동영상, 링크 전체 보기)도 screen 은 Profile 이다. */
export const trackProfileLinkClick = (
  objectValue: 'Instagram' | 'Youtube' | 'Custom',
  url: string,
) => trackClick('Profile', 'Link', objectValue, { url });

export const trackProfileVideoClick = (url: string) =>
  trackClick('Profile', 'Link', 'PlayVideo', { url });

/** 공연 클릭은 바로 다른 사이트로 이동하므로 이벤트를 즉시 보낸다 */
export const trackProfileShowClick = (showId: string | number) =>
  trackClick('Profile', 'Item', showId, {}, { beforeNavigation: true });
