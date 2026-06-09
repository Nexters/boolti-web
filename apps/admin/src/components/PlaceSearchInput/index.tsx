import { useConcertHallProfile } from '@boolti/api';
import { SearchIcon } from '@boolti/icon';
import { TextField } from '@boolti/ui';
import { useEffect, useRef, useState } from 'react';

import useVenueSearch, { VenueResult } from '~/hooks/useVenueSearch';

import Styled from './PlaceSearchInput.styles';

export type PlaceSelectType = 'boolti' | 'kakao_place' | 'kakao_address';

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

  useEffect(() => {
    if (!selected && initialAddress) {
      const type: PlaceSelectType = initialConcertHallId
        ? 'boolti'
        : initialPlaceName
          ? 'kakao_place'
          : 'kakao_address';
      setSelected({
        type,
        placeName: initialPlaceName ?? '',
        streetAddress: initialAddress,
      });
    }
  }, [initialAddress, initialPlaceName, initialConcertHallId, selected]);

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
      // eslint-disable-next-line no-console
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

  const handleSelectKakaoPlace = (
    result: Extract<VenueResult, { source: 'kakao_place' }>,
  ) => {
    const street = result.roadAddressName || result.addressName;
    setSelected({ type: 'kakao_place', placeName: result.placeName, streetAddress: street });
    setDetailAddress('');
    setQuery(result.placeName);
    setIsDropdownOpen(false);
    clearResults();
    onSelect({
      type: 'kakao_place',
      placeName: result.placeName,
      streetAddress: street,
      detailAddress: '',
      latitude: Number(result.y),
      longitude: Number(result.x),
    });
  };

  const handleSelectKakaoAddress = (
    result: Extract<VenueResult, { source: 'kakao_address' }>,
  ) => {
    const street = result.roadAddressName || result.addressName;
    setSelected({ type: 'kakao_address', placeName: '', streetAddress: street });
    setDetailAddress('');
    setQuery(street);
    setIsDropdownOpen(false);
    clearResults();
    onSelect({
      type: 'kakao_address',
      placeName: '',
      streetAddress: street,
      detailAddress: '',
      latitude: Number(result.y),
      longitude: Number(result.x),
    });
    setTimeout(() => detailAddressInputRef.current?.focus(), 0);
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
  const kakaoPlaceResults = results.filter(
    (r): r is Extract<VenueResult, { source: 'kakao_place' }> => r.source === 'kakao_place',
  );
  const kakaoAddressResults = results.filter(
    (r): r is Extract<VenueResult, { source: 'kakao_address' }> => r.source === 'kakao_address',
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
            {isLoading && results.length === 0 ? (
              <Styled.EmptyState>검색 중...</Styled.EmptyState>
            ) : results.length === 0 ? (
              <Styled.EmptyState>검색 결과가 없어요</Styled.EmptyState>
            ) : (
              <>
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
                {(kakaoPlaceResults.length > 0 || kakaoAddressResults.length > 0) && (
                  <>
                    <Styled.SectionHeader>외부 검색 결과</Styled.SectionHeader>
                    {kakaoPlaceResults.map((r, i) => (
                      <Styled.DropdownItem
                        key={`kp-${i}-${r.x}-${r.y}`}
                        onClick={() => handleSelectKakaoPlace(r)}
                      >
                        <Styled.PlaceNameRow>
                          <Styled.PlaceName>{r.placeName}</Styled.PlaceName>
                          {r.category && <Styled.Category>{r.category}</Styled.Category>}
                        </Styled.PlaceNameRow>
                        <Styled.AddressName>
                          {r.roadAddressName || r.addressName}
                        </Styled.AddressName>
                      </Styled.DropdownItem>
                    ))}
                    {kakaoAddressResults.map((r, i) => (
                      <Styled.DropdownItem
                        key={`ka-${i}-${r.x}-${r.y}`}
                        onClick={() => handleSelectKakaoAddress(r)}
                      >
                        <Styled.PlaceNameRow>
                          <Styled.PlaceName>{r.roadAddressName || r.addressName}</Styled.PlaceName>
                        </Styled.PlaceNameRow>
                      </Styled.DropdownItem>
                    ))}
                  </>
                )}
              </>
            )}
          </Styled.Dropdown>
        )}
      </Styled.Container>

      {selected && (
        <Styled.SelectedInfo>
          {selected.type === 'kakao_address' ? (
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
