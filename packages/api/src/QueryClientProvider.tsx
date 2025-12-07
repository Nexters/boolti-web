import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();

  return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
}
