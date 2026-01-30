import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSalesTicketTypesSummary = (showId: number) =>
  useQuery(queryKeys.preQuestion.salesTicketTypesSummary(showId));

export default useSalesTicketTypesSummary;
