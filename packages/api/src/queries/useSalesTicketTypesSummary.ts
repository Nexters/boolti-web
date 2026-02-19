import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSalesTicketTypesSummary = (showId: number, options?: { enabled?: boolean }) =>
  useQuery({
    ...queryKeys.preQuestion.salesTicketTypesSummary(showId),
    enabled: options?.enabled ?? true,
  });

export default useSalesTicketTypesSummary;
