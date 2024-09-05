export type TicketType = 'SALE' | 'INVITE';

export type ReservationStatus =
  | 'WAITING_FOR_DEPOSIT'
  | 'WAITING_FOR_CARD_PAYMENT'
  | 'WAITING_FOR_SIMPLE_PAYMENT'
  | 'CANCELLED'
  | 'RESERVATION_COMPLETED'
  | 'WAITING_FOR_REFUND'
  | 'REFUND_COMPLETED';

export type TicketStatus = 'COMPLETE' | 'WAIT' | 'CANCEL';

export interface PageResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
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

export interface PostUploadUrlResponse {
  uploadUrl: string;
  expectedUrl: string;
}
