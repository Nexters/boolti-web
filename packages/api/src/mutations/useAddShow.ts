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
  salesStartTime: string;
  salesEndTime: string;
  ticketNotice: string;
  salesTickets: {
    ticketName: string;
    price: number;
    totalForSale: number;
  }[];
  invitationTickets: {
    ticketName: string;
    totalForSale: number;
  }[];
}

type PostAddShowResponse = number;

const postAddShow = (body: PostAddShowRequest) =>
  fetcher.post<PostAddShowResponse>('web/v1/host/shows', {
    json: body,
  });

const useAddShow = () => useMutation((body: PostAddShowRequest) => postAddShow(body));

export default useAddShow;
