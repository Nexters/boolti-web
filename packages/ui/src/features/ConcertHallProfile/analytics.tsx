import { trackClick, trackImpression, useImpression } from '@boolti/analytics';
import { createContext, useContext } from 'react';

/** 공연장 프로필 정보 탐색(Impression) 섹션. 이벤트 시트의 object_value 값이다. */
export type ConcertHallProfileSection =
  | 'Introduction'
  | 'Photos'
  | 'Amenities'
  | 'Location'
  | 'BookingMethod'
  | 'BookingHours'
  | 'RentalFee'
  | 'HourlySurcharge'
  | 'AvailableInstruments'
  | 'PaidOptions'
  | 'SpecialNotes';

export type ConcertHallProfileAnalyticsEvent =
  | { type: 'tab'; tab: 'Home' | 'RentalInfo' }
  | { type: 'share' }
  | { type: 'photo'; photoIndex: number }
  | { type: 'map' }
  | { type: 'contact'; method: 'Call' | 'Mail' | 'Website' }
  | { type: 'sectionImpression'; section: ConcertHallProfileSection }
  | { type: 'comingSoonImpression' };

export type ConcertHallProfileAnalyticsHandler = (event: ConcertHallProfileAnalyticsEvent) => void;

const ConcertHallProfileAnalyticsContext = createContext<ConcertHallProfileAnalyticsHandler | null>(
  null,
);

export const ConcertHallProfileAnalyticsProvider = ConcertHallProfileAnalyticsContext.Provider;

export const useConcertHallProfileAnalytics = () => {
  const onAnalyticsEvent = useContext(ConcertHallProfileAnalyticsContext);

  return (event: ConcertHallProfileAnalyticsEvent) => onAnalyticsEvent?.(event);
};

/** 섹션이 처음 보였을 때 sectionImpression 을 보낸다. 반환한 ref 를 섹션 요소에 붙인다. */
export const useSectionImpression = <T extends Element = HTMLDivElement>(
  section: ConcertHallProfileSection,
) => {
  const trackEvent = useConcertHallProfileAnalytics();

  return useImpression<T>(() => trackEvent({ type: 'sectionImpression', section }));
};

/** 공연장 프로필 이벤트를 이벤트 시트 형식(screen: PlaceProfile)으로 보낸다. */
export const trackConcertHallProfileEvent = (
  event: ConcertHallProfileAnalyticsEvent,
  placeId: number,
) => {
  const properties = { place_id: placeId };

  switch (event.type) {
    case 'tab':
      trackClick('PlaceProfile', 'Tab', event.tab, properties);
      return;
    case 'share':
      trackClick('PlaceProfile', 'Button', 'Share', { ...properties, share_method: 'WithInfo' });
      return;
    case 'photo':
      trackClick('PlaceProfile', 'Item', 'Photo', { ...properties, photo_index: event.photoIndex });
      return;
    case 'map':
      trackClick('PlaceProfile', 'Item', 'Map', properties);
      return;
    case 'contact':
      trackClick('PlaceProfile', 'Button', event.method, properties);
      return;
    case 'sectionImpression':
      trackImpression('PlaceProfile', 'Section', event.section, properties);
      return;
    case 'comingSoonImpression':
      trackImpression('PlaceProfile', 'Section', 'ComingSoon', properties);
      return;
  }
};
