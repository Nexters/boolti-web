import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminEntranceInfo = (showId: number) => useQuery(queryKeys.adminEntrance.info(showId));

export default useAdminEntranceInfo;
