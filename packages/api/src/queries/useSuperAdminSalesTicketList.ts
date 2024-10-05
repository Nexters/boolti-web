import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminSalesTicketList = (showId: number) =>
  useQuery(queryKeys.adminTicket.salesTickets(showId));

export default useSuperAdminSalesTicketList;
