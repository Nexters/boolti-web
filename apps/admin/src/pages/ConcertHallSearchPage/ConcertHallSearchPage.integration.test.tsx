// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import breakpoint from '@boolti/ui/src/systems/breakpoint';
import palette from '@boolti/ui/src/systems/palette';
import typo from '@boolti/ui/src/systems/typo';
import { MemoryRouter, useLocation } from 'react-router-dom';
import type { ReactElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ConcertHallSearchPage from './index';

const mockUseConcertHallSearchList = vi.fn();
const mockUseConcertHallSearchDetail = vi.fn();
const mockUseConcertHallSearchImages = vi.fn();
const mockUseConcertHallRecommendedRegions = vi.fn();
const mockUseConcertHallAutocomplete = vi.fn();
const mockMutateAsync = vi.fn();
const mockSuccessToast = vi.fn();
const mockErrorToast = vi.fn();
const mockInfoToast = vi.fn();
const mockWriteText = vi.fn();
const mockShare = vi.fn();
const mockDetailRefetch = vi.fn();
const mockImagesRefetch = vi.fn();
const mockIntersectionObserverObserve = vi.fn();
const mockIntersectionObserverDisconnect = vi.fn();
let intersectionObserverCallback: IntersectionObserverCallback;
const theme = { palette, typo, breakpoint };

vi.mock('@boolti/api', () => ({
  useCreateConcertHallEntryRequest: () => ({ mutateAsync: mockMutateAsync, isLoading: false }),
  useConcertHallSearchDetail: (...args: unknown[]) => mockUseConcertHallSearchDetail(...args),
  useConcertHallSearchImages: (...args: unknown[]) => mockUseConcertHallSearchImages(...args),
  useConcertHallSearchList: (...args: unknown[]) => mockUseConcertHallSearchList(...args),
  useConcertHallRecommendedRegions: (...args: unknown[]) =>
    mockUseConcertHallRecommendedRegions(...args),
  useConcertHallAutocomplete: (...args: unknown[]) => mockUseConcertHallAutocomplete(...args),
}));

vi.mock('@boolti/ui', async () => {
  const { default: Button } = await import('@boolti/ui/src/components/Button');
  const { mq_lg, mq_xl } = await import('@boolti/ui/src/systems/breakpoint');

  return {
    Button,
    mq_lg,
    mq_xl,
    PreviewMap: () => <button type="button" aria-label="지도 앱에서 보기" />,
    SubwayLineBadge: ({ lineName }: { lineName: string }) => <span>{lineName}</span>,
    useToast: () => ({
      error: mockErrorToast,
      info: mockInfoToast,
      success: mockSuccessToast,
    }),
  };
});

vi.mock('~/constants/ncp', () => ({ X_NCP_APIGW_API_KEY_ID: 'test-ncp-key' }));

const concertHalls = [
  {
    concertHallId: 1,
    name: '얼라이브홀',
    representativeImageUrl: 'https://example.com/alive.jpg',
    defaultFee: 800000,
    rentalTimeHours: 4,
    seatedCapacity: 80,
    standingCapacity: 100,
    regionName: '합정/상수',
  },
];

const nextPageConcertHall = {
  concertHallId: 2,
  name: '웨스트브릿지',
  representativeImageUrl: 'https://example.com/west.jpg',
  defaultFee: 500000,
  rentalTimeHours: 3,
  seatedCapacity: 50,
  standingCapacity: 90,
  regionName: '홍대/연남/연희',
};

const recommendedRegions = [
  { regionId: 1, name: '합정/상수' },
  { regionId: 2, name: '홍대/연남/연희' },
];

const autocompleteItems = [
  { type: 'REGION', id: 2, name: '홍대/연남/연희', streetAddress: null },
  {
    type: 'CONCERT_HALL',
    id: 1,
    name: '[DEV] 홍대 볼티 라이브홀',
    streetAddress: '서울특별시 마포구 와우산로 94',
  },
];

const detail = {
  id: 1,
  name: '얼라이브홀',
  shareCode: 'alive',
  representativeImageUrl: 'https://example.com/alive.jpg',
  share: {
    shareCode: 'alive',
    title: '얼라이브홀',
    imageUrl: 'https://example.com/alive-share.jpg',
  },
  hasHomeTabData: true,
  hasRentalTabData: true,
  informationUpdatedAt: '2026-08-07T12:00:00.000Z',
  head: {
    rentalFeeSummary: '평일 800,000원~',
    capacity: {
      seatedCapacity: 80,
      standingCapacity: 100,
    },
    location: {
      streetAddress: '서울 마포구 와우산로',
      detailAddress: '지하 1층',
      latitude: 37.55,
      longitude: 126.92,
    },
    subwayStations: [{ stationName: '합정', lines: [{ lineName: '2호선', colorHex: '#00A84D' }] }],
    contact: {
      phoneNumber: '02-123-4567',
      websiteUrl: 'https://alive.example.com',
      email: 'hello@alive.example.com',
    },
  },
  home: {
    introduction:
      '홍대 인근의 라이브 공연장입니다. 다양한 장르의 공연을 안정적으로 운영할 수 있는 음향과 조명 환경을 갖추고 있습니다. 대기실과 관객 동선이 분리되어 있어 리허설부터 본 공연까지 편하게 진행할 수 있습니다.',
    images: [
      {
        id: 11,
        imageUrl: 'https://example.com/stage.jpg',
        thumbnailUrl: 'https://example.com/stage-thumb.jpg',
      },
      {
        id: 12,
        imageUrl: 'https://example.com/audience.jpg',
        thumbnailUrl: 'https://example.com/audience-thumb.jpg',
      },
      {
        id: 13,
        imageUrl: 'https://example.com/lobby.jpg',
        thumbnailUrl: 'https://example.com/lobby-thumb.jpg',
      },
      {
        id: 14,
        imageUrl: 'https://example.com/waiting.jpg',
        thumbnailUrl: 'https://example.com/waiting-thumb.jpg',
      },
      {
        id: 15,
        imageUrl: 'https://example.com/light.jpg',
        thumbnailUrl: 'https://example.com/light-thumb.jpg',
      },
    ],
    totalImageCount: 6,
    amenities: [
      { type: 'WAITING_ROOM', name: '대기실', count: 1 },
      { type: 'INDOOR_RESTROOM', name: '실내 화장실', count: null },
    ],
    location: {
      streetAddress: '서울 마포구 와우산로',
      detailAddress: '지하 1층',
      latitude: 37.55,
      longitude: 126.92,
    },
  },
  rental: {
    rentalMethod: '홈페이지 예약',
    rentalTime: {
      rentalTimeHours: 4,
      rentalTimeDescription: '4시간 기준',
      isEngineerBreakIncluded: true,
    },
    rentalFees: [{ id: 1, dayType: 'WEEKDAY', dayTypeName: '평일', fee: 800000, sequence: 0 }],
    vat: { type: 'VAT_EXCLUDED', description: '부가세 별도' },
    additionalFees: [{ id: 2, dayType: 'WEEKEND', dayTypeName: '주말', fee: 1000000, sequence: 1 }],
    instrumentsText: '드럼, 기타, 베이스',
    paidOptions: [{ id: 1, name: '음향 엔지니어', price: 50000 }],
    specialNotes: ['공연 2주 전 예약 확정이 필요합니다.'],
  },
};

const allImages = [
  {
    id: 11,
    imageUrl: 'https://example.com/stage.jpg',
    thumbnailUrl: 'https://example.com/stage-thumb.jpg',
  },
  {
    id: 12,
    imageUrl: 'https://example.com/audience.jpg',
    thumbnailUrl: 'https://example.com/audience-thumb.jpg',
  },
  {
    id: 13,
    imageUrl: 'https://example.com/lobby.jpg',
    thumbnailUrl: 'https://example.com/lobby-thumb.jpg',
  },
  {
    id: 14,
    imageUrl: 'https://example.com/waiting.jpg',
    thumbnailUrl: 'https://example.com/waiting-thumb.jpg',
  },
  {
    id: 15,
    imageUrl: 'https://example.com/light.jpg',
    thumbnailUrl: 'https://example.com/light-thumb.jpg',
  },
  {
    id: 16,
    imageUrl: 'https://example.com/booth.jpg',
    thumbnailUrl: 'https://example.com/booth-thumb.jpg',
  },
];

const renderWithTheme = (ui: ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const LocationProbe = () => {
  const location = useLocation();
  return <output data-testid="location">{`${location.pathname}${location.search}`}</output>;
};

const renderConcertHallSearchPage = (initialEntry = '/concert-halls') =>
  renderWithTheme(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ConcertHallSearchPage />
      <LocationProbe />
    </MemoryRouter>,
  );

const openMobileFilterOverview = () => {
  fireEvent.click(screen.getByRole('button', { name: '모바일 공연장 검색 필터 열기' }));
};

const openMobileKeywordSearch = () => {
  openMobileFilterOverview();
  fireEvent.click(screen.getByRole('button', { name: '모바일 장소 검색 열기' }));
};

const selectMobileCapacity = () => {
  openMobileKeywordSearch();
  const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
  fireEvent.click(within(dialog).getByRole('button', { name: '합정/상수 검색' }));
  fireEvent.click(screen.getByRole('button', { name: '수용 인원 인원 설정' }));
  fireEvent.click(screen.getByRole('button', { name: '모바일 50명 ~ 100명 선택' }));
};

const getCssTextForElement = (element: Element) => {
  const classNames = Array.from(element.classList);
  const cssTexts: string[] = [];

  const visitRules = (rules: CSSRuleList) => {
    Array.from(rules).forEach((rule) => {
      if ('cssRules' in rule) {
        visitRules((rule as CSSMediaRule).cssRules);
      }

      if (
        'selectorText' in rule &&
        classNames.some((className) =>
          (rule as CSSStyleRule).selectorText.includes(`.${className}`),
        )
      ) {
        cssTexts.push(rule.cssText);
      }
    });
  };

  Array.from(document.styleSheets).forEach((styleSheet) => {
    visitRules(styleSheet.cssRules);
  });

  return cssTexts.join('\n');
};

describe('ConcertHallSearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: () => 0,
    });
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        media: '',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    window.localStorage.clear();
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText: mockWriteText },
    });
    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: vi.fn((callback: IntersectionObserverCallback) => {
        intersectionObserverCallback = callback;
        return {
          observe: mockIntersectionObserverObserve,
          disconnect: mockIntersectionObserverDisconnect,
        };
      }),
    });
    mockUseConcertHallSearchList.mockReturnValue({
      data: {
        items: concertHalls,
        totalElements: 1,
        hasNext: false,
        currentPage: 0,
        pageSize: 20,
        totalPages: 1,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: detail,
      isLoading: false,
      isError: false,
      refetch: mockDetailRefetch,
    });
    mockUseConcertHallSearchImages.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      refetch: mockImagesRefetch,
    });
    mockUseConcertHallRecommendedRegions.mockReturnValue({
      data: recommendedRegions,
      isLoading: false,
      isError: false,
    });
    mockUseConcertHallAutocomplete.mockReturnValue({
      data: { items: [] },
      isLoading: false,
      isError: false,
    });
    mockMutateAsync.mockResolvedValue({});
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('페이지가 열려 있는 동안 body 배경을 적용하고 닫으면 기존 값으로 복원한다', () => {
    const previousBackground = 'rgb(12, 34, 56)';
    document.body.style.background = previousBackground;

    const { unmount } = renderConcertHallSearchPage();
    const expectedBackground = document.createElement('div');
    expectedBackground.style.background = theme.palette.grey.b;

    expect(document.body.style.background).toBe(expectedBackground.style.background);

    unmount();

    expect(document.body.style.background).toBe(previousBackground);
  });

  it('모바일 메인 검색 버튼에 조건 중심 안내 문구를 표시한다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();

    expect(
      screen.getByRole('button', { name: '모바일 공연장 검색 필터 열기' }).textContent,
    ).toContain('내 조건에 맞는 공연장 찾기');
  });

  it('포커스가 없을 때 긴 검색어를 말줄임표로 표시한다', () => {
    renderConcertHallSearchPage();

    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    const cssText = getCssTextForElement(keywordInput);
    fireEvent.change(keywordInput, {
      target: { value: '서울특별시 마포구 와우산로 94 홍대 인근 공연장' },
    });

    expect(window.getComputedStyle(keywordInput).textOverflow).toBe('ellipsis');
    expect(cssText).toContain(':not(:focus)');
    expect(cssText).toContain('text-overflow: ellipsis');
  });

  it('장소 검색 영역의 입력창 외 부분을 눌러도 검색 입력에 포커스한다', () => {
    renderConcertHallSearchPage();

    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    const searchInputField = screen.getByText('장소').parentElement;

    expect(searchInputField).not.toBeNull();
    fireEvent.mouseDown(searchInputField as HTMLElement);
    keywordInput.blur();
    fireEvent.click(searchInputField as HTMLElement);

    expect(document.activeElement).toBe(keywordInput);
  });

  it.each([
    ['장소', () => fireEvent.focus(screen.getByRole('textbox', { name: '지역, 공연장명 검색' }))],
    [
      '대관료',
      () =>
        fireEvent.click(
          document.querySelector<HTMLButtonElement>('button[aria-label^="대관료 "]')!,
        ),
    ],
    [
      '수용 인원',
      () =>
        fireEvent.click(
          document.querySelector<HTMLButtonElement>('button[aria-label^="수용 인원 "]')!,
        ),
    ],
  ])('%s 필드가 활성화되면 공연장 개수와 카드 영역을 50%로 표시한다', (_, activate) => {
    renderConcertHallSearchPage();

    const toolbar = screen.getByText('공연장').parentElement?.parentElement;
    const cardGrid = screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }).parentElement;

    expect(toolbar).not.toBeNull();
    expect(cardGrid).not.toBeNull();

    activate();

    expect(window.getComputedStyle(toolbar as HTMLElement).opacity).toBe('0.5');
    expect(window.getComputedStyle(cardGrid as HTMLElement).opacity).toBe('0.5');
  });

  it('검색 결과 카드를 표시하고 카드 클릭 시 상세 정보를 연다', async () => {
    renderConcertHallSearchPage();

    expect(screen.getByText('공연장')).not.toBeNull();
    expect(screen.getByText('얼라이브홀')).not.toBeNull();
    expect(screen.getByText('800,000')).not.toBeNull();
    expect(screen.getByText('/ 4시간')).not.toBeNull();
    expect(screen.getByText('좌석 80석 · 스탠딩 100명')).not.toBeNull();
    expect(screen.getByText('합정/상수')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(mockUseConcertHallSearchDetail).toHaveBeenLastCalledWith(1);
    expect(await screen.findByText(/홍대 인근의 라이브 공연장입니다/)).not.toBeNull();
  });

  it('헤더 햄버거 버튼으로 메뉴를 열고 공연 등록 흐름으로 이동한다', () => {
    renderConcertHallSearchPage();

    const menuButton = screen.getByRole('button', { name: '메뉴 열기' });
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(menuButton);

    expect(screen.getByRole('menu')).not.toBeNull();
    expect(screen.getByRole('menuitem', { name: '앱 둘러보기' })).not.toBeNull();
    expect(screen.getByRole('menuitem', { name: /공연 등록 시작하기/ })).not.toBeNull();
    expect(screen.getByRole('button', { name: '메뉴 닫기' }).getAttribute('aria-expanded')).toBe(
      'true',
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /공연 등록 시작하기/ }));

    expect(screen.getByTestId('location').textContent).toBe('/home?target=register');
    expect(screen.queryByRole('menu')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: '메뉴 열기' }));
    fireEvent.click(screen.getByRole('menuitem', { name: '앱 둘러보기' }));

    expect(screen.getByTestId('location').textContent).toBe('/qr');
  });

  it('모바일에서도 햄버거 버튼으로 전체 폭 메뉴를 열고 닫는다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: '메뉴 열기' }));

    expect(screen.getByRole('menu')).not.toBeNull();
    expect(screen.getByRole('menuitem', { name: '앱 둘러보기' })).not.toBeNull();
    expect(screen.getByRole('menuitem', { name: /공연 등록 시작하기/ })).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: '메뉴 닫기' }));

    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('상세 패널이 열리면 선택하지 않은 카드만 흐리게 표시하고 닫으면 복원한다', async () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: {
        items: [concertHalls[0], nextPageConcertHall],
        totalElements: 2,
        hasNext: false,
        currentPage: 0,
        pageSize: 20,
        totalPages: 1,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
    renderConcertHallSearchPage();

    const selectedCard = screen.getByRole('button', { name: /얼라이브홀 상세 보기/ });
    const unselectedCard = screen.getByRole('button', { name: /웨스트브릿지 상세 보기/ });

    fireEvent.click(selectedCard);

    expect(selectedCard.getAttribute('aria-pressed')).toBe('true');
    expect(unselectedCard.getAttribute('aria-pressed')).toBe('false');
    expect(window.getComputedStyle(selectedCard).opacity).toBe('1');
    expect(window.getComputedStyle(unselectedCard).opacity).toBe('0.6');

    fireEvent.click(await screen.findByRole('button', { name: '상세 닫기' }));

    await waitFor(() => {
      expect(selectedCard.getAttribute('aria-pressed')).toBe('false');
      expect(unselectedCard.getAttribute('aria-pressed')).toBe('false');
      expect(window.getComputedStyle(selectedCard).opacity).toBe('1');
      expect(window.getComputedStyle(unselectedCard).opacity).toBe('1');
    });
  });

  it('상세 패널을 닫으면 선택했던 카드로 포커스를 돌려준다', async () => {
    renderConcertHallSearchPage();
    const selectedCard = screen.getByRole('button', { name: /얼라이브홀 상세 보기/ });
    fireEvent.click(selectedCard);
    fireEvent.click(await screen.findByRole('button', { name: '상세 닫기' }));

    await waitFor(() => expect(document.activeElement).toBe(selectedCard));
  });

  it('상세 패널이 열리면 데스크톱 정렬 그룹을 흐리게 표시하고 정렬 버튼을 비활성화한다', async () => {
    renderConcertHallSearchPage();

    const lowFeeSortButton = screen.getByRole('button', { name: '대관료 낮은 순' });
    const highFeeSortButton = screen.getByRole('button', { name: '대관료 높은 순' });
    const mobileSortButton = screen.getByLabelText('정렬 대관료 낮은 순', { selector: 'button' });

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    const sortGroup = screen.getByRole('group', { name: '공연장 정렬' });
    expect(window.getComputedStyle(sortGroup).opacity).toBe('0.6');
    expect((lowFeeSortButton as HTMLButtonElement).disabled).toBe(true);
    expect((highFeeSortButton as HTMLButtonElement).disabled).toBe(true);
    expect((mobileSortButton as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(await screen.findByRole('button', { name: '상세 닫기' }));

    await waitFor(() => {
      expect(window.getComputedStyle(sortGroup).opacity).toBe('1');
      expect((lowFeeSortButton as HTMLButtonElement).disabled).toBe(false);
      expect((highFeeSortButton as HTMLButtonElement).disabled).toBe(false);
    });
  });

  it('상세 패널이 열리면 데스크톱 콘텐츠를 3대 1 그리드로 전환한다', () => {
    renderConcertHallSearchPage();

    const content = screen.getByText('공연장').closest('section')?.parentElement;
    expect(content).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(window.getComputedStyle(content as HTMLElement).gridTemplateColumns).toBe(
      'minmax(0, 3fr) minmax(0, 1fr)',
    );
  });

  it('미등록 대관료와 nullable 카드 정보는 정보 없음으로 표시한다', () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: {
        items: [
          {
            concertHallId: 3,
            name: '정보 미등록 공연장',
            representativeImageUrl: null,
            defaultFee: 0,
            rentalTimeHours: null,
            seatedCapacity: null,
            standingCapacity: null,
            regionName: null,
          },
        ],
        totalElements: 1,
        hasNext: false,
        currentPage: 0,
        pageSize: 20,
        totalPages: 1,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderConcertHallSearchPage();

    expect(screen.getByText('문의')).not.toBeNull();
    expect(screen.getByText('/ 정보 없음')).not.toBeNull();
    expect(screen.getAllByText('정보 없음')).toHaveLength(2);
  });

  it('검색어를 URL 파라미터 기반 리스트 쿼리로 전달한다', async () => {
    renderConcertHallSearchPage();

    expect(screen.getByText('장소')).not.toBeNull();

    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍대' },
    });
    fireEvent.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ keyword: '홍대', page: 0, size: 12, sort: 'FEE_ASC' }),
      );
    });
  });

  it('장소 입력값이 비어 있을 때 Enter로 장소 필터를 초기화하고 포커스를 해제한다', () => {
    renderConcertHallSearchPage('/concert-halls?keyword=홍대');

    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    fireEvent.mouseDown(screen.getByText('장소').parentElement as HTMLElement);
    fireEvent.focus(keywordInput);
    fireEvent.change(keywordInput, { target: { value: '' } });
    fireEvent.keyDown(keywordInput, { key: 'Enter', code: 'Enter' });

    expect(screen.getByTestId('location').textContent).toBe('/concert-halls');
    expect(document.activeElement).not.toBe(keywordInput);
  });

  it('입력창이 처음부터 비어 있어도 Enter로 기존 지역 장소 필터를 초기화한다', () => {
    renderConcertHallSearchPage('/concert-halls?regionId=1');

    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    fireEvent.focus(keywordInput);
    fireEvent.change(keywordInput, { target: { value: '' } });
    fireEvent.keyDown(keywordInput, { key: 'Enter', code: 'Enter' });

    expect(screen.getByTestId('location').textContent).toBe('/concert-halls');
    expect(document.activeElement).not.toBe(keywordInput);
  });

  it('장소 입력을 비운 뒤 포커스만 이탈하면 초안을 유지하고 장소 검색을 닫을 때 복원한다', () => {
    renderConcertHallSearchPage('/concert-halls?keyword=홍대');

    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    fireEvent.focus(keywordInput);
    fireEvent.change(keywordInput, { target: { value: '' } });
    fireEvent.blur(keywordInput);

    expect((keywordInput as HTMLInputElement).value).toBe('');
    expect(screen.getByLabelText('장소 검색')).not.toBeNull();

    fireEvent.blur(window);
    fireEvent.focus(window);

    expect((keywordInput as HTMLInputElement).value).toBe('');
    expect(screen.getByLabelText('장소 검색')).not.toBeNull();

    fireEvent.mouseDown(document.body);

    expect(screen.getByTestId('location').textContent).toBe('/concert-halls?keyword=홍대');
    expect((keywordInput as HTMLInputElement).value).toBe('홍대');
    expect(screen.queryByRole('group', { name: '장소 검색' })).toBeNull();
  });

  it('대관료와 수용 인원 필터를 리스트 쿼리로 전달한다', async () => {
    renderConcertHallSearchPage(
      '/concert-halls?rentalFeeMin=500000&capacityMin=50&sort=CAPACITY_DESC',
    );

    const rentalFeeButton = screen.getByRole('button', { name: '대관료 500,000원 이상' });
    const capacityButton = screen.getByRole('button', { name: '수용 인원 50명 이상' });
    const lowFeeSortButton = screen.getByRole('button', { name: '대관료 낮은 순', pressed: true });
    const highFeeSortButton = screen.getByRole('button', {
      name: '대관료 높은 순',
      pressed: false,
    });

    expect((rentalFeeButton as HTMLButtonElement).disabled).toBe(false);
    expect((capacityButton as HTMLButtonElement).disabled).toBe(false);
    expect((lowFeeSortButton as HTMLButtonElement).disabled).toBe(false);
    expect((highFeeSortButton as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(rentalFeeButton);
    expect(screen.getByLabelText('대관료 필터')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '1,000,000원 - 1,500,000원' }));
    fireEvent.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /대관료 1,000,000원 - 1,500,000원/ }),
      ).not.toBeNull();
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({
          minFee: 1000000,
          maxFee: 1500000,
          minCapacity: 50,
          page: 0,
          size: 12,
          sort: 'FEE_ASC',
        }),
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /수용 인원 50명 이상/ }));
    fireEvent.click(screen.getByRole('button', { name: '50명 - 100명' }));
    fireEvent.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /수용 인원 50명 - 100명/ })).not.toBeNull();
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({
          minFee: 1000000,
          maxFee: 1500000,
          minCapacity: 50,
          maxCapacity: 100,
          sort: 'FEE_ASC',
        }),
      );
    });

    fireEvent.click(capacityButton);
    fireEvent.click(screen.getByRole('button', { name: '수용 인원 초기화' }));

    expect(screen.getByRole('button', { name: '수용 인원 인원 설정' })).not.toBeNull();
  });

  it('모바일 메인 검색창은 장소 상세 대신 필터 요약 화면을 먼저 연다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();

    const mobileSearchTrigger = screen.getByRole('button', {
      name: '모바일 공연장 검색 필터 열기',
    });
    expect(screen.queryByPlaceholderText('내 조건에 맞는 공연장 찾기')).toBeNull();

    fireEvent.click(mobileSearchTrigger);

    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    expect(dialog).not.toBeNull();
    expect(screen.getByRole('heading', { name: '장소' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '모바일 장소 검색 열기' })).not.toBeNull();
    expect(within(dialog).getByText('대관료 설정')).not.toBeNull();
    expect(within(dialog).getByText('인원 설정')).not.toBeNull();
    expect(screen.queryByRole('button', { name: '모바일 검색 필터 닫기' })).toBeNull();
    expect(screen.queryByRole('textbox', { name: '모바일 지역, 공연장명 검색' })).toBeNull();
    expect((screen.getByRole('button', { name: '전체 삭제' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it.each([
    '/concert-halls?regionId=1',
    '/concert-halls?rentalFeeMin=500000',
    '/concert-halls?capacityMin=50',
  ])('모바일 검색 필터가 하나라도 있으면 전체 삭제를 활성화한다: %s', (initialEntry) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage(initialEntry);
    openMobileFilterOverview();

    expect((screen.getByRole('button', { name: '전체 삭제' }) as HTMLButtonElement).disabled).toBe(
      false,
    );
  });

  it('모바일 필터 요약의 장소 검색창을 누르면 장소 상세 입력에 포커스한다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();

    openMobileKeywordSearch();

    const keywordInput = screen.getByRole('textbox', { name: '모바일 지역, 공연장명 검색' });
    expect(screen.getByRole('button', { name: '모바일 검색 필터 닫기' })).not.toBeNull();
    expect(document.activeElement).toBe(keywordInput);
  });

  it('모바일 장소 검색 닫기는 입력을 취소하고 필터 요약으로 돌아간다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage('/concert-halls?keyword=홍대');

    openMobileKeywordSearch();
    fireEvent.change(screen.getByRole('textbox', { name: '모바일 지역, 공연장명 검색' }), {
      target: { value: '합정' },
    });

    fireEvent.click(screen.getByRole('button', { name: '모바일 검색 필터 닫기' }));

    expect(screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '모바일 장소 검색 열기' }).textContent).toContain(
      '홍대',
    );
    expect(screen.queryByRole('textbox', { name: '모바일 지역, 공연장명 검색' })).toBeNull();
    expect((screen.getByRole('button', { name: '전체 삭제' }) as HTMLButtonElement).disabled).toBe(
      false,
    );
  });

  it('모바일 필터 요약의 Dim을 누르면 바텀시트를 닫는다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();

    openMobileFilterOverview();
    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    fireEvent.click(dialog.parentElement as HTMLElement);

    expect(screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' })).not.toBeNull();
    fireEvent.animationEnd(dialog);

    expect(screen.queryByRole('dialog', { name: '모바일 공연장 검색 필터' })).toBeNull();
  });

  it('모바일 핸들을 누르면 닫힘 애니메이션 뒤 바텀시트를 닫는다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();
    openMobileFilterOverview();

    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    expect(getCssTextForElement(dialog)).toContain('280ms');
    fireEvent.click(screen.getByRole('button', { name: '모바일 바텀시트 닫기' }));

    expect(screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' })).not.toBeNull();
    expect(getCssTextForElement(dialog)).toContain('240ms');
    fireEvent.animationEnd(dialog);
    expect(screen.queryByRole('dialog', { name: '모바일 공연장 검색 필터' })).toBeNull();
  });

  it('동작 줄이기 환경에서는 모바일 바텀시트를 즉시 닫는다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: true })),
    });
    renderConcertHallSearchPage();
    openMobileFilterOverview();

    fireEvent.click(screen.getByRole('button', { name: '모바일 바텀시트 닫기' }));

    expect(screen.queryByRole('dialog', { name: '모바일 공연장 검색 필터' })).toBeNull();
  });

  it('모바일 전체 삭제는 검색 필터를 즉시 적용해 비우고 요약 화면으로 돌아간다', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    window.localStorage.setItem(
      'concert-hall-search-recent-keywords',
      JSON.stringify(['최근 공연장']),
    );
    renderConcertHallSearchPage(
      '/concert-halls?keyword=홍대&rentalFeeMin=500000&rentalFeeMax=1000000&capacityMin=50&capacityMax=100&sort=FEE_DESC',
    );
    openMobileFilterOverview();
    fireEvent.click(screen.getByRole('button', { name: '수용 인원 50명 ~ 100명' }));

    fireEvent.click(screen.getByRole('button', { name: '전체 삭제' }));

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe('/concert-halls?sort=FEE_DESC');
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({
          regionId: undefined,
          keyword: undefined,
          minFee: undefined,
          maxFee: undefined,
          minCapacity: undefined,
          maxCapacity: undefined,
          sort: 'FEE_DESC',
        }),
      );
    });
    expect(screen.getByRole('button', { name: '모바일 장소 검색 열기' }).textContent).toContain(
      '지역, 공연장명 검색',
    );
    expect((screen.getByRole('button', { name: '전체 삭제' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect(window.localStorage.getItem('concert-hall-search-recent-keywords')).toBe(
      JSON.stringify(['최근 공연장']),
    );
  });

  it('모바일 바텀시트는 상단 32px을 남기고 입력 확대를 막는 글자 크기를 사용한다', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();
    openMobileKeywordSearch();

    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    const keywordInput = screen.getByRole('textbox', { name: '모바일 지역, 공연장명 검색' });

    expect(getCssTextForElement(dialog)).toContain('height: calc(100dvh - 32px)');
    expect(getCssTextForElement(dialog)).toContain('animation');
    expect(getCssTextForElement(keywordInput)).toContain('font-size: 16px');

    fireEvent.click(screen.getByRole('button', { name: '모바일 검색 필터 닫기' }));
    fireEvent.click(screen.getByRole('button', { name: '대관료 설정' }));
    expect(getCssTextForElement(screen.getByLabelText('모바일 대관료 최소'))).toContain(
      'font-size: 16px',
    );
  });

  it('모바일 바텀시트에서 대관료를 선택하고 검색에 적용한다', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();

    openMobileKeywordSearch();
    fireEvent.click(
      within(screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' })).getByRole('button', {
        name: '합정/상수 검색',
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: '모바일 500,000원 ~ 1,000,000원 선택' }));
    fireEvent.click(screen.getByRole('button', { name: '모바일 필터 검색하기' }));

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ minFee: 500000, maxFee: 1000000 }),
      );
    });
  });

  it('수용 인원을 변경한 뒤 모바일 Dim을 클릭하면 필터를 적용하고 검색 창을 닫는다', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();
    selectMobileCapacity();

    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    fireEvent.click(dialog.parentElement as HTMLElement);
    fireEvent.animationEnd(dialog);

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe(
        '/concert-halls?regionId=1&capacityMin=50&capacityMax=100',
      );
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ minCapacity: 50, maxCapacity: 100 }),
      );
      expect(screen.queryByRole('dialog', { name: '모바일 공연장 검색 필터' })).toBeNull();
    });
  });

  it('수용 인원을 변경한 뒤 다른 필드로 이동하면 먼저 필터를 적용하고 수용 인원 창을 닫는다', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();
    selectMobileCapacity();

    fireEvent.click(screen.getByRole('button', { name: '대관료 설정' }));

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe(
        '/concert-halls?regionId=1&capacityMin=50&capacityMax=100',
      );
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ minCapacity: 50, maxCapacity: 100 }),
      );
      expect(screen.queryByRole('button', { name: '모바일 50명 ~ 100명 선택' })).toBeNull();
      expect(
        screen.getByRole('button', { name: '모바일 500,000원 ~ 1,000,000원 선택' }),
      ).not.toBeNull();
    });
  });

  it('수용 인원을 변경한 뒤 검색 버튼을 클릭하면 필터를 적용하고 검색 창을 닫는다', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage();
    selectMobileCapacity();

    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    fireEvent.click(screen.getByRole('button', { name: '모바일 필터 검색하기' }));
    fireEvent.animationEnd(dialog);

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe(
        '/concert-halls?regionId=1&capacityMin=50&capacityMax=100',
      );
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ minCapacity: 50, maxCapacity: 100 }),
      );
      expect(screen.queryByRole('dialog', { name: '모바일 공연장 검색 필터' })).toBeNull();
    });
  });

  it('대관료 낮은 순과 높은 순을 리스트 쿼리로 전달한다', async () => {
    renderConcertHallSearchPage();

    const lowFeeSortButton = screen.getByRole('button', { name: '대관료 낮은 순', pressed: true });
    const highFeeSortButton = screen.getByRole('button', { name: '대관료 높은 순' });

    expect((lowFeeSortButton as HTMLButtonElement).disabled).toBe(false);
    expect((highFeeSortButton as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(highFeeSortButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '대관료 높은 순', pressed: true })).not.toBeNull();
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 0, size: 12, sort: 'FEE_DESC' }),
      );
    });

    const mobileSortButton = screen.getByLabelText('정렬 대관료 높은 순', { selector: 'button' });
    fireEvent.click(mobileSortButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '대관료 낮은 순', pressed: true })).not.toBeNull();
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ sort: 'FEE_ASC' }),
      );
    });
  });

  it('추천 지역을 선택하면 regionId로 검색하고 keyword를 제거한다', async () => {
    renderConcertHallSearchPage();

    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.click(screen.getByRole('button', { name: '합정/상수 검색' }));

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ regionId: 1, keyword: undefined, sort: 'FEE_ASC' }),
      );
      expect(screen.getByLabelText('합정/상수 필터 제거', { selector: 'button' })).not.toBeNull();
    });

    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍대' },
    });
    fireEvent.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ regionId: undefined, keyword: '홍대' }),
      );
    });
  });

  it('기존 검색어가 있는 상태에서 추천 지역을 선택하면 입력창에 추천 지역명을 표시한다', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320, writable: true });
    renderConcertHallSearchPage('/concert-halls?keyword=홍대');

    openMobileKeywordSearch();
    const dialog = screen.getByRole('dialog', { name: '모바일 공연장 검색 필터' });
    const keywordInput = within(dialog).getByRole('textbox', {
      name: '모바일 지역, 공연장명 검색',
    });
    fireEvent.change(keywordInput, { target: { value: '' } });
    fireEvent.click(within(dialog).getByRole('button', { name: '합정/상수 검색' }));
    fireEvent.click(screen.getByRole('button', { name: '모바일 필터 검색하기' }));

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe('/concert-halls?regionId=1');
      expect(
        screen.getByRole('button', { name: '모바일 공연장 검색 필터 열기' }).textContent,
      ).toContain('합정/상수');
    });
  });

  it('regionId URL로 직접 진입하면 해당 추천 지역명을 입력창에 표시한다', async () => {
    renderConcertHallSearchPage('/concert-halls?regionId=1');

    await waitFor(() => {
      expect((screen.getByPlaceholderText('지역, 공연장명 검색') as HTMLInputElement).value).toBe(
        '합정/상수',
      );
    });
  });

  it('300ms debounce 후 자동완성을 조회하고 공연장 선택 시 키워드 검색과 상세 열기를 실행한다', async () => {
    vi.useFakeTimers();
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => ({
      data: { items: query === '홍대' ? autocompleteItems : [] },
      isLoading: false,
      isError: false,
    }));

    renderConcertHallSearchPage();
    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍대' },
    });

    expect(mockUseConcertHallAutocomplete).not.toHaveBeenCalledWith('홍대');
    await act(async () => vi.advanceTimersByTimeAsync(299));
    expect(mockUseConcertHallAutocomplete).not.toHaveBeenCalledWith('홍대');
    await act(async () => vi.advanceTimersByTimeAsync(1));
    expect(mockUseConcertHallAutocomplete).toHaveBeenLastCalledWith('홍대');

    fireEvent.click(screen.getByRole('button', { name: /\[DEV\] 홍대 볼티 라이브홀.*선택/ }));
    expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
      expect.objectContaining({ keyword: '[DEV] 홍대 볼티 라이브홀', regionId: undefined }),
    );
    expect(mockUseConcertHallSearchDetail).toHaveBeenLastCalledWith(1);
    vi.useRealTimers();
  });

  it('추천 지역이 표시된 상태에서 검색어를 입력하면 자동완성 응답 전까지 추천 지역을 유지한다', async () => {
    vi.useFakeTimers();
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => ({
      data: query === '홍' ? { items: autocompleteItems } : undefined,
      isLoading: query !== '' && query !== '홍',
      isError: false,
    }));

    renderConcertHallSearchPage();
    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    expect(screen.getByRole('button', { name: '합정/상수 검색' })).not.toBeNull();

    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍' },
    });

    expect(screen.queryByText('검색 결과를 불러오는 중입니다.')).toBeNull();
    expect(screen.getByRole('button', { name: '합정/상수 검색' })).not.toBeNull();

    await act(async () => vi.advanceTimersByTimeAsync(300));

    expect(screen.queryByRole('button', { name: '합정/상수 검색' })).toBeNull();
    expect(screen.getByRole('button', { name: /\[DEV\] 홍대 볼티 라이브홀.*선택/ })).not.toBeNull();
    vi.useRealTimers();
  });

  it('최근 검색어가 표시된 상태에서 검색어를 입력하면 자동완성 응답 전까지 최근 검색어를 유지한다', async () => {
    vi.useFakeTimers();
    window.localStorage.setItem('concert-hall-search-recent-keywords', JSON.stringify(['합정']));
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => ({
      data: query === '홍' ? { items: autocompleteItems } : undefined,
      isLoading: query !== '' && query !== '홍',
      isError: false,
    }));

    renderConcertHallSearchPage();
    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    fireEvent.focus(keywordInput);
    expect(screen.getByRole('button', { name: '합정 검색' })).not.toBeNull();

    fireEvent.change(keywordInput, { target: { value: '홍' } });

    expect(screen.queryByText('검색 결과를 불러오는 중입니다.')).toBeNull();
    expect(screen.getByRole('button', { name: '합정 검색' })).not.toBeNull();

    await act(async () => vi.advanceTimersByTimeAsync(300));

    expect(screen.queryByRole('button', { name: '합정 검색' })).toBeNull();
    expect(screen.getByRole('button', { name: /\[DEV\] 홍대 볼티 라이브홀.*선택/ })).not.toBeNull();
    vi.useRealTimers();
  });

  it('검색 결과가 표시된 상태에서 검색어를 수정하면 새 응답 전까지 기존 결과를 유지한다', async () => {
    vi.useFakeTimers();
    let hasNextResponse = false;
    const previousItems = [
      { type: 'CONCERT_HALL', id: 21, name: '홍 라이브홀', streetAddress: null },
    ];
    const nextItems = [
      { type: 'CONCERT_HALL', id: 22, name: '홍대 새 공연장', streetAddress: null },
    ];
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => {
      if (query === '홍') {
        return { data: { items: previousItems }, isLoading: false, isError: false };
      }
      if (query === '홍대') {
        return {
          data: { items: hasNextResponse ? nextItems : previousItems },
          isLoading: !hasNextResponse,
          isError: false,
        };
      }
      return { data: undefined, isLoading: false, isError: false };
    });

    renderConcertHallSearchPage();
    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍' },
    });
    await act(async () => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByRole('button', { name: '홍 라이브홀 선택' })).not.toBeNull();

    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍대' },
    });
    expect(screen.queryByText('검색 결과를 불러오는 중입니다.')).toBeNull();
    expect(screen.getByRole('button', { name: '홍 라이브홀 선택' })).not.toBeNull();

    await act(async () => vi.advanceTimersByTimeAsync(300));
    expect(screen.queryByText('검색 결과를 불러오는 중입니다.')).toBeNull();
    expect(screen.getByRole('button', { name: '홍 라이브홀 선택' })).not.toBeNull();

    hasNextResponse = true;
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍대 ' },
    });

    expect(screen.queryByRole('button', { name: '홍 라이브홀 선택' })).toBeNull();
    expect(screen.getByRole('button', { name: '홍대 새 공연장 선택' })).not.toBeNull();
    vi.useRealTimers();
  });

  it('검색어를 모두 지운 뒤 새 검색어를 입력하면 지우기 전 검색 결과를 표시하지 않는다', async () => {
    vi.useFakeTimers();
    const previousItems = [
      { type: 'CONCERT_HALL', id: 31, name: '합정 공연장', streetAddress: null },
    ];
    const nextItems = [{ type: 'CONCERT_HALL', id: 32, name: '홍대 공연장', streetAddress: null }];
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => ({
      data:
        query === '합'
          ? { items: previousItems }
          : query === '홍'
            ? { items: nextItems }
            : undefined,
      isLoading: false,
      isError: false,
    }));

    renderConcertHallSearchPage();
    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    fireEvent.focus(keywordInput);
    fireEvent.change(keywordInput, { target: { value: '합' } });
    await act(async () => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByRole('button', { name: '합정 공연장 선택' })).not.toBeNull();

    fireEvent.change(keywordInput, { target: { value: '' } });
    await act(async () => vi.advanceTimersByTimeAsync(0));
    fireEvent.change(keywordInput, { target: { value: '홍' } });

    expect(screen.queryByRole('button', { name: '합정 공연장 선택' })).toBeNull();
    expect(screen.getByRole('button', { name: '합정/상수 검색' })).not.toBeNull();

    await act(async () => vi.advanceTimersByTimeAsync(300));
    expect(screen.queryByRole('button', { name: '합정/상수 검색' })).toBeNull();
    expect(screen.getByRole('button', { name: '홍대 공연장 선택' })).not.toBeNull();
    vi.useRealTimers();
  });

  it('자동완성 이름에서 입력값으로 시작하는 모든 일치 문자열을 strong으로 강조한다', async () => {
    vi.useFakeTimers();
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => ({
      data: {
        items:
          query === '블'
            ? [
                { type: 'CONCERT_HALL', id: 11, name: '블루블루', streetAddress: null },
                { type: 'CONCERT_HALL', id: 12, name: '블랙코미디', streetAddress: null },
              ]
            : [],
      },
      isLoading: false,
      isError: false,
    }));

    renderConcertHallSearchPage();
    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '블' },
    });
    await act(async () => vi.advanceTimersByTimeAsync(300));

    const highlights = screen.getAllByText('블', { selector: 'strong' });
    expect(highlights).toHaveLength(3);
    highlights.forEach((highlight) => {
      const style = window.getComputedStyle(highlight);
      expect(style.color).toBe('rgb(255, 90, 20)');
      expect(style.fontWeight).toBe('inherit');
    });
    expect(screen.getByRole('button', { name: '블루블루 선택' }).textContent).toContain('블루블루');
    expect(screen.getByRole('button', { name: '블랙코미디 선택' }).textContent).toContain(
      '블랙코미디',
    );
    vi.useRealTimers();
  });

  it('자동완성 이름의 중간 문자열만 강조하고 주소는 강조하지 않는다', async () => {
    vi.useFakeTimers();
    mockUseConcertHallAutocomplete.mockImplementation((query: string) => ({
      data: {
        items:
          query === '혜선'
            ? [
                {
                  type: 'CONCERT_HALL',
                  id: 13,
                  name: '김혜선',
                  streetAddress: '서울특별시 혜선로 1',
                },
              ]
            : [],
      },
      isLoading: false,
      isError: false,
    }));

    renderConcertHallSearchPage();
    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '혜선' },
    });
    await act(async () => vi.advanceTimersByTimeAsync(300));

    expect(screen.getByText('혜선', { selector: 'strong' })).not.toBeNull();
    expect(
      screen.getByRole('button', { name: '김혜선 서울특별시 혜선로 1 선택' }).textContent,
    ).toContain('김혜선');
    expect(screen.getByText('서울특별시 혜선로 1').querySelector('strong')).toBeNull();
    vi.useRealTimers();
  });

  it('자동완성 실패 시 오류를 표시해도 입력한 키워드로 검색할 수 있다', async () => {
    vi.useFakeTimers();
    mockUseConcertHallAutocomplete.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    renderConcertHallSearchPage();

    fireEvent.focus(screen.getByPlaceholderText('지역, 공연장명 검색'));
    fireEvent.change(screen.getByPlaceholderText('지역, 공연장명 검색'), {
      target: { value: '홍대' },
    });
    await act(async () => vi.advanceTimersByTimeAsync(300));
    expect(screen.getByText('자동완성 결과를 불러오지 못했어요.')).not.toBeNull();
    vi.useRealTimers();
    fireEvent.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ keyword: '홍대' }),
      );
    });
  });

  it('최근 검색어를 저장하고 클릭/삭제/전체 삭제할 수 있다', async () => {
    renderConcertHallSearchPage();
    const keywordInput = screen.getByPlaceholderText('지역, 공연장명 검색');
    const keywordSearchField = screen.getByText('장소').parentElement as HTMLElement;
    const focusKeywordInput = () => {
      fireEvent.mouseDown(keywordSearchField);
      fireEvent.focus(keywordInput);
    };

    fireEvent.change(keywordInput, {
      target: { value: '홍대' },
    });
    fireEvent.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(window.localStorage.getItem('concert-hall-search-recent-keywords')).toContain('홍대');
    });

    fireEvent.change(keywordInput, {
      target: { value: '' },
    });
    focusKeywordInput();
    fireEvent.click(screen.getByRole('button', { name: '홍대 검색' }));

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ keyword: '홍대' }),
      );
    });

    fireEvent.change(keywordInput, {
      target: { value: '' },
    });
    focusKeywordInput();
    fireEvent.click(screen.getByRole('button', { name: '홍대 삭제' }));
    expect(screen.queryByRole('button', { name: '홍대 검색' })).toBeNull();

    fireEvent.change(keywordInput, {
      target: { value: '합정' },
    });
    fireEvent.click(screen.getByRole('button', { name: '검색' }));
    fireEvent.change(keywordInput, {
      target: { value: '' },
    });
    focusKeywordInput();
    const clearAllButton = screen.getByRole('button', { name: '전체 삭제' });
    expect(fireEvent.mouseDown(clearAllButton)).toBe(false);
    fireEvent.click(clearAllButton);
    expect(screen.getByText('최근 검색어를 모두 삭제하시겠어요?')).not.toBeNull();
    const cancelButton = screen.getByRole('button', { name: '취소하기' });
    fireEvent.mouseDown(cancelButton);
    fireEvent.click(cancelButton);

    expect(screen.queryByText('최근 검색어를 모두 삭제하시겠어요?')).toBeNull();
    const reopenedClearAllButton = screen.getByRole('button', { name: '전체 삭제' });
    expect(fireEvent.mouseDown(reopenedClearAllButton)).toBe(false);
    fireEvent.click(reopenedClearAllButton);

    const confirmButton = screen.getByRole('button', { name: '삭제하기' });
    fireEvent.mouseDown(confirmButton);
    fireEvent.click(confirmButton);

    expect((keywordInput as HTMLInputElement).value).toBe('');
    expect(screen.getByRole('button', { name: '합정/상수 검색' })).not.toBeNull();
    expect(window.localStorage.getItem('concert-hall-search-recent-keywords')).toBe('[]');
  });

  it('상세 정보를 불러오는 동안 로딩 상태를 표시한다', async () => {
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(await screen.findByText('공연장 상세 정보를 불러오는 중입니다.')).not.toBeNull();
  });

  it('데스크탑에서 상세 aside가 우측에서 슬라이드되어 나타난다', async () => {
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    const detailAside = await screen.findByRole('complementary');
    expect(getCssTextForElement(detailAside)).toContain('animation');
  });

  it('상세 정보 조회 실패 상태를 표시한다', async () => {
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockDetailRefetch,
    });

    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(await screen.findByText('공연장 상세 정보를 불러오지 못했어요.')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));
    expect(mockDetailRefetch).toHaveBeenCalledTimes(1);
  });

  it('탭 데이터가 없으면 Coming Soon과 정보 갱신일을 표시한다', async () => {
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: { ...detail, hasHomeTabData: false, hasRentalTabData: false },
      isLoading: false,
      isError: false,
      refetch: mockDetailRefetch,
    });
    renderConcertHallSearchPage();
    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(await screen.findByText('COMING SOON')).not.toBeNull();
    expect(screen.getByText(/2026\.08\.07/)).not.toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: '대관 정보' }));
    expect(screen.getByText('COMING SOON')).not.toBeNull();
  });

  it('주소를 복사하고 누락된 연락처를 선택하면 안내한다', async () => {
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: {
        ...detail,
        head: {
          ...detail.head,
          contact: { websiteUrl: detail.head.contact.websiteUrl },
        },
      },
      isLoading: false,
      isError: false,
      refetch: mockDetailRefetch,
    });
    renderConcertHallSearchPage();
    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    fireEvent.click(await screen.findByRole('button', { name: '복사' }));
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('서울 마포구 와우산로 지하 1층');
    });
    fireEvent.click(screen.getByRole('button', { name: '전화 걸기' }));
    expect(mockInfoToast).toHaveBeenCalledWith('등록된 연락처 정보가 없어요.');
  });

  it('공유 버튼으로 공연장 링크를 복사한다', async () => {
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    fireEvent.click(await screen.findByRole('button', { name: '공연장 링크 공유' }));

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('https://place.boolti.in/alive');
    });
    expect(mockSuccessToast).toHaveBeenCalledWith('공연장 링크를 복사했어요.');
  });

  it('공유 API를 지원하면 공연장 공개 프로필을 네이티브 공유한다', async () => {
    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: mockShare,
    });
    mockShare.mockResolvedValue(undefined);
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    fireEvent.click(await screen.findByRole('button', { name: '공연장 링크 공유' }));

    await waitFor(() => {
      expect(mockShare).toHaveBeenCalledWith({
        title: '얼라이브홀',
        url: 'https://place.boolti.in/alive',
      });
    });
    expect(mockWriteText).not.toHaveBeenCalled();
  });

  it('상세 소개와 사진을 더 보기로 확장하고 지하철 노선과 지도를 표시한다', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: () => 281,
    });
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(await screen.findByRole('tab', { name: '홈' })).not.toBeNull();
    expect(screen.getByRole('tab', { name: '대관 정보' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '웹사이트 열기' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '전화 걸기' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '메일 보내기' })).not.toBeNull();
    expect(await screen.findByLabelText('합정 2호선')).not.toBeNull();
    expect(screen.getByLabelText('얼라이브홀 지도')).not.toBeNull();
    expect(screen.getByRole('button', { name: '지도 앱에서 보기' })).not.toBeNull();
    expect(screen.getByText('평일 800,000원~')).not.toBeNull();
    expect(screen.getAllByText('좌석 80석 · 스탠딩 100명')).toHaveLength(2);

    const introduction = screen.getByText(/대기실과 관객 동선이 분리/);
    expect(window.getComputedStyle(introduction.parentElement as HTMLElement).maxHeight).toBe(
      '280px',
    );
    fireEvent.click(screen.getByRole('button', { name: '내용 더 보기' }));
    expect(window.getComputedStyle(introduction.parentElement as HTMLElement).maxHeight).toBe(
      'none',
    );

    expect(screen.queryByRole('dialog', { name: '얼라이브홀 사진 갤러리' })).toBeNull();
    mockUseConcertHallSearchImages.mockReturnValue({
      data: { items: allImages },
      isLoading: false,
      isError: false,
    });
    fireEvent.click(screen.getByRole('button', { name: '사진 1장 더 보기' }));
    await waitFor(() => {
      expect(mockUseConcertHallSearchImages).toHaveBeenLastCalledWith(1, true);
    });
    expect(screen.getByRole('dialog', { name: '얼라이브홀 사진 갤러리' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '사진 6 크게 보기' })).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '갤러리 닫기' }));

    fireEvent.click(screen.getByRole('tab', { name: '대관 정보' }));
    expect(screen.getByText('홈페이지 예약')).not.toBeNull();
    expect(screen.getByText('4시간 기준')).not.toBeNull();
    expect(screen.getByText('평일')).not.toBeNull();
    expect(screen.getByText('800,000원')).not.toBeNull();
    expect(screen.getByText('부가세 별도')).not.toBeNull();
    expect(screen.getByText('음향 엔지니어')).not.toBeNull();
    expect(screen.getByText('50,000원')).not.toBeNull();
  });

  it('대관 정보를 박스와 요금 행 구조로 표시한다', async () => {
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: {
        ...detail,
        rental: {
          ...detail.rental,
          rentalMethod: '홈페이지 예약\n담당자 확인 후 확정',
          rentalFees: [
            { id: 2, dayType: 'WEEKEND', dayTypeName: '주말', fee: 1000000, sequence: 1 },
            { id: 1, dayType: 'WEEKDAY', dayTypeName: '평일', fee: 800000, sequence: 0 },
          ],
        },
      },
      isLoading: false,
      isError: false,
      refetch: mockDetailRefetch,
    });
    renderConcertHallSearchPage();
    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    fireEvent.click(await screen.findByRole('tab', { name: '대관 정보' }));

    const rentalMethod = screen.getByText(/\ud648\ud398\uc774\uc9c0 \uc608\uc57d/);
    expect(window.getComputedStyle(rentalMethod).whiteSpace).toBe('pre-wrap');
    expect(screen.getByText('4시간 기준')).not.toBeNull();
    expect(screen.getByText('4시간')).not.toBeNull();
    expect(screen.getByText('부가세 별도')).not.toBeNull();
    expect(screen.getByText('평일').compareDocumentPosition(screen.getAllByText('주말')[0])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(screen.getByText('800,000원')).not.toBeNull();
    expect(screen.getByText('1,000,000원 / 1시간')).not.toBeNull();
    expect(screen.getByText('대관 시간 외 별도 시간 추가 시 발생하는 비용입니다.')).not.toBeNull();
    expect(screen.getByText('음향 엔지니어')).not.toBeNull();
    expect(screen.getByText('50,000원')).not.toBeNull();
    expect(screen.getByText('공연 2주 전 예약 확정이 필요합니다.').closest('li')).not.toBeNull();
  });

  it('대관 데이터가 있으면 플래그가 없어도 대관 정보를 표시한다', async () => {
    const detailWithoutRentalFlag = {
      ...detail,
      hasRentalTabData: undefined,
    };
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: detailWithoutRentalFlag,
      isLoading: false,
      isError: false,
      refetch: mockDetailRefetch,
    });
    renderConcertHallSearchPage();
    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    fireEvent.click(await screen.findByRole('tab', { name: '대관 정보' }));

    expect(screen.queryByText('COMING SOON')).toBeNull();
    expect(screen.getByText('홈페이지 예약')).not.toBeNull();
  });

  it('보유 악기가 280px을 넘으면 접었다가 더 보기로 펼친다', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: () => 281,
    });
    renderConcertHallSearchPage();
    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    fireEvent.click(await screen.findByRole('tab', { name: '대관 정보' }));

    const instruments = screen.getByText('드럼, 기타, 베이스');
    expect(window.getComputedStyle(instruments.parentElement as HTMLElement).maxHeight).toBe(
      '280px',
    );
    fireEvent.click(screen.getByRole('button', { name: '내용 더 보기' }));
    expect(window.getComputedStyle(instruments.parentElement as HTMLElement).maxHeight).toBe(
      'none',
    );
  });

  it('대관 데이터가 일부만 있으면 값이 있는 섹션만 표시한다', async () => {
    mockUseConcertHallSearchDetail.mockReturnValue({
      data: {
        ...detail,
        rental: {
          rentalTime: { rentalTimeHours: 3, isEngineerBreakIncluded: true },
        },
      },
      isLoading: false,
      isError: false,
      refetch: mockDetailRefetch,
    });
    renderConcertHallSearchPage();
    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    fireEvent.click(await screen.findByRole('tab', { name: '대관 정보' }));

    expect(screen.getByText('엔지니어 휴식 1시간이 포함된 시간입니다.')).not.toBeNull();
    expect(screen.getByText('3시간')).not.toBeNull();
    expect(screen.queryByRole('heading', { name: '대관 방법' })).toBeNull();
    expect(screen.queryByRole('heading', { name: '대관료' })).toBeNull();
    expect(screen.queryByRole('heading', { name: '보유 악기' })).toBeNull();
  });

  it('갤러리 실패를 재시도하고 Escape로 갤러리와 상세를 순서대로 닫는다', async () => {
    mockUseConcertHallSearchImages.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockImagesRefetch,
    });
    renderConcertHallSearchPage();
    const selectedCard = screen.getByRole('button', { name: /얼라이브홀 상세 보기/ });
    fireEvent.click(selectedCard);

    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(await screen.findByRole('button', { name: '사진 1장 더 보기' }));
    expect(await screen.findByText('사진을 불러오지 못했어요.')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));
    expect(mockImagesRefetch).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: '얼라이브홀 사진 갤러리' })).toBeNull();
    expect(screen.getByRole('complementary')).not.toBeNull();
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('complementary')).toBeNull());
    expect(document.body.style.overflow).toBe('');
    await waitFor(() => expect(document.activeElement).toBe(selectedCard));
  });

  it('알 수 없는 지하철 노선 키가 와도 노선명으로 상세 정보를 표시한다', async () => {
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));

    expect(await screen.findByLabelText('합정 2호선')).not.toBeNull();
    expect(screen.getByText('2호선')).not.toBeNull();
  });

  it('상세 배경을 클릭하면 상세 패널을 닫는다', async () => {
    renderConcertHallSearchPage();

    fireEvent.click(screen.getByRole('button', { name: /얼라이브홀 상세 보기/ }));
    expect(await screen.findByText(/홍대 인근의 라이브 공연장입니다/)).not.toBeNull();

    fireEvent.click(screen.getByLabelText('상세 배경'));

    await waitFor(() => {
      expect(screen.queryByText(/홍대 인근의 라이브 공연장입니다/)).toBeNull();
    });
  });

  it('검색 결과가 없으면 공연장 개수와 정렬 영역을 표시하지 않는다', () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: { items: [], totalElements: 0, hasNext: false, currentPage: 0, totalPages: 0 },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderConcertHallSearchPage('/concert-halls?keyword=없는공연장');

    expect(screen.getByText('찾으시는 공연장이 없어요.')).not.toBeNull();
    expect(screen.queryByText('공연장')).toBeNull();
    expect(screen.queryByRole('group', { name: '공연장 정렬' })).toBeNull();
    expect(screen.queryByLabelText('정렬 대관료 낮은 순', { selector: 'button' })).toBeNull();
  });

  it('추천 지역과 검색 조건으로 검색한 결과가 없으면 조건 변경 안내와 필터 초기화만 표시한다', () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: { items: [], totalElements: 0, hasNext: false, currentPage: 0, totalPages: 0 },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderConcertHallSearchPage('/concert-halls?regionId=1&rentalFeeMin=0&rentalFeeMax=200000');

    expect(screen.getByText('찾으시는 결과가 없어요.')).not.toBeNull();
    expect(screen.getByText('조건을 변경해 보세요.')).not.toBeNull();
    expect(screen.getByRole('button', { name: '필터 초기화' })).not.toBeNull();
    expect(screen.queryByRole('button', { name: '입점 요청하기' })).toBeNull();
    expect(screen.queryByText('찾으시는 공연장이 없어요.')).toBeNull();
  });

  it('빈 결과에서 입점 요청을 보낼 수 있다', async () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: { items: [], totalElements: 0, hasNext: false, currentPage: 0, totalPages: 0 },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderConcertHallSearchPage('/concert-halls?keyword=없는공연장');

    expect(screen.getByText('찾으시는 공연장이 없어요.')).not.toBeNull();
    expect(screen.getByText('입점을 요청해 보세요.')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: '입점 요청하기' }));
    fireEvent.change(screen.getByLabelText('공연장명'), { target: { value: '없는공연장' } });
    fireEvent.click(screen.getByRole('button', { name: '요청하기' }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({ name: '없는공연장' });
    });
    expect(mockSuccessToast).toHaveBeenCalledWith('입점 요청을 보냈어요.');
  });

  it('입점 요청 실패 시 에러 토스트를 표시하고 모달을 유지한다', async () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: { items: [], totalElements: 0, hasNext: false, currentPage: 0, totalPages: 0 },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
    mockMutateAsync.mockRejectedValue(new Error('failed'));

    renderConcertHallSearchPage('/concert-halls?keyword=없는공연장');

    fireEvent.click(screen.getByRole('button', { name: '입점 요청하기' }));
    fireEvent.change(screen.getByLabelText('공연장명'), { target: { value: '없는공연장' } });
    fireEvent.click(screen.getByRole('button', { name: '요청하기' }));

    await waitFor(() => {
      expect(mockErrorToast).toHaveBeenCalledWith(
        '입점 요청에 실패했어요. 잠시 후 다시 시도해 주세요.',
      );
    });
    expect(screen.getByLabelText('공연장명')).not.toBeNull();
  });

  it('공연장 목록을 불러오는 동안 로딩 메시지를 표시하지 않는다', () => {
    mockUseConcertHallSearchList.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    });

    renderConcertHallSearchPage();

    expect(screen.queryByText('공연장을 불러오는 중입니다.')).toBeNull();
  });

  it('다음 페이지를 불러오는 동안 기존 공연장 목록을 유지한다', async () => {
    mockUseConcertHallSearchList.mockImplementation((params) => ({
      data:
        params.page === 0
          ? { items: concertHalls, totalElements: 2, hasNext: true, currentPage: 0, totalPages: 2 }
          : undefined,
      isLoading: params.page === 1,
      isError: false,
      refetch: vi.fn(),
    }));

    renderConcertHallSearchPage();

    act(() => {
      intersectionObserverCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 1 }),
      );
    });
    expect(screen.getByText('얼라이브홀')).not.toBeNull();
  });

  it('다음 페이지를 불러오는 동안 전체 공연장 개수를 유지한다', async () => {
    mockUseConcertHallSearchList.mockImplementation((params) => ({
      data:
        params.page === 0
          ? { items: concertHalls, totalElements: 26, hasNext: true, currentPage: 0, totalPages: 3 }
          : undefined,
      isLoading: params.page === 1,
      isError: false,
      refetch: vi.fn(),
    }));

    renderConcertHallSearchPage();

    expect(screen.getByText('26개')).not.toBeNull();
    act(() => {
      intersectionObserverCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 1 }),
      );
    });
    expect(screen.getByText('26개')).not.toBeNull();
  });

  it('목록 하단이 보이면 다음 페이지 공연장을 자동으로 이어서 불러온다', async () => {
    mockUseConcertHallSearchList.mockImplementation((params) => ({
      data:
        params.page === 0
          ? { items: concertHalls, totalElements: 2, hasNext: true, currentPage: 0, totalPages: 2 }
          : {
              items: [concertHalls[0], nextPageConcertHall],
              totalElements: 2,
              hasNext: false,
              currentPage: 1,
              totalPages: 2,
            },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    }));

    renderConcertHallSearchPage();

    expect(screen.getByText('얼라이브홀')).not.toBeNull();
    expect(screen.queryByRole('button', { name: '더 보기' })).toBeNull();

    act(() => {
      intersectionObserverCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 1 }),
      );
    });
    expect(await screen.findByText('웨스트브릿지')).not.toBeNull();
    expect(screen.getByText('얼라이브홀')).not.toBeNull();
    expect(screen.getAllByText('얼라이브홀')).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: '대관료 높은 순' }));
    await waitFor(() => {
      expect(mockUseConcertHallSearchList).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 0, sort: 'FEE_DESC' }),
      );
      expect(screen.queryByText('웨스트브릿지')).toBeNull();
    });
  });
});
