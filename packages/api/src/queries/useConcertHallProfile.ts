import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallProfile = (concertHallId: number | null) =>
  useQuery({
    ...queryKeys.concertHall.profile(concertHallId ?? 0),
    enabled: concertHallId != null,
  });

export default useConcertHallProfile;
