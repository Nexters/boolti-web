type Row =
  | { type: 'text'; text: string }
  | { type: 'function'; getText: (params: URLSearchParams) => string };

export interface Table {
  type: 'vertical' | 'horizental';
  title: string;
  descriptions: string[];
  items: Array<{
    head: string;
    rows: Array<
      {
        rowSpan?: number;
      } & Row
    >;
  }>;
}

export const privacyTableContent: Table = {
  type: 'vertical',
  title: '[필수] 개인정보 수집・이용 동의',
  descriptions: [
    '* 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 거부 시 상품 구매가 제한됩니다.',
  ],
  items: [
    {
      head: '구분',
      rows: [
        { type: 'text', text: '이용자 상품 구매' },
        { type: 'text', text: 'CS처리' },
      ],
    },
    {
      head: '수집 및 이용 목적',
      rows: [
        { type: 'text', text: '결제 및 입장 처리' },
        {
          type: 'text',
          text: '민원인 신원 확인, 민원 사항 확인, 사실 조사를 위한 연락 및 통지, 처리 결과 통보',
        },
      ],
    },
    {
      head: '수집 및 이용 항목',
      rows: [
        {
          type: 'text',
          text: '성명, 휴대전화 번호, 이메일,상품구매정보(카드 결제 정보, 계좌 정보, 예매자 정보(성명, 휴대전화 번호)',
        },
        {
          type: 'text',
          text: '결제자명, 결제자 연락처, 입금자명, 주문번호, CS처리 기록 등',
        },
      ],
    },
    {
      head: '보유 및 이용 기간',
      rows: [
        {
          rowSpan: 2,
          type: 'text',
          text:
            '- 회원 탈퇴 시 파기 처리' +
            '\n\n' +
            '- 단, 관계 법령의 규정에 따라 보존할 의무가 있으면 해당 기간 동안 보존',
        },
      ],
    },
  ],
};

export const consentTableContent: Table = {
  type: 'horizental',
  title: '[필수] 개인정보 제3자 정보 제공 동의',
  descriptions: [
    '* 서비스 제공을 위해 위 정보가 제공됩니다.',
    '* 개인정보 제3자 정보 제공에 대한 동의를 거부할 권리가 있으며, 거부 시 상품 구매가 제한됩니다.',
  ],
  items: [
    {
      head: '개인정보를 제공받는자',
      rows: [
        {
          type: 'function',
          getText: (searchParams) => searchParams.get('username') ?? '공연 주최자',
        },
      ],
    },
    {
      head: '개인정보 이용 목적',
      rows: [
        {
          type: 'text',
          text: '이용자가 구매한 제품의 배송, 입장 확인, 고객상담, AS등 불만 처리, 취소, 환불, 혜택 제공등',
        },
      ],
    },
    {
      head: '제공 항목',
      rows: [{ type: 'text', text: '예매자명, 연락처, 주문번호, 결제금액, 결제 방법' }],
    },
    {
      head: '보유 및 이용 기간',
      rows: [
        {
          type: 'text',
          text: '서비스 제공 기간(관계법령의 규정에 의하여 보존할 필요가 있는 경우 사전 동의를 취득한 경우 해당 보유 기간)',
        },
      ],
    },
  ],
};

export const tableMap: Record<string, Table> = {
  privacy: privacyTableContent,
  consent: consentTableContent,
};
