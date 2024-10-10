import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminTicketSalesInfo = (showId: number) =>
  useQuery(queryKeys.adminTicket.salesInfo(showId));

export default useSuperAdminTicketSalesInfo;
