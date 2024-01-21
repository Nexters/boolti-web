import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetcher } from './fetcher';

export interface Hello {
  hello: string;
}

export const queryKey = createQueryKeys('boolti', {
  hello: {
    queryKey: null,
    queryFn: () => fetcher.get<Hello>('/hello'),
  },
});
