import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowPreview = (showId: number) => useQuery(queryKeys.show.preview(showId));

export default useShowPreview;
