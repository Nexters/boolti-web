import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowDetail = (showId: number) => useQuery(queryKeys.show.detail(showId));

export default useShowDetail;
