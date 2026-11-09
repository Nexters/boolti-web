import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface DeleteConcertHallShowParams {
  hallId: number;
  concertHallShowId: number;
}

const deleteConcertHallShow = ({ hallId, concertHallShowId }: DeleteConcertHallShowParams) =>
  fetcher.delete(`sa-api/v1/concert-halls/${hallId}/shows/${concertHallShowId}`);

const useSuperAdminDeleteConcertHallShow = () =>
  useMutation((params: DeleteConcertHallShowParams) => deleteConcertHallShow(params));

export default useSuperAdminDeleteConcertHallShow;
