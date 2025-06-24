import { ShowCastTeamCreateOrUpdateRequest } from './cast';
import { PageResponse, PayementMeans, ReservationStatus, TicketStatus, TicketType } from './common';
import { HostType } from './host';

export interface ShowImage {
  /** 공연 포스터 이미지 순서. 1부터 시작. 최대 3개까지 가능. */
  sequence: number;
  /** 공연 포스터 이미지 썸네일 url */
  thumbnailPath: string;
  /** 공연 포스터 이미지 원본 url */
  path: string;
}

export interface Place {
  /** 장소 이름 */
  name: string;
  /** 장소 도로명 주소 */
  streetAddress: string;
  /** 장소 상세 주소 */
  detailAddress: string;
}

export interface Host {
  /** 호스트 이름 */
  name: string;
  /** 호스트 전화번호 (하이픈 없음) */
  phoneNumber: string;
}

export interface ShowResponse {
  id: number;
  name: string;
  images: ShowImage[];
  date: string;
  runningTime: number;
  place: Place;
  notice: string;
  host: Host;
  isEnded: boolean;
  settlementStatus: 'SETTLEMENT_REQUIRED' | 'SETTLEMENT_REQUEST' | 'SETTLEMENT_DONE' | null;
  createdAt: string;
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
  /** 나의 호스트 타입 */
  myHostType: HostType;
  /** 공연 판매 시작 날짜, 시간.ISO8601 */
  salesStartTime?: string;
  /**공연 판매 종료 날짜, 시간.ISO8601 */
  salesEndTime?: string;
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
  salesStartTime?: string;
  salesEndTime?: string;
  ticketNotice?: string;
}

export interface SalesTicketTypeResponseV2 {
  /** 판매 티켓 ID */
  id: number;
  /** 판매 티켓 타입 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 티켓 가격(장당) */
  price: number;
}

export interface TicketResponse {
  /** 티켓 ID */
  ticketId: number;
  /** cs용(유저용) 티켓 ID  */
  csTicketId: string;
  /** 판매 티켓 타입 정보. 만약 삭제된 경우 null */
  salesTicketType?: SalesTicketTypeResponseV2;
  /** 티켓 생성일시 */
  createdAt: string;
  /** 티켓 사용일시 */
  usedAt?: string;
}

export interface PaymentInfoResponse {
  /** 결제자 이름 초청일때는 없음 */
  payerName?: string;
  /** 결제자 전화번호 초청일때는 없음 */
  payerPhoneNumber?: string;
  /** 결제 수단 */
  means: PayementMeans;
}

export interface CancelInfoResponse {
  /** 취소 요청 사유 */
  cancelReason: string;
  /** 취소 요청 일시 */
  cancelRequestAt: string;
  /** 취소 완료 일시 */
  canceledAt: string;
}

export interface GiftResponseV2 {
  /** 선물 ID */
  id: number;
  /** 선물 수신 완료 여부 */
  done: boolean;
  /** 선물 생성 일시 */
  createdAt: string;
}

export interface ReservationHolderDetailResponse {
  /** 예매자 이름 */
  name: string;
  /** 예매자 전화번호 */
  phoneNumber: string;
}

export interface ReservationWithTicketsResponse {
  /** 예매 ID */
  reservationId: number;
  /** cs용(유저용) 예매 ID */
  csReservationId: number;
  /** 예매 결제 관리 상태 */
  paymentManagementStatus: TicketStatus;
  /** 선물 정보 선물이 아니면 null */
  gift?: GiftResponseV2;
  /** 판매 티켓 타입 정보. 만약 삭제된 경우 null */
  salesTicketType?: SalesTicketTypeResponseV2;
  /** 티켓 정보 목록. */
  tickets: TicketResponse[];
  /** 결제 정보. 초청 티켓일 경우 없음 */
  paymentInfo?: PaymentInfoResponse;
  /** 환불 정보 */
  cancelInfo?: CancelInfoResponse;
  /** 예매 생성 일시 */
  createdAt: string;
  /** 예매 수정 일시 */
  modifiedAt: string;
  /** 예매자 정보 */
  reservationHolderDetail: ReservationHolderDetailResponse;
}

