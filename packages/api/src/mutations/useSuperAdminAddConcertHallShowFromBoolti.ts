import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminConcertHallShowCreateResponse } from '../types/superAdminConcertHall';

interface AddConcertHallShowFromBooltiParams {
  hallId: number;
  showId: number;
}

const postShowFromBoolti = ({ hallId, showId }: AddConcertHallShowFromBooltiParams) =>
  fetcher.post<SuperAdminConcertHallShowCreateResponse>(
    `sa-api/v1/concert-halls/${hallId}/shows/from-boolti`,
    { json: { showId } },
  );

const useSuperAdminAddConcertHallShowFromBoolti = () =>
  useMutation((params: AddConcertHallShowFromBooltiParams) => postShowFromBoolti(params));

export default useSuperAdminAddConcertHallShowFromBoolti;
