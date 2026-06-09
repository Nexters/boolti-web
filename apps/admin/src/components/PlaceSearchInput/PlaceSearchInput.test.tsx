// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import breakpoint from '@boolti/ui/src/systems/breakpoint';
import palette from '@boolti/ui/src/systems/palette';
import typo from '@boolti/ui/src/systems/typo';
import { afterEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

// @boolti/ui transitively imports swiper, which Yarn PnP can't resolve in tests.
// Stub TextField — that's the only thing PlaceSearchInput uses from @boolti/ui.
vi.mock('@boolti/ui', () => ({
  TextField: React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { inputType?: string; size?: string }
  >(function StubTextField(props, ref) {
    const { inputType: _inputType, size: _size, ...rest } = props;
    return <input ref={ref} {...rest} />;
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
  };
});

import PlaceSearchInput from './index';
import * as useVenueSearchModule from '~/hooks/useVenueSearch';
import * as apiModule from '@boolti/api';

const theme = { palette, typo, breakpoint };

const renderWith = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('PlaceSearchInput', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('불티 검색 결과를 "불티 등록 공연장" 섹션 헤더 아래에 배지와 함께 표시', async () => {
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
        {
          source: 'kakao_place',
          placeName: '클럽 FF',
          category: '문화시설',
          addressName: '서울 마포구',
          roadAddressName: '서울 마포구 와우산로 13길 25',
          x: '126.92',
          y: '37.55',
        },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    vi.mocked(apiModule.useConcertHallProfile).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof apiModule.useConcertHallProfile>);

    renderWith(<PlaceSearchInput onSelect={vi.fn()} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    expect(screen.getByText('불티 등록 공연장')).not.toBeNull();
    expect(screen.getByText('외부 검색 결과')).not.toBeNull();
    expect(screen.getByText('불티 등록')).not.toBeNull();
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

    vi.mocked(apiModule.useConcertHallProfile).mockReturnValue({
      data: {
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
      },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof apiModule.useConcertHallProfile>);

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

  it('카카오 address 결과 선택 시 상세 주소 입력 활성', async () => {
    vi.spyOn(useVenueSearchModule, 'default').mockReturnValue({
      query: '와우산로',
      setQuery: vi.fn(),
      clearResults: vi.fn(),
      results: [
        {
          source: 'kakao_address',
          addressName: '서울 마포구 와우산로 18길 20',
          roadAddressName: '서울 마포구 와우산로 18길 20',
          x: '126.92',
          y: '37.55',
        },
      ],
      isLoading: false,
      errors: {},
    } as ReturnType<typeof useVenueSearchModule.default>);

    vi.mocked(apiModule.useConcertHallProfile).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof apiModule.useConcertHallProfile>);

    const handleSelect = vi.fn();
    renderWith(<PlaceSearchInput onSelect={handleSelect} />);
    fireEvent.focus(screen.getByPlaceholderText(/공연장명 또는 도로명 주소/));
    fireEvent.click(screen.getByText(/서울 마포구 와우산로 18길 20/));

    const detailInput = await screen.findByPlaceholderText('상세 주소를 입력해 주세요');
    expect((detailInput as HTMLInputElement).disabled).toBe(false);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'kakao_address',
      }),
    );
    const callArg = handleSelect.mock.calls[0][0];
    expect(callArg.concertHallId).toBeUndefined();
  });
});
