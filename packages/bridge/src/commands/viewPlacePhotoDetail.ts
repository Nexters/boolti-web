import { sendCommand } from './sendCommand';

export type ViewPlacePhotoDetailRequestData = {
  /** 공연장(플레이스) ID */
  id: number;
  /** 크게 볼 사진 ID */
  imageId: number;
};

/** 개별 사진을 눌렀을 때. 앱의 '사진 크게보기' 화면으로 연결한다. */
export const viewPlacePhotoDetail = (data: ViewPlacePhotoDetailRequestData) => {
  return sendCommand({ command: 'VIEW_PLACE_PHOTO_DETAIL', data });
};
