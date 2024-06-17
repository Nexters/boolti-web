import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminShowDetail = (showId: number) => useQuery(queryKeys.adminShow.showDetail(showId));

export default useAdminShowDetail;
