import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useInvitationTicketList = (showId: number) =>
  useQuery(queryKeys.show.invitationTicketList(showId));

export default useInvitationTicketList;
