import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostSettlementStatementRequestBody {
  showName: string;
  hostName: string;
  settlementBankInfo: {
    bankCode: string;
    bankAccountNumber: string;
    bankAccountHolder: string;
  };
  businessLicenseNumber: string;
  salesAmount: number;
  salesItems: {
    salesTicketTypeId: number;
    amount: number;
  }[];
  fee: number;
  feeItems: {
    feeType: 'BROKERAGE_FEE' | 'PAYMENT_AGENCY_FEE';
    amount: number;
  }[];
  vat: number;
  roundAmount: number;
  roundReason: string;
}

interface PostSettlementStatementRequest {
  showId: number;
  body: PostSettlementStatementRequestBody;
}

interface PostSettlementStatementResponse {
  accessToken: string;
  refreshToken: string;
}

const postSettlementStatement = (showId: number, body: PostSettlementStatementRequestBody) =>
  fetcher.post<PostSettlementStatementResponse>(`sa-api/v1/shows/${showId}/settlement-statements`, {
    json: body,
  });

const useCreateSettlementStatement = () =>
  useMutation((request: PostSettlementStatementRequest) =>
    postSettlementStatement(request.showId, request.body),
  );

export default useCreateSettlementStatement;
