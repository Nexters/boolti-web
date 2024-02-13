import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PutShowInfoRequest {
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

const putShowInfo = (showId: number, body: PutShowInfoRequest) =>
  fetcher.put(`web/v1/host/shows/${showId}`, { json: body });

const useEditShowInfo = () =>
  useMutation(({ showId, body }: { showId: number; body: PutShowInfoRequest }) =>
    putShowInfo(showId, body),
  );

export default useEditShowInfo;
