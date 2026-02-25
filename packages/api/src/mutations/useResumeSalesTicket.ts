import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const putResumeSalesTicket = (salesTicketTypeId: number) =>
  fetcher.put(`web/v1/host/sales-ticket-types/${salesTicketTypeId}/resume`);

const useResumeSalesTicket = () =>
  useMutation((salesTicketTypeId: number) => putResumeSalesTicket(salesTicketTypeId));

export default useResumeSalesTicket;
