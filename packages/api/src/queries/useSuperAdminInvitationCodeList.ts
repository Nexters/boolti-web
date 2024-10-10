import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminInvitationCodeList = (ticketId: number) =>
  useQuery(queryKeys.adminTicket.invitationTicketCodes(ticketId));

export default useSuperAdminInvitationCodeList;
