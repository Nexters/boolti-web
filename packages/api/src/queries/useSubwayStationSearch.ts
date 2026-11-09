import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSubwayStationSearch = (query: string) =>
  useQuery({
    ...queryKeys.superAdminConcertHall.subwayStationSearch(query),
    enabled: query.trim().length > 0,
    staleTime: 60_000,
  });

export default useSubwayStationSearch;
