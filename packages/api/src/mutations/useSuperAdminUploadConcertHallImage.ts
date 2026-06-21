import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import { fetcher } from '../fetcher';
import { PostUploadUrlResponse } from '../types';
import { SuperAdminConcertHallUpdateImage } from '../types/superAdminConcertHall';

const getUploadUrl = () =>
  fetcher.get<PostUploadUrlResponse>('sa-api/v1/concert-hall-images/upload-urls');

// presigned URL은 인증 헤더가 붙으면 안 되므로 fetcher가 아닌 순수 ky를 쓴다.
const putS3Upload = (uploadUrl: string, file: File) => ky.put(uploadUrl, { body: file });

const uploadOne = async (file: File) => {
  const { uploadUrl, expectedUrl } = await getUploadUrl();
  await putS3Upload(uploadUrl, file);
  return expectedUrl;
};

// 공연장 이미지(대표/갤러리) 업로드. 썸네일은 동일 원본 URL을 재사용한다.
const useSuperAdminUploadConcertHallImage = () =>
  useMutation<SuperAdminConcertHallUpdateImage, unknown, File>(async (file: File) => {
    const imageUrl = await uploadOne(file);
    return { imageUrl, thumbnailUrl: imageUrl };
  });

export default useSuperAdminUploadConcertHallImage;
