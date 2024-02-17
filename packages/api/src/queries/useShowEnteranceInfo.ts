import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowEnteranceInfo = (showId: number) => useQuery(queryKeys.enterance.info(showId));

export default useShowEnteranceInfo;
