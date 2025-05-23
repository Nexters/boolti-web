import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { SearchParamsOption } from 'ky';

import { fetcher, instance } from './fetcher';
import {
  EntranceInfoResponse,
  EntranceSummaryResponse,
  PageEntranceResponse,
  PageReservationResponse,
  PageReservationWithTicketsResponse,
  ReservationSummaryResponse,
  SalesTicketTypeResponseV2,
  SettlementBannersResponse,
  ShowCastTeamReadResponse,
  ShowInvitationCodeListResponse,
  ShowInvitationTicketResponse,
  ShowPreviewResponse,
  ShowResponse,
  ShowSalesInfoResponse,
  ShowSalesTicketResponse,
  ShowSettlementEventResponse,
  ShowSettlementInfoResponse,
  ShowSettlementSummaryResponse,
  ShowSummaryResponse,
  TicketStatus,
  TicketType,
  Popup,
  PopupViewType,
} from './types';
import {
  AdminShowDetailResponse,
  AdminShowInfoResponse,
  AdminShowResponse,
  SettlementEventResponse,
  SettlementInfoResponse,
  SuperAdminShowStatus,
  TicketSalesInfoResponse,
} from './types/adminShow';
import {
  BankAccountListResponse,
  UserProfileResponse,
  UserProfileSummaryResponse,
} from './types/users';
import { GiftInfoResponse } from './types/gift';
import { HostListItem, HostListResponse } from './types/host';
import {
  AdminEntranceInfoResponse,
  AdminEntranceSummaryResponse,
  PageAdminEntranceResponse,
} from './types/adminEntrance';
import {
  AdminReservationSummaryResponse,
  PageAdminReservationResponse,
  ReservationSummaryResponseV2,
} from './types/adminReservation';
import {
  AdminTicketSalesInfoResponse,
  PageTicketWithReservationResponse,
  SuperAdminInvitationCodeListResponse,
  SuperAdminInvitationTicketListResponse,
  SuperAdminSalesTicketListResponse,
} from './types/adminTicket';

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

export const adminShowQueryKeys = createQueryKeys('adminShow', {
  list: (
    page = 0,
    size = 10,
    showNameOrHostName?: string,
    superAdminShowStatus?: SuperAdminShowStatus,
    sort: string[] = [],
  ) => ({
    queryKey: [page, size, showNameOrHostName, superAdminShowStatus, JSON.stringify(sort)],
    queryFn: () => {
      const searchParams: SearchParamsOption = {
        page,
        size,
        sort: JSON.stringify(sort),
      };
      if (showNameOrHostName) {
        searchParams.showNameOrHostName = showNameOrHostName;
      }
      if (superAdminShowStatus) {
        searchParams.superAdminShowStatus = superAdminShowStatus;
      }
      return fetcher.get<AdminShowResponse>(`sa-api/v1/shows`, {
        searchParams,
      });
    },
  }),
  settlementInfo: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<SettlementInfoResponse>(`sa-api/v1/shows/${showId}/settlement-infos`),
  }),
  settlementEvent: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<SettlementEventResponse>(`sa-api/v1/shows/${showId}/settlement-events/each-last`),
  }),
  settlementStatement: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => instance.get(`sa-api/v1/shows/${showId}/settlement-statements/last/file`).blob(),
  }),
  ticketSalesInfo: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<TicketSalesInfoResponse>(`sa-api/v1/shows/${showId}/ticket-sales-infos`),
  }),
  showDetail: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<AdminShowDetailResponse>(`sa-api/v1/shows/${showId}`),
  }),
  info: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<AdminShowInfoResponse>(`sa-api/v1/shows/${showId}/super-admin-infos`),
  }),
});

export const adminEntranceQueryKeys = createQueryKeys('adminEntrance', {
  summary: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<AdminEntranceSummaryResponse>(`sa-api/v1/shows/${showId}/entrance-summaries`),
  }),
  info: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<AdminEntranceInfoResponse>(`sa-api/v1/shows/${showId}/entrance-infos`),
  }),
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
      return fetcher.get<PageAdminEntranceResponse>(`sa-api/v1/shows/${showId}/entrances`, {
        searchParams,
      });
    },
  }),
});

export const adminReservationQueryKeys = createQueryKeys('adminReservation', {
  list: (
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
      return fetcher.get<PageAdminReservationResponse>(`sa-api/v1/shows/${showId}/reservations`, {
        searchParams,
      });
    },
  }),
  summary: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<AdminReservationSummaryResponse>(
        `sa-api/v1/shows/${showId}/reservation-summaries`,
      ),
  }),
  summaryV2: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ReservationSummaryResponseV2>(`web/v2/shows/${showId}/reservation-summaries`),
  }),
});

