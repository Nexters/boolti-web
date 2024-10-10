import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteInvitationTicket = (ticketId: number) =>
  fetcher.delete(`sa-api/v1/sales-tickets/${ticketId}`);

const useSuperAdminDeleteSalesTicket = () =>
  useMutation((ticketId: number) => deleteInvitationTicket(ticketId));

export default useSuperAdminDeleteSalesTicket;
