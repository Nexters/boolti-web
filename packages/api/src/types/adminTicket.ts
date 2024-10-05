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
