import { useQuery } from '@tanstack/react-query';
import { queryKey } from './queryKey';
import { TypedUseQueryOptions } from '@lukemorales/query-key-factory';

export function useHelloQuery(options?: TypedUseQueryOptions<typeof queryKey.hello>) {
  return useQuery({
    ...options,
    ...queryKey.hello,
  });
}
