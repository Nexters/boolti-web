import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import { fetcher } from '../fetcher';
import { PostUploadUrlResponse } from '../types';

const getUploadUrl = () =>
  fetcher.get<PostUploadUrlResponse>('sa-api/v1/show-images/upload-urls');

// presigned URL은 인증 헤더가 붙으면 안 되므로 fetcher가 아닌 순수 ky를 쓴다.
const putS3Upload = (uploadUrl: string, file: File) => ky.put(uploadUrl, { body: file });

// 공연 데이터 직접 입력의 포스터 업로드. 업로드 후 접근 가능한 URL을 반환한다.
const useSuperAdminUploadShowPoster = () =>
  useMutation<string, unknown, File>(async (file: File) => {
    const { uploadUrl, expectedUrl } = await getUploadUrl();
    await putS3Upload(uploadUrl, file);
    return expectedUrl;
  });

export default useSuperAdminUploadShowPoster;
