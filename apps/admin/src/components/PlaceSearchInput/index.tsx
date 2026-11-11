import { queryKeys, useNaverGeocode, useQueryClient } from '@boolti/api';
import { SearchIcon } from '@boolti/icon';
import { TextField, useDialog, useToast } from '@boolti/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

import useVenueSearch, { VenueResult } from '~/hooks/useVenueSearch';

import AddressSearchDialogContent from './AddressSearchDialogContent';
import Styled from './PlaceSearchInput.styles';

export type PlaceSelectType = 'boolti' | 'address';

export interface PlaceSelectResult {
  type: PlaceSelectType;
  concertHallId?: number;
  placeName: string;
  streetAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

interface PlaceSearchInputProps {
  initialPlaceName?: string;
  initialAddress?: string;
  initialDetailAddress?: string;
  initialConcertHallId?: number;
  disabled?: boolean;
  errorMessage?: string;
  onSelect: (result: PlaceSelectResult) => void;
  onClear?: () => void;
  onDetailAddressChange?: (value: string) => void;
}

interface SelectedSnapshot {
  type: PlaceSelectType;
  placeName: string;
  streetAddress: string;
}

type BooltiVenueResult = Extract<VenueResult, { source: 'boolti' }>;

const GEOCODE_FAILED_MESSAGE = '주소의 위치 정보를 가져오지 못했어요. 다른 주소로 다시 시도해 주세요.';
const PROFILE_FAILED_MESSAGE = '공연장 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.';
const PROFILE_STALE_TIME_MS = 60_000;

const joinAddress = (streetAddress: string, detailAddress: string) =>
  [streetAddress, detailAddress].filter(Boolean).join(' ');

const PlaceSearchInput = ({
  initialPlaceName,
  initialAddress,
  initialDetailAddress,
  initialConcertHallId,
  disabled,
  errorMessage,
  onSelect,
  onClear,
  onDetailAddressChange,
}: PlaceSearchInputProps) => {
  const [selected, setSelected] = useState<SelectedSnapshot | null>(null);
  const [isResolvingBoolti, setIsResolvingBoolti] = useState(false);
  // 공연장이 선택돼 있거나 프로필을 불러오는 중이면 입력창 값으로 다시 검색하지 않는다.
  const { query, setQuery, results, isLoading, clearResults } = useVenueSearch({
    enabled: !selected && !isResolvingBoolti,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [detailAddress, setDetailAddress] = useState(initialDetailAddress ?? '');
  const containerRef = useRef<HTMLDivElement>(null);
  const detailAddressInputRef = useRef<HTMLInputElement>(null);
  // 불티 공연장 선택은 비동기라, 그 사이 다른 선택이나 입력이 생기면 늦게 온 응답을 버린다.
  const selectRequestIdRef = useRef(0);
  // 부모가 매 렌더마다 새 콜백을 넘겨도 비동기 흐름이 최신 콜백을 쓰게 한다.
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const queryClient = useQueryClient();
  const geocode = useNaverGeocode();
  const dialog = useDialog();
  const toast = useToast();

  // 수정 화면처럼 폼 값이 나중에 채워지는 경우, 선택 상태를 폼 값으로 맞춘다.
  useEffect(() => {
    if (selected || !initialAddress) return;
    setSelected({
      type: initialConcertHallId ? 'boolti' : 'address',
      placeName: initialPlaceName ?? '',
      streetAddress: initialAddress,
    });
    setDetailAddress(initialDetailAddress ?? '');
    setQuery(initialPlaceName || initialAddress);
  }, [initialAddress, initialPlaceName, initialDetailAddress, initialConcertHallId, selected, setQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectRequestIdRef.current += 1;
    setIsResolvingBoolti(false);
    setQuery(e.target.value);
    setIsDropdownOpen(true);
    if (selected) {
      setSelected(null);
      setDetailAddress('');
      onClear?.();
    }
  };

  // 불티 공연장 선택. 프로필(좌표, 도로명/상세 주소)은 클릭 시점에 한 번만 조회한다.
  // useQuery 대신 fetchQuery를 쓰는 이유: 조회 실패가 전역 에러 바운더리로 던져지지 않게 하고,
  // 검색 결과(results) 변화에 반응하는 effect 없이 클릭 한 번에 선택이 끝나게 하기 위해서다.
  const handleSelectBoolti = async (venue: BooltiVenueResult) => {
    const requestId = ++selectRequestIdRef.current;
    setIsDropdownOpen(false);
    setIsResolvingBoolti(true);
    setQuery(venue.name);
    clearResults();

    let location: { streetAddress?: string; detailAddress?: string; latitude?: number; longitude?: number } | undefined;
    try {
      const profile = await queryClient.fetchQuery({
        ...queryKeys.concertHall.profile(venue.concertHallId),
        staleTime: PROFILE_STALE_TIME_MS,
      });
      location = profile.head?.location;
    } catch (error) {
      console.warn('[PlaceSearchInput] concert hall profile fetch failed', error);
    }

    if (requestId !== selectRequestIdRef.current) return;

    const streetAddress = location?.streetAddress || venue.address;
    const detailAddr = location?.streetAddress ? location.detailAddress ?? '' : '';

    // 프로필에 좌표가 없거나 조회에 실패하면 주소로 좌표를 구한다.
    let latitude = location?.latitude;
    let longitude = location?.longitude;
    if (latitude == null || longitude == null) {
      const coordinates = streetAddress ? await geocode(streetAddress) : null;
      if (requestId !== selectRequestIdRef.current) return;
      latitude = coordinates?.latitude;
      longitude = coordinates?.longitude;
    }

    setIsResolvingBoolti(false);

    if (latitude == null || longitude == null) {
      toast.error(PROFILE_FAILED_MESSAGE);
      return;
    }

    setSelected({ type: 'boolti', placeName: venue.name, streetAddress });
    setDetailAddress(detailAddr);

    onSelectRef.current({
      type: 'boolti',
      concertHallId: venue.concertHallId,
      placeName: venue.name,
      streetAddress,
      detailAddress: detailAddr,
      latitude,
      longitude,
    });
  };

  // 다음 우편번호 서비스로 선택한 도로명주소를 네이버 지오코딩으로 좌표 변환한다.
  const handleAddressComplete = useCallback(
    async (roadAddress: string) => {
      dialog.close();
      const requestId = ++selectRequestIdRef.current;

      const coordinates = await geocode(roadAddress);
      if (requestId !== selectRequestIdRef.current) return;
      if (!coordinates) {
        toast.error(GEOCODE_FAILED_MESSAGE);
        return;
      }

      setSelected({ type: 'address', placeName: '', streetAddress: roadAddress });
      setDetailAddress('');
      setQuery(roadAddress);
      setIsDropdownOpen(false);
      clearResults();

      onSelectRef.current({
        type: 'address',
        placeName: '',
        streetAddress: roadAddress,
        detailAddress: '',
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      setTimeout(() => detailAddressInputRef.current?.focus(), 0);
    },
    [dialog, geocode, toast, setQuery, clearResults],
  );

  const openAddressSearch = () => {
    setIsDropdownOpen(false);
    dialog.open({
      title: '주소 찾기',
      width: '490px',
      content: <AddressSearchDialogContent onComplete={handleAddressComplete} />,
    });
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetailAddress(value);
    onDetailAddressChange?.(value);
  };

  const handleInputFocus = () => {
    if (!selected && query.trim()) setIsDropdownOpen(true);
  };

  const booltiResults = results.filter((r): r is BooltiVenueResult => r.source === 'boolti');

  const showDropdown = isDropdownOpen && query.trim() && !selected && !isResolvingBoolti;

  return (
    <div>
      <Styled.Container ref={containerRef}>
        <Styled.InputWrapper>
          <Styled.SearchInput
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="공연장명 또는 도로명 주소를 입력해 주세요"
            disabled={disabled}
            hasError={!!errorMessage && !selected}
          />
          <Styled.SearchIconWrapper>
            <SearchIcon />
          </Styled.SearchIconWrapper>
        </Styled.InputWrapper>

        {showDropdown && (
          <Styled.Dropdown>
            {booltiResults.length > 0 && (
              <>
                <Styled.SectionHeader>불티 등록 공연장</Styled.SectionHeader>
                {booltiResults.map((r) => (
                  <Styled.DropdownItem
                    key={`boolti-${r.concertHallId}`}
                    onClick={() => void handleSelectBoolti(r)}
                  >
                    <Styled.PlaceNameRow>
                      <Styled.PlaceName>{r.name}</Styled.PlaceName>
                      <Styled.BooltiBadge>불티 등록</Styled.BooltiBadge>
                    </Styled.PlaceNameRow>
                    <Styled.AddressName>{r.address}</Styled.AddressName>
                  </Styled.DropdownItem>
                ))}
              </>
            )}
            {isLoading && booltiResults.length === 0 && (
              <Styled.EmptyState>검색 중...</Styled.EmptyState>
            )}
            <Styled.SectionHeader>외부 검색 결과</Styled.SectionHeader>
            <Styled.DropdownItem onClick={openAddressSearch}>
              <Styled.PlaceNameRow>
                <Styled.PlaceName>주소로 직접 검색하기</Styled.PlaceName>
              </Styled.PlaceNameRow>
              <Styled.AddressName>
                등록되지 않은 공연장은 도로명 주소로 검색해 주세요
              </Styled.AddressName>
            </Styled.DropdownItem>
          </Styled.Dropdown>
        )}
      </Styled.Container>

      {selected && (
        <Styled.SelectedInfo>
          {selected.type === 'address' ? (
            <TextField
              ref={detailAddressInputRef}
              inputType="text"
              size="big"
              value={detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="상세 주소를 입력해 주세요"
              disabled={disabled}
            />
          ) : (
            <TextField
              inputType="text"
              size="big"
              value={joinAddress(selected.streetAddress, detailAddress)}
              disabled
              placeholder="-"
            />
          )}
        </Styled.SelectedInfo>
      )}

      {errorMessage && !selected && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
    </div>
  );
};

export default PlaceSearchInput;
