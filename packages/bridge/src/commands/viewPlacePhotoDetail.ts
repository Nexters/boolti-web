import { sendCommand } from './sendCommand';

export type ViewPlacePhotoDetailRequestData = {
  /** 공연장(플레이스) ID */
  id: number;
  /** 전체 사진 ID 목록 (노출 순서대로) */
  imageIds: number[];
};

export const viewPlacePhotoDetail = (data: ViewPlacePhotoDetailRequestData) => {
  return sendCommand({ command: 'VIEW_PLACE_PHOTO_DETAIL', data });
};
