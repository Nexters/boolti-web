import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminSalesTicketList = (showId: number) =>
  useQuery(queryKeys.adminTicket.salesTicketList(showId));

export default useAdminSalesTicketList;
