import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminConcertHallUpdateRequest } from '../types/superAdminConcertHall';

interface UpdateConcertHallParams {
  hallId: number;
  body: SuperAdminConcertHallUpdateRequest;
}

const putConcertHall = ({ hallId, body }: UpdateConcertHallParams) =>
  fetcher.put(`sa-api/v1/concert-halls/${hallId}`, { json: body });

const useSuperAdminUpdateConcertHall = () =>
  useMutation((params: UpdateConcertHallParams) => putConcertHall(params));

export default useSuperAdminUpdateConcertHall;
