import { useMutation } from '@tanstack/react-query';
// Note: yarn build 실행 시, image-resize 라이브러리의 package.json 이슈로
//       타입을 올바르게 불러오지 못하는 이슈가 있어 부득이하게 ts-ignore 처리합니다.
//       VS Code 에디터에서 개발할 때는 문제 없이 타입을 불러옵니다.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageResize from 'image-resize';
import ky from 'ky';

import { fetcher } from '../fetcher';
import { PostUploadUrlResponse } from '../types';

export interface ImageFile extends Partial<File> {
  preview: string;
}

const imageResize = new ImageResize({
  format: 'png',
  width: 800,
});

const dataUrlToFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const postUploadUrl = () =>
  fetcher.post<PostUploadUrlResponse>('web/v1/host/show-images/upload-urls');

const putS3Upload = (uploadUrl: string, file: File) =>
  ky.put(uploadUrl, {
    body: file,
  });

const useUploadShowContentImage = () =>
  useMutation<string, unknown, ImageFile, unknown>(async (imageFile: ImageFile) => {
    const resizedFile = await imageResize.play(imageFile.preview);
    const { uploadUrl, expectedUrl } = await postUploadUrl();
    const file = dataUrlToFile(resizedFile as string, 'image.png');
    await putS3Upload(uploadUrl, file);

    return expectedUrl;
  });

export default useUploadShowContentImage;
