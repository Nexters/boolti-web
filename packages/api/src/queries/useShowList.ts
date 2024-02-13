import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowList = () => useQuery(queryKeys.show.list);

export default useShowList;
