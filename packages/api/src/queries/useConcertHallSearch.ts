import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallSearch = (keyword: string) =>
  useQuery({
    ...queryKeys.concertHall.searchByKeyword(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 60_000,
  });

export default useConcertHallSearch;
