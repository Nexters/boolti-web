import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

import { fetcher } from './fetcher';
import {
  PageReservationResponse,
  ReservationStatus,
  ReservationSummaryResponse,
  ShowResponse,
  ShowSalesInfoResponse,
  ShowSummaryResponse,
  TicketType,
} from './types/show';
import { SettlementAccountInfoResponse, UserProfileSummaryResponse } from './types/users';

export interface Hello {
  hello: string;
}

export const showQueryKeys = createQueryKeys('show', {
  detail: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<ShowResponse>(`web/v1/host/shows/${showId}`),
  }),
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<ShowSummaryResponse>(`web/v1/host/shows`),
  },
  salesInfo: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<ShowSalesInfoResponse>(`web/v1/host/shows/${showId}/sales-infos`),
  }),
  reservationSummary: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ReservationSummaryResponse>(`web/v1/host/shows/${showId}/reservation-summaries`),
  }),
  reservation: (
    showId: number,
    reservationNameOrPhoneNumber: string | undefined = undefined,
    ticketType: TicketType | undefined = undefined,
    ticketStatus: ReservationStatus | undefined = undefined,
  ) => ({
    queryKey: [showId, reservationNameOrPhoneNumber, ticketType, ticketStatus],
    queryFn: ({ pageParam = 0 }) => {
      return fetcher.get<PageReservationResponse>(`web/v1/host/shows/${showId}/reservations`, {
        searchParams: {
          page: pageParam,
        },
      });
    },
  }),
});

export const userQueryKeys = createQueryKeys('user', {
  accountInfo: {
    queryKey: null,
    queryFn: () =>
      fetcher.get<SettlementAccountInfoResponse>(`web/v1/host/users/me/settlement-account-infos`),
  },
  summary: {
    queryKey: null,
    queryFn: () => fetcher.get<UserProfileSummaryResponse>(`web/v1/host/users/me/summaries`),
  },
});

export const queryKeys = mergeQueryKeys(showQueryKeys, userQueryKeys);
