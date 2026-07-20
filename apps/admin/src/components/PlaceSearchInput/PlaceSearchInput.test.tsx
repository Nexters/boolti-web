// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import breakpoint from '@boolti/ui/src/systems/breakpoint';
import palette from '@boolti/ui/src/systems/palette';
import typo from '@boolti/ui/src/systems/typo';
import { afterEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

const { dialogOpenMock, dialogCloseMock, toastErrorMock, geocodeMock } = vi.hoisted(() => ({
  dialogOpenMock: vi.fn(),
  dialogCloseMock: vi.fn(),
  toastErrorMock: vi.fn(),
  geocodeMock: vi.fn(),
}));

// @boolti/ui transitively imports swiper, which Yarn PnP can't resolve in tests.
// Stub the pieces PlaceSearchInput uses from @boolti/ui.
vi.mock('@boolti/ui', () => ({
  TextField: React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { inputType?: string; size?: string }
  >(function StubTextField(props, ref) {
    // inputType/size는 커스텀 prop이라 DOM input에 넘기지 않도록 rest에서 제외한다.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inputType: _inputType, size: _size, ...rest } = props;
    return <input ref={ref} {...rest} />;
  }),
  useDialog: () => ({ open: dialogOpenMock, close: dialogCloseMock, isOpen: false, id: 'test' }),
  useToast: () => ({
    error: toastErrorMock,
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
  mq_lg: '@media (min-width: 1024px)',
  mq_md: '@media (min-width: 768px)',
}));

vi.mock('@boolti/icon', () => ({
  SearchIcon: () => null,
}));

vi.mock('~/hooks/useVenueSearch');
vi.mock('@boolti/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@boolti/api')>();
  return {
    ...actual,
    useConcertHallProfile: vi.fn(),
    useNaverGeocode: () => geocodeMock,
  };
});

import PlaceSearchInput from './index';
import * as useVenueSearchModule from '~/hooks/useVenueSearch';
import * as apiModule from '@boolti/api';

const theme = { palette, typo, breakpoint };

const renderWith = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const mockConcertHallProfile = (
  data: unknown = undefined,
  overrides: Partial<{ isLoading: boolean; isError: boolean }> = {},
) => {
  vi.mocked(apiModule.useConcertHallProfile).mockReturnValue({
    data,
    isLoading: false,
    isError: false,
    ...overrides,
  } as unknown as ReturnType<typeof apiModule.useConcertHallProfile>);
};

describe('PlaceSearchInput', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('불티 검색 결과를 "불티 등록 공연장" 섹션 헤더 아래에 배지와 함께 표시하고, 주소 직접 검색 진입점을 항상 제공', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '롤링홀',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [
        {
          source: 'boolti',
          concertHallId: 1,
          name: '롤링홀',
          address: '서울 마포구 와우산로 21길 19',
        },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    mockConcertHallProfile();

    renderWith(<PlaceSearchInput onSelect={vi.fn()} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    expect(screen.getByText('불티 등록 공연장')).not.toBeNull();
    expect(screen.getByText('불티 등록')).not.toBeNull();
    // 등록 안 된 공연장을 위한 주소 직접 검색 진입점은 항상 노출된다.
    expect(screen.getByText('주소로 직접 검색하기')).not.toBeNull();
  });

  it('불티 결과 클릭 시 getProfile 호출 후 onSelect에 concertHallId 포함', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '롤링홀',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [
        { source: 'boolti', concertHallId: 1, name: '롤링홀', address: '서울 마포구 와우산로 21길 19' },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    mockConcertHallProfile({
      id: 1,
      name: '롤링홀',
      head: {
        location: {
          streetAddress: '서울 마포구 와우산로 21길 19',
          detailAddress: '지하 1층',
          latitude: 37.55,
          longitude: 126.923,
        },
      },
    });

    const handleSelect = vi.fn();
    renderWith(<PlaceSearchInput onSelect={handleSelect} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    fireEvent.click(screen.getByText('롤링홀'));

    await waitFor(() => {
      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'boolti',
          concertHallId: 1,
          placeName: '롤링홀',
          streetAddress: '서울 마포구 와우산로 21길 19',
          detailAddress: '지하 1층',
          latitude: 37.55,
          longitude: 126.923,
        }),
      );
    });
  });

  it('"주소로 직접 검색하기" 클릭 시 주소 찾기 다이얼로그를 연다', () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '없는공연장',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    mockConcertHallProfile();

    renderWith(<PlaceSearchInput onSelect={vi.fn()} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    fireEvent.click(screen.getByText('주소로 직접 검색하기'));

    expect(dialogOpenMock).toHaveBeenCalledTimes(1);
  });

  it('주소 선택 완료 시 네이버 지오코딩 좌표로 onSelect(type: address) 호출 및 상세주소 입력 활성', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '없는공연장',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    mockConcertHallProfile();
    geocodeMock.mockResolvedValue({ latitude: 37.5, longitude: 127.0 });

    const handleSelect = vi.fn();
    renderWith(<PlaceSearchInput onSelect={handleSelect} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    fireEvent.click(screen.getByText('주소로 직접 검색하기'));

    // 다이얼로그에 넘긴 컨텐츠의 onComplete 콜백을 직접 호출해 주소 선택을 시뮬레이션한다.
    const openArg = dialogOpenMock.mock.calls[0][0];
    const onComplete = (openArg.content as React.ReactElement<{ onComplete: (a: string) => void }>)
      .props.onComplete;
    await act(async () => {
      await onComplete('서울 마포구 와우산로 18길 20');
    });

    expect(geocodeMock).toHaveBeenCalledWith('서울 마포구 와우산로 18길 20');
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'address',
        streetAddress: '서울 마포구 와우산로 18길 20',
        latitude: 37.5,
        longitude: 127.0,
      }),
    );
    const callArg = handleSelect.mock.calls[0][0];
    expect(callArg.concertHallId).toBeUndefined();

    const detailInput = await screen.findByPlaceholderText('상세 주소를 입력해 주세요');
    expect((detailInput as HTMLInputElement).disabled).toBe(false);
  });

  it('지오코딩 실패 시 토스트를 노출하고 onSelect를 호출하지 않는다', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '없는공연장',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    mockConcertHallProfile();
    geocodeMock.mockResolvedValue(null);

    const handleSelect = vi.fn();
    renderWith(<PlaceSearchInput onSelect={handleSelect} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    fireEvent.click(screen.getByText('주소로 직접 검색하기'));

    const openArg = dialogOpenMock.mock.calls[0][0];
    const onComplete = (openArg.content as React.ReactElement<{ onComplete: (a: string) => void }>)
      .props.onComplete;
    await act(async () => {
      await onComplete('서울 마포구 와우산로 18길 20');
    });

    expect(toastErrorMock).toHaveBeenCalled();
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
