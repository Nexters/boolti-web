import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteConcertHall = (hallId: number) =>
  fetcher.delete(`sa-api/v1/concert-halls/${hallId}`);

const useSuperAdminDeleteConcertHall = () =>
  useMutation((hallId: number) => deleteConcertHall(hallId));

export default useSuperAdminDeleteConcertHall;
