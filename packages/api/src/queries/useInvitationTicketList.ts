import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

interface UseInvitationTicketListOptions {
  refetchInterval?: number | false;
}

const useInvitationTicketList = (showId: number, options?: UseInvitationTicketListOptions) =>
  useQuery({
    ...queryKeys.show.invitationTicketList(showId),
    ...(options?.refetchInterval !== undefined && { refetchInterval: options.refetchInterval }),
  });

export default useInvitationTicketList;
