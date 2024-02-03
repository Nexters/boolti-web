import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetcher } from './fetcher';
import { ShowResponse } from './types/show';

export interface Hello {
  hello: string;
}

export const queryKey = createQueryKeys('boolti', {
  hello: {
    queryKey: null,
    queryFn: () => fetcher.get<Hello>('/hello'),
  },
  showDetail: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<ShowResponse>(`web/v1/host/shows/${showId}`),
  }),
});
