import { useQuery } from '@tanstack/react-query';

import { queryKey } from '../queryKey';

const useShowDetail = (showId: number) => useQuery(queryKey.showDetail(showId));

export default useShowDetail;
