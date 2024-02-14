import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteSalesTicket = (salesTicketId: number) =>
  fetcher.delete(`web/v1/host/sales-tickets/${salesTicketId}`);

const useDeleteSalesTicket = () =>
  useMutation((salesTicketId: number) => deleteSalesTicket(salesTicketId));

export default useDeleteSalesTicket;
