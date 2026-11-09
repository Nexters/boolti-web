import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { ConcertHallSearchListParams } from '../types/concertHall';

const useConcertHallSearchList = (params: ConcertHallSearchListParams) =>
  useQuery({
    ...queryKeys.concertHallSearch.list(params),
    staleTime: 60_000,
  });

export default useConcertHallSearchList;
