import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { ShowCastTeamReadResponse } from '../types';

const useCastTeamList = (showId: number) => useQuery({
  ...queryKeys.castTeams.list(showId),
  select: (data: ShowCastTeamReadResponse[]) => {
    return data.map((team, index) => ({
      ...team,
      index
    }));
  }
});

export default useCastTeamList;
