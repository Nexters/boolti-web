import { sendCommand } from './sendCommand';

export type ViewPlacePhotoDetailRequestData = {
  /** 공연장(플레이스) ID */
  id: number;
  /**
   * 사진 ID 목록 (노출 순서대로).
   * 개별 사진을 누르면 해당 사진 1개만, 더보기 버튼을 누르면 전체가 담긴다.
   * 즉 길이가 1이면 사진 크게보기, 그 외에는 사진 목록 화면이다.
   */
  imageIds: number[];
};

export const viewPlacePhotoDetail = (data: ViewPlacePhotoDetailRequestData) => {
  return sendCommand({ command: 'VIEW_PLACE_PHOTO_DETAIL', data });
};
