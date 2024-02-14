import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteInvitationTicket = (invitationTicketId: number) =>
  fetcher.delete(`web/v1/host/invitation-tickets/${invitationTicketId}`);

const useDeleteInvitationTicket = () =>
  useMutation((invitationTicketId: number) => deleteInvitationTicket(invitationTicketId));

export default useDeleteInvitationTicket;
