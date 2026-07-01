import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallSearchDetail = (concertHallId: number | null) =>
  useQuery({
    ...queryKeys.concertHallSearch.detail(concertHallId ?? 0),
    enabled: concertHallId != null,
  });

export default useConcertHallSearchDetail;
