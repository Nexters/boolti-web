import { PageResponse } from './common';
import { ShowResponse } from './show';

export type SuperAdminShowStatus =
  | 'SALES_BEFORE'
  | 'SALES_IN_PROGRESS'
  | 'SALES_END'
  | 'SETTLEMENT_REQUIRED'
  | 'SETTLEMENT_IN_PROGRESS'
  | 'SETTLEMENT_DONE';

export interface AdminShowInfoResponse {
  /** 공연 ID */
  id: number;
  /** 공연 이름 */
  showName: string;
  /** 공연 상태.슈퍼어드민에서만 사용. */
  superAdminShowStatus: SuperAdminShowStatus;
  /** 공연 포스터 이미지 경로(썸네일) */
  thumbnailPath?: string;
  /** 공연 대표 호스트 ID */
  hostUserId: number;
  /** 공연 대표 호스트 이름 */
  hostName: string;
  /** 공연 시작 날짜, 시간.ISO8601. */
  date: string;
  /** 공연 판매 시작 날짜, 시간.ISO8601.optional */
  salesStartTime?: string;
  /** 공연 판매 종료 날짜, 시간.ISO8601.optional */
  salesEndTime?: string;
}

export type AdminShowResponse = PageResponse<AdminShowInfoResponse>;

export interface SettlementInfoResponse {
  idCardPhotoFile: {
    url: string;
    fileName: string;
  } | null;
  settlementBankAccountPhotoFile: {
    url: string;
    fileName: string;
  } | null;
  bankAccount: {
    bankAccountId: number;
    bankName: string;
    bankCode: string;
    bankAccountNumber: string;
    bankAccountHolder: string;
  } | null;
}

export interface SettlementEventResponse {
  SEND: string | null;
  REQUEST: string | null;
  DONE: string | null;
}

export type TicketSalesInfo = {
  salesTicketId: number;
  ticketType: string;
  ticketName: string;
  price: number;
  salesCount: number;
  amount: number;
}[];

export type TicketSalesInfoResponse = TicketSalesInfo;

export type AdminShowDetailResponse = ShowResponse;
