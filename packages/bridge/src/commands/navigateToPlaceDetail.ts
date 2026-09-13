import { sendCommand } from './sendCommand';

export type NavigateToPlaceDetailRequestData = {
  /** 공연장(플레이스) ID */
  concertHallId: number;
};

/** 공연 상세의 공연장명을 눌렀을 때. 앱의 공연장 프로필 화면으로 연결한다. */
export const navigateToPlaceDetail = (data: NavigateToPlaceDetailRequestData) => {
  return sendCommand({ command: 'NAVIGATE_TO_PLACE_DETAIL', data });
};
