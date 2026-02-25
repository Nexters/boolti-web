import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface EditSalesTicketTypeRequest {
  salesTicketTypeId: number;
  ticketName?: string;
  price?: number;
  totalForSale?: number;
  isPaused?: boolean;
}

const patchEditSalesTicketType = ({ salesTicketTypeId, ...body }: EditSalesTicketTypeRequest) =>
  fetcher.patch(`web/v1/host/sales-ticket-types/${salesTicketTypeId}`, { json: body });

const useEditSalesTicketType = () =>
  useMutation((data: EditSalesTicketTypeRequest) => patchEditSalesTicketType(data));

export default useEditSalesTicketType;
