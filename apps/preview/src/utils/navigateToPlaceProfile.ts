import { fetcher, type ConcertHallProfileResponse } from '@boolti/api';
import { isWebViewBridgeAvailable, navigateToPlaceDetail } from '@boolti/bridge';

import { EXTERNAL_URL } from '../constants/external';

export const navigateToPlaceProfile = async (placeId: number): Promise<void> => {
  if (isWebViewBridgeAvailable()) {
    // 앱은 화면 이동 후 응답하지 않을 수 있으므로 기존 브릿지 실패 처리를 유지한다.
    await navigateToPlaceDetail({ placeId }).catch(() => {});
    return;
  }

  const profile = await fetcher.get<ConcertHallProfileResponse>(
    `web/papi/v1/concert-halls/${placeId}`,
  );
  const shareCode = profile.share?.shareCode ?? profile.shareCode;

  if (!shareCode) {
    throw new Error('공연장 공유 코드가 없습니다.');
  }

  window.location.href = EXTERNAL_URL.PLACE_PROFILE(shareCode);
};
