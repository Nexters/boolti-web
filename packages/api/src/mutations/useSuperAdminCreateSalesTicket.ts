import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminCreateSalesTicketRequest } from '../types/adminTicket';

const postCreateSalesTicket = (body: SuperAdminCreateSalesTicketRequest) =>
  fetcher.post('sa-api/v1/sales-tickets', { json: body });

const useSuperAdminCreateSalesTicket = () =>
  useMutation((body: SuperAdminCreateSalesTicketRequest) => postCreateSalesTicket(body));

export default useSuperAdminCreateSalesTicket;