export const adminTicketQueryKeys = createQueryKeys('adminTicket', {
  salesInfo: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<AdminTicketSalesInfoResponse>(`sa-api/v1/shows/${showId}/sales-infos`),
  }),
  salesTickets: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<SuperAdminSalesTicketListResponse>(`sa-api/v1/shows/${showId}/sales-tickets`),
  }),
  invitationTickets: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<SuperAdminInvitationTicketListResponse>(
        `sa-api/v1/shows/${showId}/invitation-tickets`,
      ),
  }),
  invitationTicketCodes: (ticketId: number) => ({
    queryKey: [ticketId],
    queryFn: () =>
      fetcher.get<SuperAdminInvitationCodeListResponse>(
        `sa-api/v1/invitation-tickets/${ticketId}/invitation-codes`,
      ),
  }),
  salesTicketList: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<SalesTicketTypeResponseV2[]>(`web/v1/host/shows/${showId}/sales-tickets`),
  }),
  ticketList: (
    showId: number,
    page: number,
    reservationNameOrPhoneNumber: string,
    salesTicketTypeId: string[],
    isUsed?: boolean,
  ) => ({
    queryKey: [showId, page, reservationNameOrPhoneNumber, salesTicketTypeId, isUsed],
    queryFn: () => {
      const searchParams: SearchParamsOption = {
        page,
        reservationNameOrPhoneNumber,
        salesTicketTypeId: salesTicketTypeId.join(','),
      };
      if (typeof isUsed !== 'undefined') {
        searchParams.isUsed = isUsed;
      }
      return fetcher.get<PageTicketWithReservationResponse>(`web/v1/shows/${showId}/tickets`, {
        searchParams,
      });
    },
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
  reservationWithTickets: (
    showId: number,
    page: number,
    ticketType: TicketType | undefined = undefined,
    paymentManagementStatus: TicketStatus | undefined = undefined,
    reservationNameOrPhoneNumber?: string,
  ) => ({
    queryKey: [showId, page, reservationNameOrPhoneNumber, ticketType, paymentManagementStatus],
    queryFn: () => {
      const searchParams: SearchParamsOption = {
        page,
      };
      if (ticketType) {
        searchParams.ticketType = ticketType;
      }
      if (paymentManagementStatus) {
        searchParams.paymentManagementStatus = paymentManagementStatus;
      }
      if (reservationNameOrPhoneNumber) {
        searchParams.reservationNameOrPhoneNumber = reservationNameOrPhoneNumber;
      }
      return fetcher.get<PageReservationWithTicketsResponse>(
        `web/v2/shows/${showId}/reservations`,
        {
          searchParams,
        },
      );
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
  preview: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<ShowPreviewResponse>(`web/papi/v1/shows/${showId}`),
  }),
  settlementInfo: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ShowSettlementInfoResponse>(`web/v1/host/shows/${showId}/settlement-infos`),
  }),
  settlementStatement: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      instance.get(`web/v1/host/shows/${showId}/settlement-statements/last/file`).blob(),
  }),
  lastSettlementEvent: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ShowSettlementEventResponse>(
        `web/v1/host/shows/${showId}/settlement-events/last`,
      ),
  }),
  settlementBanners: {
    queryKey: null,
    queryFn: () => fetcher.get<SettlementBannersResponse>(`web/v1/host/settlement-banners`),
  },
  settlementSummary: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ShowSettlementSummaryResponse>(`web/v1/shows/${showId}/settlement-summaries`),
  }),
});

export const userQueryKeys = createQueryKeys('user', {
  profile: {
    queryKey: null,
    queryFn: () => fetcher.get<UserProfileResponse>('web/v1/users/me'),
  },
  summary: {
    queryKey: null,
    queryFn: () => fetcher.get<UserProfileSummaryResponse>(`web/v1/host/users/me/summaries`),
  },
  bankAccountList: {
    queryKey: null,
    queryFn: () => fetcher.get<BankAccountListResponse>(`web/v1/host/users/me/bank-accounts`),
  },
  userCode: (userCode: string) => ({
    queryKey: [userCode],
    queryFn: () => fetcher.get<UserProfileResponse>(`web/papi/v1/users/${userCode}`),
  }),
});

export const giftQueryKeys = createQueryKeys('gift', {
  info: (giftId: string) => ({
    queryKey: [giftId],
    queryFn: () => fetcher.get<GiftInfoResponse>(`web/papi/v1/gift/${giftId}`),
  }),
});

export const hostQueryKeys = createQueryKeys('host', {
  list: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<HostListResponse>(`web/v1/shows/${showId}/hosts`),
  }),
  me: (showId: number) => ({
    queryKey: [showId],
    queryFn: () => fetcher.get<HostListItem>(`web/v1/shows/${showId}/hosts/me`),
  }),
});

export const castTeamQueryKeys = createQueryKeys('castTeams', {
  list: (showId: number) => ({
    queryKey: [showId],
    queryFn: () =>
      fetcher.get<ShowCastTeamReadResponse[]>(`web/papi/v1/shows/${showId}/cast-teams`),
  }),
});

export const popupQueryKeys = createQueryKeys('popup', {
  info: (view: PopupViewType) => ({
    queryKey: [view],
    queryFn: () => fetcher.get<Popup>(`web/papi/v1/popup/${view}`),
  }),
});

export const queryKeys = mergeQueryKeys(
  adminShowQueryKeys,
  adminEntranceQueryKeys,
  adminReservationQueryKeys,
  adminTicketQueryKeys,
  showQueryKeys,
  userQueryKeys,
  entranceQueryKeys,
  giftQueryKeys,
  hostQueryKeys,
  castTeamQueryKeys,
  popupQueryKeys,
);
