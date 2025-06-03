import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { NonTicketingShowCreateRequest } from '../types';

type PostAddShowResponse = number;

const postAddNonticketingShow = (body: NonTicketingShowCreateRequest) =>
  fetcher.post<PostAddShowResponse>('web/v1/host/shows/non-ticketing', {
    json: body,
  });

const useAddNonTicketingShow = () => useMutation(postAddNonticketingShow);

export default useAddNonTicketingShow;
