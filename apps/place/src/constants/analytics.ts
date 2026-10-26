import { trackViewScreen } from '@boolti/analytics';
import type { ConcertHallProfileResponse } from '@boolti/api';
import { checkIsAndroid } from '@boolti/bridge';
import { type ConcertHallProfileAnalyticsEvent, trackConcertHallProfileEvent } from '@boolti/ui';

/** 브라우저에서 연 공연장 프로필(/:shareCode)의 화면 진입 */
export const trackPlaceProfileView = (profile: ConcertHallProfileResponse) => {
  trackViewScreen('PlaceProfile', {
    place_id: profile.id,
    place_name: profile.name,
    source: new URLSearchParams(window.location.search).get('source') ?? 'Direct',
    profile_status: profile.hasHomeTabData || profile.hasRentalTabData ? 'Active' : 'ComingSoon',
  });
};

/**
 * 앱 웹뷰(/:shareCode/home, /rental)에서는 화면 진입, 탭, 공유, 문의를 앱이 기록한다.
 * 웹은 웹뷰 안에서만 일어나는 사진, 지도 클릭만 보낸다.
 * 섹션 노출(정보 탐색)은 보내지 않는다. 두 앱 모두 웹뷰를 내용 전체 높이로 펼쳐 네이티브 스크롤에 넣기 때문에
 * 웹에서는 모든 섹션이 로드 즉시 보이는 것으로 잡힌다. 앱이 보이는 영역을 웹에 넘겨줘야 측정할 수 있다.
 * COMING SOON 은 iOS 가 네이티브 화면으로 띄워 직접 기록하므로 Android 웹뷰에서만 보낸다.
 */
export const trackPlaceProfileWebViewEvent = (
  event: ConcertHallProfileAnalyticsEvent,
  placeId: number,
) => {
  switch (event.type) {
    case 'photo':
    case 'map':
      trackConcertHallProfileEvent(event, placeId);
      return;
    case 'comingSoonImpression':
      if (checkIsAndroid()) trackConcertHallProfileEvent(event, placeId);
      return;
    default:
      return;
  }
};
