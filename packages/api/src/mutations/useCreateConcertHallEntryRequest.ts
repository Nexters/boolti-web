import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { ConcertHallEntryRequest } from '../types/concertHall';

const postConcertHallEntryRequest = (body: ConcertHallEntryRequest) =>
  fetcher.post('web/v1/host/concert-hall-entry-requests', { json: body });

const useCreateConcertHallEntryRequest = () =>
  useMutation((body: ConcertHallEntryRequest) => postConcertHallEntryRequest(body));

export default useCreateConcertHallEntryRequest;
