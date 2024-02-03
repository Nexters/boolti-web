import { queryKey } from '../queryKey';
import { useQuery } from '@tanstack/react-query';

const useShowDetail = (showId: number) => useQuery(queryKey.showDetail(showId));

export default useShowDetail;
