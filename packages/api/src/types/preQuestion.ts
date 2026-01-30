import { PageResponse, TicketType } from './common';

/** 사전 질문 생성 요청 항목 */
export interface PreQuestionCreateRequest {
  /** 질문 텍스트 (필수, 100자 이내) */
  questionText: string;
  /** 질문 설명 (선택, 100자 이내) */
  description?: string;
  /** 필수 질문 여부 */
  isRequired: boolean;
  /** 질문 순서, 1부터 시작 */
  sequence: number;
}

/** 사전 질문 항목 (GET 응답용) */
export interface PreQuestionItem {
  /** 사전질문 ID */
  id: number;
  /** 질문 내용 */
  question: string;
  /** 질문 설명 */
  description?: string;
  /** 필수 질문 여부 */
  isRequired: boolean;
  /** 질문 순서 */
  sequence: number;
}

/** 사전질문 목록 + 전체 답변 수 응답 */
export interface PreQuestionsResponse {
  /** 사전 질문 목록 */
  preQuestions: PreQuestionItem[];
  /** 전체 답변 수 */
  totalAnswerCount: number;
}

/** 사전질문 일괄 수정 요청 */
export interface PreQuestionsUpdateRequest {
  preQuestions: {
    /** 사전질문 ID (신규 생성 시 undefined) */
    id?: number;
    /** 질문 텍스트 (필수, 100자 이내) */
    questionText: string;
    /** 질문 설명 (선택, 100자 이내) */
    description?: string;
    /** 필수 질문 여부 */
    isRequired: boolean;
    /** 질문 순서, 1부터 시작 */
    sequence: number;
  }[];
}

/** 질문 1개에 대한 답변 항목 */
export interface PreQuestionAnswerItem {
  /** 사전 질문 답변 ID */
  id: number;
  /** 사전 질문 ID */
  preQuestionId: number;
  /** 유저 ID */
  userId: number;
  /** 예매자명 */
  reservationName: string;
  /** 판매 티켓 타입 ID */
  salesTicketTypeId: number;
  /** 판매 티켓 타입 이름 */
  salesTicketTypeName: string;
  /** 예약 ID */
  reservationId: number;
  /** 예약 티켓 수량 */
  ticketCount: number;
  /** 답변 */
  answer: string;
  /** 생성일시 */
  createdAt: string;
  /** 수정일시 */
  modifiedAt: string;
}

/** 질문 1개 답변 목록 응답 (페이징) */
export type PagePreQuestionAnswerResponse = PageResponse<PreQuestionAnswerItem>;

/** 참여자(예약 단위) 항목 */
export interface PreQuestionParticipantItem {
  /** 예매 ID */
  reservationId: number;
  /** cs용(유저용) 예매 ID */
  csReservationId: string;
  /** 예매자 이름 */
  reservationName: string;
  /** 예매자 전화번호 */
  reservationPhoneNumber: string;
  /** 티켓 타입 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 티켓 수량 */
  ticketCount: number;
  /** 답변 완료 여부 */
  answered: boolean;
  /** 예매 일시 */
  createdAt: string;
}

/** 참여자 목록 응답 (페이징) */
export type PagePreQuestionParticipantResponse = PageResponse<PreQuestionParticipantItem>;

/** 참여자별 답변 상세 항목 */
export interface PreQuestionAnswerDetailItem {
  /** 사전질문 ID */
  preQuestionId: number;
  /** 질문 내용 */
  question: string;
  /** 답변 내용 (미응답 시 null) */
  answer: string | null;
}

/** 참여자 단건 상세 응답 */
export interface PreQuestionParticipantDetailResponse {
  /** 예매 ID */
  reservationId: number;
  /** cs용(유저용) 예매 ID */
  csReservationId: string;
  /** 예매자 이름 */
  reservationName: string;
  /** 예매자 전화번호 */
  reservationPhoneNumber: string;
  /** 티켓 타입 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
  /** 티켓 수량 */
  ticketCount: number;
  /** 예매 일시 */
  createdAt: string;
  /** 질문별 답변 목록 */
  answers: PreQuestionAnswerDetailItem[];
}

/** 판매+초청 티켓 요약 항목 */
export interface SalesTicketTypeSummaryItem {
  /** 티켓 ID */
  id: number;
  /** 티켓 타입 */
  ticketType: TicketType;
  /** 티켓 이름 */
  ticketName: string;
}

/** 판매+초청 티켓 요약 목록 응답 */
export type SalesTicketTypesSummaryResponse = SalesTicketTypeSummaryItem[];
