import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useInvitationCodeList = (showId: number) =>
  useQuery(queryKeys.show.invitationCodeList(showId));

export default useInvitationCodeList;
