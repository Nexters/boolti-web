import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useMyHostInfo = (showId: number) => useQuery(queryKeys.host.me(showId));

export default useMyHostInfo;
