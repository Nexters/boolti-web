import { useQuery } from '@tanstack/react-query';

import { queryKey } from '../queryKey';

const useShowSalesInfo = (showId: number) => useQuery(queryKey.showSalesInfo(showId));

export default useShowSalesInfo;
