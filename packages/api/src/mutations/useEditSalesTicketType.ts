import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface EditSalesTicketTypeRequest {
  salesTicketTypeId: number;
  ticketName?: string;
  price?: number;
  totalForSale?: number;
  isPaused?: boolean;
}

const putEditSalesTicketType = ({ salesTicketTypeId, ...body }: EditSalesTicketTypeRequest) =>
  fetcher.put(`web/v1/host/sales-ticket-types/${salesTicketTypeId}`, { json: body });

const useEditSalesTicketType = () =>
  useMutation((data: EditSalesTicketTypeRequest) => putEditSalesTicketType(data));

export default useEditSalesTicketType;
