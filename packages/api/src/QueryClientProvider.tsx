import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 5000,
            useErrorBoundary: true,
          },
        },
      }),
  );

  return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
}
