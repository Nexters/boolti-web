import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { ShowCreateRequest } from '../types';

type PostAddShowResponse = number;

const postAddShow = (body: ShowCreateRequest) =>
  fetcher.post<PostAddShowResponse>('web/v1/host/shows', {
    json: body,
  });

const useAddShow = () => useMutation((body: ShowCreateRequest) => postAddShow(body));

export default useAddShow;
