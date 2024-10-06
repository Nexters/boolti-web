import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useCastTeamList = (showId: number) => useQuery(queryKeys.castTeams.list(showId));

export default useCastTeamList;
