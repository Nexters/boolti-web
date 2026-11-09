import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { ConcertHallEntryRequest } from '../types/concertHall';

const postConcertHallOnboardingRequest = (body: ConcertHallEntryRequest) =>
  fetcher.post('web/papi/v1/concert-halls/onboarding-requests', { json: body });

const useCreateConcertHallOnboardingRequest = () =>
  useMutation((body: ConcertHallEntryRequest) => postConcertHallOnboardingRequest(body));

export default useCreateConcertHallOnboardingRequest;
