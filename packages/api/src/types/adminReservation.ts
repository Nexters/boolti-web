import { PageResponse } from './common';
import { ReservationResponse, ReservationSummaryResponse } from './show';

export type AdminReservationSummaryResponse = ReservationSummaryResponse;
export type AdminReservationResponse = ReservationResponse & {
  /** 결제자 이름 */
  payerName: string;
  /** 결제자 연락처 */
  payerPhoneNumber: string;
  /** 결제 수단 */
  means: string;
  /** 선물 예매 여부 */
  giftReceived: boolean;
  /** 취소 일시 */
  canceledAt: string;
  /** 취소 사유 */
  cancelReason: string;
};
export type PageAdminReservationResponse = PageResponse<AdminReservationResponse>;

export interface ReservationSummaryResponseV2 {
  /** 총 발권 티켓 수량 */
  totalReservedTicketCount: number;
  /** 총 결제 금액 */
  totalPaymentAmount: number;
  /** 총 예매 건수 */
  totalReservationCount: number;
  /** 결제 대기 예매 건수 */
  waitedReservationCount: number;
  /** 결제 완료 예매 건수 */
  completedReservationCount: number;
  /** 결제 취소 예매 건수 */
  cancelledReservationCount: number;
}
