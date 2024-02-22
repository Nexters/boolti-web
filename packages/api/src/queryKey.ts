import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { SearchParamsOption } from 'ky';

import { fetcher } from './fetcher';
import {
  EntranceInfoResponse,
  EntranceSummaryResponse,
  PageEntranceResponse,
  PageReservationResponse,
  ReservationSummaryResponse,
  ShowInvitationCodeListResponse,
  ShowInvitationTicketResponse,
  ShowResponse,
  ShowSalesInfoResponse,
  ShowSalesTicketResponse,
  ShowSummaryResponse,
  TicketStatus,
  TicketType,
} from './types';
import { SettlementAccountInfoResponse, UserProfileSummaryResponse } from './types/users';

export const entranceQueryKeys = createQueryKeys('enterance', {
  list: (
    showId: number,
    page: number,
    isEntered: boolean,
    ticketType?: TicketType,
    reservationNameOrPhoneNumber?: string,
  ) => ({
    queryKey: [showId, page, ticketType, isEntered, reservationNameOrPhoneNumber],
    queryFn: () => {
      const searchParams: SearchParamsOption = {
        page,
        isEntered,
      };
      if (ticketType) {
        searchParams.ticketType = ticketType;
      }
      if (reservationNameOrPhoneNumber) {
        searchParams.reservationNameOrPhoneNumber = reservationNameOrPhoneNumber;
      }
      return fetcher.get<PageEntranceResponse>(`web/v1/shows/${showId}/entrances`, {
        searchParams,
      });
    },
  }),
  summary: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<EntranceSummaryResponse>(`web/v1/shows/${showId}/entrance-summaries`),
  }),
  info: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<EntranceInfoResponse>(`web/v1/shows/${showId}/entrance-infos`),
  }),
});

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
    page: number,
    ticketType: TicketType | undefined = undefined,
    ticketStatus: TicketStatus | undefined = undefined,
    reservationNameOrPhoneNumber?: string,
  ) => ({
    queryKey: [showId, page, reservationNameOrPhoneNumber, ticketType, ticketStatus],
    queryFn: () => {
      const searchParams: SearchParamsOption = {
        page,
      };
      if (ticketType) {
        searchParams.ticketType = ticketType;
      }
      if (ticketStatus) {
        searchParams.ticketStatus = ticketStatus;
      }
      if (reservationNameOrPhoneNumber) {
        searchParams.reservationNameOrPhoneNumber = reservationNameOrPhoneNumber;
      }
      return fetcher.get<PageReservationResponse>(`web/v1/host/shows/${showId}/reservations`, {
        searchParams,
      });
    },
  }),
  salesTicketList: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ShowSalesTicketResponse>(`web/v1/host/shows/${showId}/sales-tickets`),
  }),
  invitationTicketList: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ShowInvitationTicketResponse>(`web/v1/host/shows/${showId}/invitation-tickets`),
  }),
  invitationCodeList: (invitationTicketId: number) => ({
    queryKey: [invitationTicketId],
    queryFn: () =>
      fetcher.get<ShowInvitationCodeListResponse>(
        `web/v1/host/invitation-tickets/${invitationTicketId}/invitation-codes`,
      ),
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

export const queryKeys = mergeQueryKeys(showQueryKeys, userQueryKeys, entranceQueryKeys);
