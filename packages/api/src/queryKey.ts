import { createQueryKeys } from '@lukemorales/query-key-factory';

import { fetcher } from './fetcher';
import { ShowResponse, ShowSalesInfoResponse } from './types/show';
import { SettlementAccountInfoResponse, UserProfileSummaryResponse } from './types/users';

export interface Hello {
  hello: string;
}

export const queryKey = createQueryKeys('boolti', {
  showDetail: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<ShowResponse>(`web/v1/host/shows/${showId}`),
  }),
  showSalesInfo: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<ShowSalesInfoResponse>(`web/v1/host/shows/${showId}/sales-infos`),
  }),
  userAccountInfo: {
    queryKey: null,
    queryFn: () =>
      fetcher.get<SettlementAccountInfoResponse>(`web/v1/host/users/me/settlement-account-infos`),
  },
  userSummary: {
    queryKey: null,
    queryFn: () => fetcher.get<UserProfileSummaryResponse>(`web/v1/host/users/me/summaries`),
  },
});
