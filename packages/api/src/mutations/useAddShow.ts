import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostAddShowRequest {
  name: string;
  images: {
    sequence: number;
    thumbnailPath: string;
    path: string;
  }[];
  date: string;
  runningTime: number;
  place: {
    name: string;
    streetAddress: string;
    detailAddress: string;
  };
  notice: string;
  host: {
    name: string;
    phoneNumber: string;
  };
}

const postAddShow = (body: PostAddShowRequest) =>
  fetcher.post('web/v1/host/shows', {
    json: body,
  });

const useAddShow = () => useMutation((body: PostAddShowRequest) => postAddShow(body));

export default useAddShow;
