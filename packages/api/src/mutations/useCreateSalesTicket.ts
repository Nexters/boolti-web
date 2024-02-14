import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostCreateSalesTicketRequest {
  showId: number;
  ticketName: string;
  price: number;
  totalForSale: number;
}

const postCreateSalesTicket = (body: PostCreateSalesTicketRequest) =>
  fetcher.post('web/v1/host/sales-tickets', { json: body });

const useCreateSalesTicket = () =>
  useMutation((body: PostCreateSalesTicketRequest) => postCreateSalesTicket(body));

export default useCreateSalesTicket;
