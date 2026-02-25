import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const putPauseSalesTicket = (salesTicketTypeId: number) =>
  fetcher.put(`web/v1/host/sales-ticket-types/${salesTicketTypeId}/pause`);

const usePauseSalesTicket = () =>
  useMutation((salesTicketTypeId: number) => putPauseSalesTicket(salesTicketTypeId));

export default usePauseSalesTicket;
