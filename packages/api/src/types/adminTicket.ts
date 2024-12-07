import { PageResponse, TicketType } from './common';

export interface AdminTicketSalesInfoResponse {
  /** 공연 ID */
  showId: number;
  /** 판매 시작일 */
  salesStartTime: string;
  /** 판매 종료일 */
  salesEndTime: string;
  /** 안내사항 */
  ticketNotice: string;
}

interface SuperAdminSalesTicketListItem {
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
}

export type SuperAdminSalesTicketListResponse = Array<SuperAdminSalesTicketListItem>;

interface SuperAdminInvitationTicketListItem {
  /** 판매 티켓 ID */
  id: number;
  /** 티켓 이름 */
  ticketName: string;
  /** 남은 티켓 수량. 재고 */
  quantity: number;
  /** 총 티켓 수량 */
  totalForSale: number;
}

export type SuperAdminInvitationTicketListResponse = Array<SuperAdminInvitationTicketListItem>;

interface SuperAdminInvitationCodeListItem {
  id: number;
  code: string;
  used: boolean;
}

export type SuperAdminInvitationCodeListResponse = Array<SuperAdminInvitationCodeListItem>;

export interface SuperAdminCreateSalesTicketRequest {
  showId: number;
  ticketName: string;
  price: number;
  totalForSale: number;
}

export interface SuperAdminCreateInvitationTicketRequest {
  showId: number;
  ticketName: string;
  totalForSale: number;
}

export interface SuperAdminEditSalesInfoRequest {
  showId: number;
  salesStartTime: string;
  salesEndTime: string;
  ticketNotice: string;
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

export interface ReservationHolderDetailResponse {
  /** 예매자 이름 */
  name: string;
  /** 예매자 전화번호 */
  phoneNumber: string;
}

export interface ReservationResponseV2 {
  /** 예매 ID */
  id: number;
  /** CS용 예매 ID */
  csReservationId: number;
  /** 예매자 정보 */
  reservationHolder: ReservationHolderDetailResponse;
}

export interface TicketWithReservationResponse {
  /** 티켓 ID */
  id: number;
  /** CS용 티켓 ID */
  csTicketId: string;
  /** 예매 정보 */
  reservation: ReservationResponseV2;
  /** 판매 티켓 타입 정보 */
  salesTicketType: SalesTicketTypeResponseV2;
  /** 입장 일시 */
  usedAt?: string;
  /** 티켓 생성 일시 */
  createdAt: string;
}

export type PageTicketWithReservationResponse = PageResponse<TicketWithReservationResponse>;
