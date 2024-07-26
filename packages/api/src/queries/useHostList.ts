import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useHostList = (showId: number) => useQuery(queryKeys.host.list(showId));

export default useHostList;
