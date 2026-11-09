import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallProfileByShareCode = (shareCode: string | null) =>
  useQuery({
    ...queryKeys.concertHall.profileByShareCode(shareCode ?? ''),
    enabled: Boolean(shareCode),
  });

export default useConcertHallProfileByShareCode;
