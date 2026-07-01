import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useConcertHallAutocomplete = (query: string) => {
  const trimmedQuery = query.trim();

  return useQuery({
    ...queryKeys.concertHallSearch.autocomplete(trimmedQuery),
    enabled: trimmedQuery.length > 0,
    keepPreviousData: trimmedQuery.length > 0,
    staleTime: 60_000,
  });
};

export default useConcertHallAutocomplete;