export type PageReservationWithTicketsResponse = PageResponse<ReservationWithTicketsResponse>;

export type PageReservationResponse = PageResponse<ReservationResponse>;

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
  /** 티켓 취소일시 */
  canceledAt?: string;
  /** 티켓 취소 사유 */
  cancelReason?: string;
  /** 선물 여부 */
  giftReceived: true;
  /** CS용(유저용) 예매 ID */
  csReservationId: string;
  /** CS용(유저용) 티켓 ID */
  csTicketId: string;
}

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
  /** 판매 티켓 ID */
  id: number;
  /** 티켓 이름 */
  ticketName: string;
  /** 티켓 가격(장당) */
  price: number;
  /** 남은 티켓 수량. 재고 */
  quantity: number;
  /** 총 티켓 수량 */
  totalForSale: number;
  /** 최소 한번 이상 판매된 티켓이 있는지 여부 */
  soldAtLeastOnce: boolean;
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
  salesStartTime?: string;
  salesEndTime?: string;
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

export interface ShowCreateRequest {
  /** 공연 이름 */
  name: string;
  /** 공연 포스터 이미지 목록 */
  images: ShowImage[];
  /** 공연 시작 날짜, 시간. ISO8601. */
  date: string;
  /** 러닝 타임. 분 */
  runningTime: number;
  /** 장소 정보 */
  place: Place;
  /** 공지사항 (공연 상세) */
  notice: string;
  /** 호스트 정보 */
  host: Host;
  /** 판매 시작 시간. required. 시간은 0시 0분 0초 */
  salesStartTime: string;
  /** 판매 종료 시간. required. 시간은 23시 59분 59초 */
  salesEndTime: string;
  /** 티켓 구매시 안내사항. optional. */
  ticketNotice?: string;
  /** 생성할 판매 티켓 목록, invitationTickets 와 둘 중 1개는 필수 */
  salesTickets: {
    /** 티켓 이름. required. 20자 이내 */
    ticketName: string;
    /** 티켓 가격(장당), required. 1 이상 */
    price: number;
    /** 티켓 수량, required. 1 이상 */
    totalForSale: number;
  }[];
  /** 생성할 초대 티켓 목록, salesTickets 와 둘 중 1개는 필수 */
  invitationTickets: {
    /** 티켓 이름. required. 20자 이내 */
    ticketName: string;
    /** 티켓 수량, required. 1 이상 */
    totalForSale: number;
  }[];
  /** 출연진 팀 */
  castTeams?: Array<ShowCastTeamCreateOrUpdateRequest>;
  /** 위도 */
  latitude?: number;
  /** 경도 */
  longitude?: number;
}

export interface NonTicketingShowCreateRequest {
  /** 공연 이름 */
  name: string;
  /** 공연 포스터 이미지 목록 */
  images: ShowImage[];
  /** 공연 시작 날짜, 시간. ISO8601. */
  date: string;
  /** 러닝 타임. 분 */
  runningTime: number;
  /** 장소 정보 */
  place: Place;
  /** 공지사항 (공연 상세) */
  notice: string;
  /** 호스트 정보 */
  host: Host;
  /** 출연진 팀 */
  castTeams?: Array<ShowCastTeamCreateOrUpdateRequest>;
  /** 위도 */
  latitude?: number;
  /** 경도 */
  longitude?: number;
  /** 티켓 미진행 공연 여부 */
  isNonTicketing: boolean;
}

export interface SummaryItem {
  /** 수수료 */
  fee: number;

  /** 정산 금액 */
  settlementAmount: number;
}

export interface ShowSettlementSummaryResponse {
  /** 결제 금액 */
  salesAmount: number;
  /** 최종. 정산 내역서가 발행되지 않았으면 null. */
  expected?: SummaryItem;
  /** 최종. 정산 내역서가 발행되지 않았으면 null. */
  actual?: SummaryItem;
}
