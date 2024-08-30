import { PageResponse } from './common';
import { ReservationResponse, ReservationSummaryResponse } from './show';

export type AdminReservationSummaryResponse = ReservationSummaryResponse;
export type AdminReservationResponse = ReservationResponse;
export type PageAdminReservationResponse = PageResponse<AdminReservationResponse>;
