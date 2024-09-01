import { PageResponse } from './common';
import { ReservationResponse, ReservationSummaryResponse } from './show';

export type AdminReservationSummaryResponse = ReservationSummaryResponse;
export type AdminReservationResponse = ReservationResponse & {
  /** 결제자 이름 */
  payerName: string;
  /** 결제자 연락처 */
  payerPhoneNumber: string;
  /** 결제 수단 */
  paymentMeans: string;
  /** 취소 일시 */
  canceledAt: string;
  /** 취소 사유 */
  cancelReason: string;
};
export type PageAdminReservationResponse = PageResponse<AdminReservationResponse>;
