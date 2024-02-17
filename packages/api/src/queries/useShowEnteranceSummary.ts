import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowEnteranceSummary = (showId: number) =>
  useQuery(queryKeys.enterance.summary(showId));

export default useShowEnteranceSummary;
