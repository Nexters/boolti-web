import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallRecommendedRegions = () =>
  useQuery({
    ...queryKeys.concertHallSearch.recommendedRegions,
    staleTime: 60_000,
  });

export default useConcertHallRecommendedRegions;
