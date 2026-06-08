import { HttpResponse, http, type JsonBodyType } from 'msw';

const emptyPage = {
  content: [],
  empty: true,
  first: true,
  last: true,
  number: 0,
  numberOfElements: 0,
  size: 100,
  totalElements: 0,
  totalPages: 0,
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 100,
    paged: true,
    unpaged: false,
    sort: { sorted: false, unsorted: true, empty: true },
  },
  sort: { sorted: false, unsorted: true, empty: true },
};

const json = (body: JsonBodyType, status = 200) => HttpResponse.json(body, { status });

const getScenario = () => window.localStorage.getItem('__E2E_SCENARIO__') ?? 'default';

const SHOW_NAME = '기능 테스트 공연';
const PARTICIPANT_NAME = '홍길동';
const TICKET_NAME = '일반 티켓';
const COMMON_TIME = '2026-05-01T10:00:00.000Z';

const popupHome = {
  id: 1,
  type: 'NOTICE',
  description: '테스트 공지',
  noticeTitle: '공지',
  eventUrl: 'https://example.com',
  startDate: '2099-01-01T00:00:00.000Z',
  endDate: '2099-12-31T23:59:59.999Z',
};

const showDetail = {
  id: 1,
  name: SHOW_NAME,
  date: '2099-12-31T12:00:00.000Z',
};

const participantSummary = {
  reservationId: 501,
  reservationName: PARTICIPANT_NAME,
  userId: 100,
  salesTicketTypeId: 10,
  salesTicketTypeName: TICKET_NAME,
  ticketCount: 1,
  answeredAt: COMMON_TIME,
};

export const handlers = [
  http.all('*/web/papi/v1/popup/HOME', () => json(popupHome)),
  http.get('*/web/v1/host/shows/1', () => json(showDetail)),
  http.get('*/web/v1/users/me', () =>
    json({
      id: 10,
      imgPath: null,
      nickname: '테스터',
      userCode: 'TESTER001',
    }),
  ),
  http.get('*/web/v1/host/shows', () => json([])),
  http.get('*/web/v1/host/users/me/summaries', () =>
    json({
      nickname: '테스터',
      profileImagePath: null,
      userCode: 'TESTER001',
    }),
  ),
  http.get('*/web/v1/shows/1/hosts/me', () =>
    json({
      id: 1,
      hostName: '테스터',
      imagePath: null,
      type: 'MAIN',
    }),
  ),
  http.get('*/web/v1/host/shows/1/sales-infos', () => json({ salesStartDateTime: null, salesEndDateTime: null })),
  http.get('*/web/v1/host/shows/1/settlement-infos', () =>
    json({
      bankAccount: '카카오뱅크 123-456',
      idCardPhotoFile: { url: 'https://example.com/id.pdf', fileName: 'id.pdf' },
      settlementBankAccountPhotoFile: { url: 'https://example.com/bank.pdf', fileName: 'bank.pdf' },
    }),
  ),
  http.get('*/web/v1/host/shows/1/settlement-events/last', () =>
    json({ settlementEventType: 'SEND', triggeredAt: '2026-05-01T00:00:00.000Z' }),
  ),
  http.get('*/web/v1/shows/1/settlement-summaries', () =>
    json({
      salesAmount: 1200000,
      actual: null,
      expected: { fee: 120000, settlementAmount: 1080000 },
    }),
  ),
  http.all('*/web/v1/host/settlement-banners', ({ request }) => {
    if (request.method === 'POST') return json({});
    return json([{ showId: 1, bannerType: 'REQUIRED', showName: SHOW_NAME }]);
  }),
  http.get('*/web/v1/host/shows/1/settlement-statements/last/file', () =>
    new HttpResponse('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF', {
      status: 200,
      headers: { 'content-type': 'application/pdf' },
    }),
  ),
  http.post('*/web/v1/host/shows/1/settlement-request', () => {
    if (getScenario() === 'settlement-request-fail') {
      return json({ message: 'fail' }, 500);
    }
    return json({});
  }),
  http.get('*/web/v1/host/shows/1/pre-questions', () =>
    json({
      preQuestions: [
        {
          id: 101,
          question: '관람 전 확인하고 싶은 내용이 있나요?',
          description: '자유 입력',
          isRequired: true,
          sequence: 1,
        },
      ],
      totalRespondentCount: 2,
    }),
  ),
  http.get('*/web/v1/host/shows/1/sales-ticket-types/summary', () => json([{ id: 10, ticketType: 'SALE', ticketName: '일반 티켓' }])),
  http.get('*/web/v1/host/shows/1/pre-question-answers/questions/101', () =>
    json({
      ...emptyPage,
      content: [
        {
          id: 1,
          preQuestionId: 101,
          userId: 100,
          reservationName: PARTICIPANT_NAME,
          salesTicketTypeId: 10,
          salesTicketTypeName: TICKET_NAME,
          reservationId: 501,
          ticketCount: 1,
          answer: '현장 주차 가능 여부',
          createdAt: COMMON_TIME,
          modifiedAt: COMMON_TIME,
        },
      ],
      empty: false,
      numberOfElements: 1,
      totalElements: 1,
      totalPages: 1,
    }),
  ),
  http.get('*/web/v1/host/shows/1/pre-question-answers/participants/501', () =>
    json({
      reservationId: 501,
      userId: 100,
      reservationName: PARTICIPANT_NAME,
      salesTicketTypeId: 10,
      salesTicketTypeName: TICKET_NAME,
      ticketCount: 1,
      createdAt: COMMON_TIME,
      modifiedAt: COMMON_TIME,
      answers: [
        {
          preQuestionId: 101,
          question: '관람 전 확인하고 싶은 내용이 있나요?',
          description: '자유 입력',
          isRequired: true,
          answer: '현장 주차 가능 여부',
          sequence: 1,
          createdAt: COMMON_TIME,
          modifiedAt: COMMON_TIME,
        },
      ],
    }),
  ),
  http.get('*/web/v1/host/shows/1/pre-question-answers/participants', ({ request }) => {
    const url = new URL(request.url);
    const reservationName = url.searchParams.get('reservationName');
    const noMatchedReservation = !!reservationName && reservationName !== PARTICIPANT_NAME;

    return json({
      ...emptyPage,
      content: noMatchedReservation ? [] : [participantSummary],
      empty: noMatchedReservation,
      numberOfElements: noMatchedReservation ? 0 : 1,
      totalElements: noMatchedReservation ? 0 : 1,
      totalPages: noMatchedReservation ? 0 : 1,
    });
  }),
  http.all('*/web/*', () => json({})),
  http.all('*/sa-api/*', () => json({})),
];
