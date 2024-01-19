import { QueryClientProvider as BaseQueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
export { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
}

export function Hello() {
  return 'World';
}
