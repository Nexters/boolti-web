import { PageResponse, TicketType } from './common';

export interface AdminEntranceSummaryResponse {
  notEnteredTicketCount: number;
  enteredTicketCount: number;
  totalTicketCount: number;
}

export interface AdminEntranceInfoResponse {
  /** 관리자 입장 코드 */
  managerCode: string;
}

export interface AdminEntranceResponse {
  /** 티켓 ID */
  ticketId: number;
  /** 티켓 타입 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 방문자 이름 */
  reservationName: string;
  /** 방문자 연락처 */
  reservationPhoneNumber: string;
  /** 입장 여부 */
  entered: boolean;
  /** 입장 시각 */
  enteredAt: string;
  /** CS용(유저용) 티켓 ID */
  csTicketId: string;
}

export type PageAdminEntranceResponse = PageResponse<AdminEntranceResponse>;
