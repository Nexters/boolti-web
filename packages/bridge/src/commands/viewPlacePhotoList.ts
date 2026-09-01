import { sendCommand } from './sendCommand';

export type ViewPlacePhotoListRequestData = {
  /** 공연장(플레이스) ID */
  id: number;
  /** 전체 사진 ID 목록 (노출 순서대로) */
  imageIds: number[];
};

/** 더보기 버튼을 눌렀을 때. 앱의 '사진 목록' 화면으로 연결한다. */
export const viewPlacePhotoList = (data: ViewPlacePhotoListRequestData) => {
  return sendCommand({ command: 'VIEW_PLACE_PHOTO_LIST', data });
};
