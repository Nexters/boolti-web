import { sendCommand } from './sendCommand';

export type ViewPlacePhotoDetailRequestData = {
  /** 공연장(플레이스) ID */
  id: number;
  /** 전체 사진 ID 목록 (노출 순서대로) */
  imageIds: number[];
  /**
   * 크게 볼 사진 ID. 개별 사진을 누른 경우에만 담긴다.
   * 없으면(더보기 버튼) 사진 목록 화면으로 연결한다.
   */
  selectedImageId?: number;
};

export const viewPlacePhotoDetail = (data: ViewPlacePhotoDetailRequestData) => {
  return sendCommand({ command: 'VIEW_PLACE_PHOTO_DETAIL', data });
};
