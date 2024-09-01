import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { fetcher } from '../fetcher';
import { PostUploadUrlResponse } from '../types';

const postUploadUrl = () =>
  fetcher.post<PostUploadUrlResponse>('web/v1/users/me/profile-images/upload-urls');

const putS3Upload = (uploadUrl: string, file: File) =>
  ky.put(uploadUrl, {
    body: file,
  });

const useUploadShowImage = () =>
  useMutation(async (file: File) => {
    const { uploadUrl, expectedUrl } = await postUploadUrl();

    await putS3Upload(uploadUrl, file);

    return { url: expectedUrl, fileName: file.name };
  });

export default useUploadShowImage;
