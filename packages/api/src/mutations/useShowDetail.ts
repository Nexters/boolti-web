import { queryKey } from '../queryKey';
import { useQuery } from '@tanstack/react-query';

const useShow = (showId: number) => useQuery(queryKey.showDetail(showId));

export default useShow;
