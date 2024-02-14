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

export type TicketType = 'SALE' | 'INVITE';

export type ReservationStatus =
  | 'WAITING_FOR_DEPOSIT'
  | 'CANCELLED'
  | 'RESERVATION_COMPLETED'
  | 'WAITING_FOR_REFUND'
  | 'REFUND_COMPLETED';

export interface ReservationResponse {
  /** 티켓 ID */
  ticketId: number;
  /** 티켓 유형 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 예매 ID */
  reservationId: number;
  /** 예매자 이름 */
  reservationName: string;
  /** 예매자 전화번호 */
  reservationPhoneNumber: string;
  /** 예매 상태 */
  reservationStatus: ReservationStatus;
  /** 티켓 가격 */
  ticketPrice: number;
  /** 결제 수단 */
  means: 'ACCOUNT_TRANSFER' | 'CARD';
  /** 티켓 발권일시 */
  ticketIssuedAt: string;
  /** 티켓 생성일시.아마 예매일과 동일 */
  ticketCreatedAt: string;
}

export interface PageReservationResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ReservationResponse[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ReservationSummaryResponse {
  salesTicketSoldCount: number;
  invitationTicketSoldCount: number;
  totalSoldCount: number;
  totalSalesAmount: number;
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
