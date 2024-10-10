import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminInvitationTicketList = (showId: number) =>
  useQuery(queryKeys.adminTicket.invitationTickets(showId));

export default useSuperAdminInvitationTicketList;
