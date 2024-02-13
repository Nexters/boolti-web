import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowSalesInfo = (showId: number) => useQuery(queryKeys.show.salesInfo(showId));

export default useShowSalesInfo;
