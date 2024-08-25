import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminEntranceInfo = (showId: number) => useQuery(queryKeys.adminShow.entranceInfo(showId));

export default useAdminEntranceInfo;
