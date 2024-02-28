import { PageResponse, TicketType } from './common';

export interface EntranceResponse {
  /** 티켓 ID */
  ticketId: number;
  /** 티켓 타입 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 예매자 이름 */
  reservationName: string;
  /** 예매자 연락처 */
  reservationPhoneNumber: string;
  /** 입장 여부 */
  entered: boolean;
  /** 입장 시각 */
  enteredAt: string;
  /** CS용(유저용) 티켓 ID */
  csTicketId: string;
}

export type PageEntranceResponse = PageResponse<EntranceResponse>;

export interface EntranceSummaryResponse {
  notEnteredTicketCount: number;
  enteredTicketCount: number;
  totalTicketCount: number;
}

export interface EntranceInfoResponse {
  /** 관리자 입장 코드 */
  managerCode: string;
}
