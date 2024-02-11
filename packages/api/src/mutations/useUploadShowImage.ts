import { useMutation } from '@tanstack/react-query';
import ImageResize from 'image-resize';
import ky from 'ky';

import { fetcher } from '../fetcher';

export interface ImageFile extends File {
  preview: string;
}

interface PostUploadUrlResponse {
  uploadUrl: string;
  expectedUrl: string;
}

const thumbnailImageResize = new ImageResize({
  format: 'png',
  width: 300,
});

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

const useUploadShowImage = () =>
  useMutation(async (files: ImageFile[]) => {
    const resizedImages = await Promise.all(
      files.map(async (file) => {
        const imageFile = await imageResize.play(file.preview);
        const thumbnailImageFile = await thumbnailImageResize.play(file.preview);

        return { imageFile, thumbnailImageFile };
      }),
    );

    return await Promise.all(
      resizedImages.map(async (image, index) => {
        const [imageUrl, thumbnailUrl] = await Promise.all(
          Object.entries(image).map(async ([type, dataUrl]) => {
            const fileName = type === 'imageFile' ? 'image.png' : 'thumbnail.png';

            const { uploadUrl, expectedUrl } = await postUploadUrl();
            const imageFile = dataUrlToFile(dataUrl as string, fileName);
            await putS3Upload(uploadUrl, imageFile);

            return expectedUrl;
          }),
        );

        return { sequence: index + 1, imageUrl, thumbnailUrl };
      }),
    );
  });

export default useUploadShowImage;
