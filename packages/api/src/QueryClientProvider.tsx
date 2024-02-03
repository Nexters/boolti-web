import { QueryClientProvider as BaseQueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BooltiHTTPError from './BooltiHTTPError';

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            useErrorBoundary: (error) => {
              // 인증 관련 에러일 때만 ErrorBoundary를 사용한다.
              return error instanceof BooltiHTTPError && error.status === 401;
            },
          },
        },
      }),
  );

  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </BaseQueryClientProvider>
  );
}
