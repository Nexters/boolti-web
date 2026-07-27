import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallSearchImages = (concertHallId: number | null, enabled = true) =>
  useQuery({
    ...queryKeys.concertHallSearch.images(concertHallId ?? 0),
    enabled: concertHallId != null && enabled,
  });

export default useConcertHallSearchImages;
