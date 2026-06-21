import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminConcertHallRentalUpdateRequest } from '../types/superAdminConcertHall';

interface UpdateConcertHallRentalParams {
  hallId: number;
  body: SuperAdminConcertHallRentalUpdateRequest;
}

const putConcertHallRental = ({ hallId, body }: UpdateConcertHallRentalParams) =>
  fetcher.put(`sa-api/v1/concert-halls/${hallId}/rental`, { json: body });

const useSuperAdminUpdateConcertHallRental = () =>
  useMutation((params: UpdateConcertHallRentalParams) => putConcertHallRental(params));

export default useSuperAdminUpdateConcertHallRental;
