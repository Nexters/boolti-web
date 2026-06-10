import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import {
  SuperAdminConcertHallShowCreateResponse,
  SuperAdminConcertHallShowManualRequest,
} from '../types/superAdminConcertHall';

interface AddConcertHallShowManualParams extends SuperAdminConcertHallShowManualRequest {
  hallId: number;
}

const postShowManual = ({ hallId, ...body }: AddConcertHallShowManualParams) =>
  fetcher.post<SuperAdminConcertHallShowCreateResponse>(
    `sa-api/v1/concert-halls/${hallId}/shows/manual`,
    { json: body },
  );

const useSuperAdminAddConcertHallShowManual = () =>
  useMutation((params: AddConcertHallShowManualParams) => postShowManual(params));

export default useSuperAdminAddConcertHallShowManual;
