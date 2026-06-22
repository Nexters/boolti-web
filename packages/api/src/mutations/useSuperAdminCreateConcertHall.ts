import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminConcertHallCreateResponse } from '../types/superAdminConcertHall';

const postConcertHall = (name: string) =>
  fetcher.post<SuperAdminConcertHallCreateResponse>(`sa-api/v1/concert-halls`, {
    json: { name },
  });

const useSuperAdminCreateConcertHall = () =>
  useMutation((name: string) => postConcertHall(name));

export default useSuperAdminCreateConcertHall;
