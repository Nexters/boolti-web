import { useConcertHallProfile, useNaverGeocode } from '@boolti/api';
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

const GEOCODE_FAILED_MESSAGE = '주소의 위치 정보를 가져오지 못했어요. 다른 주소로 다시 시도해 주세요.';

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
  const { query, setQuery, results, isLoading, clearResults } = useVenueSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedSnapshot | null>(null);
  const [detailAddress, setDetailAddress] = useState(initialDetailAddress ?? '');
  const [pendingBooltiId, setPendingBooltiId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailAddressInputRef = useRef<HTMLInputElement>(null);

  const profileQuery = useConcertHallProfile(pendingBooltiId);
  const geocode = useNaverGeocode();
  const dialog = useDialog();
  const toast = useToast();

  useEffect(() => {
    if (!selected && initialAddress) {
      const type: PlaceSelectType = initialConcertHallId ? 'boolti' : 'address';
      setSelected({
        type,
        placeName: initialPlaceName ?? '',
        streetAddress: initialAddress,
      });
      setQuery(initialPlaceName || initialAddress);
    }
  }, [initialAddress, initialPlaceName, initialConcertHallId, selected, setQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (pendingBooltiId == null) return;
    if (profileQuery.isLoading) return;

    const booltiResult = results.find(
      (r): r is Extract<VenueResult, { source: 'boolti' }> =>
        r.source === 'boolti' && r.concertHallId === pendingBooltiId,
    );
    if (!booltiResult) {
      setPendingBooltiId(null);
      return;
    }

    if (profileQuery.isError) {
      console.warn('[PlaceSearchInput] concert hall profile fetch failed', profileQuery.error);
    }

    const location = profileQuery.data?.head?.location;
    const streetAddress = location?.streetAddress || booltiResult.address;
    const detailAddr = location?.detailAddress ?? '';

    setSelected({
      type: 'boolti',
      placeName: booltiResult.name,
      streetAddress,
    });
    setDetailAddress(detailAddr);
    setQuery(booltiResult.name);
    setIsDropdownOpen(false);
    clearResults();

    onSelect({
      type: 'boolti',
      concertHallId: booltiResult.concertHallId,
      placeName: booltiResult.name,
      streetAddress,
      detailAddress: detailAddr,
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    });

    setPendingBooltiId(null);
  }, [
    pendingBooltiId,
    profileQuery.isLoading,
    profileQuery.isError,
    profileQuery.error,
    profileQuery.data,
    results,
    onSelect,
    setQuery,
    clearResults,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsDropdownOpen(true);
    if (selected) {
      setSelected(null);
      setDetailAddress('');
      onClear?.();
    }
  };

  const handleSelectBoolti = (concertHallId: number) => {
    setPendingBooltiId(concertHallId);
  };

  // 다음 우편번호 서비스로 선택한 도로명주소를 네이버 지오코딩으로 좌표 변환한다.
  const handleAddressComplete = useCallback(
    async (roadAddress: string) => {
      dialog.close();

      const coordinates = await geocode(roadAddress);
      if (!coordinates) {
        toast.error(GEOCODE_FAILED_MESSAGE);
        return;
      }

      setSelected({ type: 'address', placeName: '', streetAddress: roadAddress });
      setDetailAddress('');
      setQuery(roadAddress);
      setIsDropdownOpen(false);
      clearResults();

      onSelect({
        type: 'address',
        placeName: '',
        streetAddress: roadAddress,
        detailAddress: '',
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      setTimeout(() => detailAddressInputRef.current?.focus(), 0);
    },
    [dialog, geocode, toast, setQuery, clearResults, onSelect],
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

  const booltiResults = results.filter(
    (r): r is Extract<VenueResult, { source: 'boolti' }> => r.source === 'boolti',
  );

  const showDropdown = isDropdownOpen && query.trim() && !selected;

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
                    onClick={() => handleSelectBoolti(r.concertHallId)}
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
              value={
                selected.type === 'boolti' && detailAddress
                  ? `${selected.streetAddress} ${detailAddress}`
                  : selected.streetAddress
              }
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
