import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import { fetcher } from '../fetcher';
import { PostUploadUrlResponse } from '../types';

const postUploadUrl = (showId: number) =>
  fetcher.post<PostUploadUrlResponse>(`web/v1/host/shows/${showId}/upload-urls`);

const putS3Upload = (uploadUrl: string, file: File) =>
  ky.put(uploadUrl, {
    body: file,
  });

const putIDCardPhotoFile = (showId: string, { url, fileName }: { url: string; fileName: string }) =>
  fetcher.put(`web/v1/host/shows/${showId}/settlement-infos/id-card-photo-file`, {
    json: { url, fileName },
  });

const useUploadIDCardPhotoFile = (showId: number) =>
  useMutation(async (file: File) => {
    const { uploadUrl, expectedUrl } = await postUploadUrl(showId);

    await putS3Upload(uploadUrl, file);

    return await putIDCardPhotoFile(`${showId}`, {
      url: expectedUrl,
      fileName: file.name,
    });
  });

export default useUploadIDCardPhotoFile;
