import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminTicketSalesInfo = (showId: number) =>
  useQuery(queryKeys.adminShow.ticketSalesInfo(showId));

export default useAdminTicketSalesInfo;
