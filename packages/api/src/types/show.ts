import { PageResponse, ReservationStatus, TicketStatus, TicketType } from './common';

export interface ShowImage {
  sequence: number;
  thumbnailPath: string;
  path: string;
}

export interface ShowPlace {
  name: string;
  streetAddress: string;
  detailAddress: string;
}

export interface ShowHost {
  name: string;
  phoneNumber: string;
}

export interface ShowResponse {
  id: number;
  name: string;
  images: ShowImage[];
  date: string;
  runningTime: number;
  place: ShowPlace;
  notice: string;
  host: ShowHost;
  isEnded: boolean;
  settlementStatus: 'SETTLEMENT_REQUIRED' | 'SETTLEMENT_REQUEST' | 'SETTLEMENT_DONE' | null;
}

export type ShowSummaryResponse = Array<{
  /** 공연 ID */
  id: number;
  /** 공연 이름 */
  title: string;
  /** 공연 포스터 이미지 경로(썸네일) */
  thumbnailPath: string;
  /** 공연 대표 호스트 ID */
  hostUserId: number;
  /** 공연 대표 호스트 이름 */
  hostName: string;
  /** 공연 판매 시작 날짜, 시간.ISO8601 */
  salesStartTime: string;
  /**공연 판매 종료 날짜, 시간.ISO8601 */
  salesEndTime: string;
  /** 공연 시작 날짜, 시간.ISO8601 */
  date: string;
  /** 러닝 타임.분 */
  runningTime: number;
  /** 공연 생성 시간.ISO8601. */
  createdAt: string;
  /** 공연 수정 시간.ISO8601 */
  modifiedAt: string;
}>;

export interface ShowSalesInfoResponse {
  showId: number;
  salesStartTime: string;
  salesEndTime: string;
  ticketNotice: string;
}

export interface ReservationResponse {
  /** 티켓 ID */
  ticketId: number;
  /** 티켓 유형 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 예매 ID */
  reservationId: number;
  /** 방문자 이름 */
  reservationName: string;
  /** 방문자 전화번호 */
  reservationPhoneNumber: string;
  /** 예매 상태 */
  reservationStatus: ReservationStatus;
  /** 티켓 가격 */
  ticketPrice: number;
  /** 티켓 상태 */
  ticketStatus: TicketStatus;
  /** 결제 수단 */
  means: 'ACCOUNT_TRANSFER' | 'CARD' | 'FREE' | 'SIMPLE_PAYMENT';
  /** 티켓 발권일시 */
  ticketIssuedAt: string;
  /** 티켓 생성일시.아마 예매일과 동일 */
  ticketCreatedAt: string;
  /** CS용(유저용) 예매 ID */
  csReservationId: string;
  /** CS용(유저용) 티켓 ID */
  csTicketId: string;
}

export type PageReservationResponse = PageResponse<ReservationResponse>;

export interface ReservationSummaryResponse {
  /** 판매 티켓 발권 수량 */
  salesTicketSoldCount: number;
  /** 초대 티켓 발권 수량 */
  invitationTicketSoldCount: number;
  /** 총 판매 티켓 수량 */
  totalSoldCount: number;
  /** 총 판매 금액 */
  totalSalesAmount: number;
  /** 발권 대기 건수 */
  waitCount: number;
  /** 발권 완료 건수 */
  completeCount: number;
  /** 발권 취소 건수 */
  cancelCount: number;
}

export type ShowSalesTicketResponse = {
  id: number;
  ticketName: string;
  price: number;
  quantity: number;
  totalForSale: number;
}[];

export type ShowInvitationTicketResponse = {
  id: number;
  ticketName: string;
  price: number;
  quantity: number;
  totalForSale: number;
}[];

export type ShowInvitationCodeListResponse = {
  id: number;
  code: string;
  used: boolean;
}[];

export interface ShowPreviewResponse {
  id: number;
  groupId: number;
  name: string;
  placeName: string;
  date: string;
  runningTime: number;
  streetAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  notice: string;
  managerCode: string;
  salesStartTime: string;
  salesEndTime: string;
  deletedAt: string;
  showImg: [
    {
      id: number;
      showId: number;
      path: string;
      thumbnailPath: string;
      sequence: number;
      createdAt: string;
      modifiedAt: string;
      removedAt: string;
    },
  ];
  hostName: string;
  hostPhoneNumber: string;
  reservationStatus: boolean;
}

export interface ShowSettlementInfoResponse {
  idCardPhotoFile: {
    url: string;
    fileName: string;
  } | null;
  settlementBankAccountPhotoFile: {
    url: string;
    fileName: string;
  } | null;
  bankAccount: {
    bankAccountHolder: string;
    bankAccountId: number;
    bankAccountNumber: string;
    bankCode: string;
    bankName: string;
  } | null;
}

export interface ShowSettlementEventResponse {
  showId: number;
  settlementEventId: number | null;
  settlementEventType: 'SEND' | 'REQUEST' | 'DONE' | null;
  triggeredAt: string | null;
}

export type SettlementBannersResponse = {
  showId: number;
  showName: string;
  bannerType: 'REQUIRED' | 'DONE';
}[];
