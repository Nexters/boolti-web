import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteInvitationTicket = (ticketId: number) =>
  fetcher.delete(`sa-api/v1/invitation-tickets/${ticketId}`);

const useSuperAdminDeleteInvitationTicket = () =>
  useMutation((ticketId: number) => deleteInvitationTicket(ticketId));

export default useSuperAdminDeleteInvitationTicket;
