import { SearchIcon } from '@boolti/icon';
import { TextField } from '@boolti/ui';
import { useEffect, useRef, useState } from 'react';

import useKakaoLocalSearch, {
  PlaceSearchResult,
  PlaceSearchResultType,
} from '~/hooks/useKakaoLocalSearch';

import Styled from './PlaceSearchInput.styles';

interface PlaceSearchInputProps {
  initialPlaceName?: string;
  initialAddress?: string;
  initialDetailAddress?: string;
  disabled?: boolean;
  errorMessage?: string;
  onSelect: (result: {
    type: PlaceSearchResultType;
    placeName: string;
    streetAddress: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
  }) => void;
  onClear?: () => void;
  onDetailAddressChange?: (value: string) => void;
}

const PlaceSearchInput = ({
  initialPlaceName,
  initialAddress,
  initialDetailAddress,
  disabled,
  errorMessage,
  onSelect,
  onClear,
  onDetailAddressChange,
}: PlaceSearchInputProps) => {
  const { query, setQuery, results, isLoading, clearResults } = useKakaoLocalSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<PlaceSearchResult | null>(null);
  const [streetAddress, setStreetAddress] = useState(initialAddress ?? '');
  const [detailAddress, setDetailAddress] = useState(initialDetailAddress ?? '');
  const containerRef = useRef<HTMLDivElement>(null);
  const detailAddressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedResult && initialAddress) {
      const isPlace = Boolean(initialPlaceName);
      setSelectedResult({
        type: isPlace ? 'place' : 'address',
        id: 'initial',
        placeName: initialPlaceName ?? '',
        category: '',
        addressName: initialAddress,
        roadAddressName: initialAddress,
        x: '0',
        y: '0',
      });
    }
  }, [initialPlaceName, initialAddress, selectedResult]);

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
    const value = e.target.value;
    setQuery(value);
    setIsDropdownOpen(true);

    if (selectedResult) {
      setSelectedResult(null);
      setStreetAddress('');
      setDetailAddress('');
      onClear?.();
    }
  };

  const handleSelect = (result: PlaceSearchResult) => {
    setSelectedResult(result);
    setIsDropdownOpen(false);
    clearResults();

    const address = result.roadAddressName || result.addressName;
    setStreetAddress(address);
    setDetailAddress('');

    if (result.type === 'place') {
      setQuery(result.placeName);

      onSelect({
        type: 'place',
        placeName: result.placeName,
        streetAddress: address,
        detailAddress: '',
        latitude: Number(result.y),
        longitude: Number(result.x),
      });
    } else {
      setQuery(address);

      onSelect({
        type: 'address',
        placeName: '',
        streetAddress: address,
        detailAddress: '',
        latitude: Number(result.y),
        longitude: Number(result.x),
      });

      setTimeout(() => {
        detailAddressInputRef.current?.focus();
      }, 0);
    }
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetailAddress(value);
    onDetailAddressChange?.(value);
  };

  const handleInputFocus = () => {
    if (!selectedResult && query.trim()) {
      setIsDropdownOpen(true);
    }
  };

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
            hasError={!!errorMessage && !selectedResult}
          />
          <Styled.SearchIconWrapper>
            <SearchIcon />
          </Styled.SearchIconWrapper>
        </Styled.InputWrapper>

        {isDropdownOpen && query.trim() && !selectedResult && (
          <Styled.Dropdown>
            {isLoading && results.length === 0 ? (
              <Styled.EmptyState>검색 중...</Styled.EmptyState>
            ) : results.length === 0 ? (
              <Styled.EmptyState>검색 결과가 없어요</Styled.EmptyState>
            ) : (
              results.map((result) => (
                <Styled.DropdownItem key={result.id} onClick={() => handleSelect(result)}>
                  <Styled.PlaceNameRow>
                    <Styled.PlaceName>
                      {result.type === 'place'
                        ? result.placeName
                        : result.roadAddressName || result.addressName}
                    </Styled.PlaceName>
                    {result.type === 'place' && result.category && (
                      <Styled.Category>{result.category}</Styled.Category>
                    )}
                  </Styled.PlaceNameRow>
                  {result.type === 'place' && (
                    <Styled.AddressName>
                      {result.roadAddressName || result.addressName}
                    </Styled.AddressName>
                  )}
                </Styled.DropdownItem>
              ))
            )}
          </Styled.Dropdown>
        )}
      </Styled.Container>

      {selectedResult && (
        <Styled.SelectedInfo>
          {selectedResult.type === 'place' ? (
            <TextField
              inputType="text"
              size="big"
              value={streetAddress}
              disabled
              placeholder="-"
            />
          ) : (
            <TextField
              ref={detailAddressInputRef}
              inputType="text"
              size="big"
              value={detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="상세 주소를 입력해 주세요"
              disabled={disabled}
            />
          )}
        </Styled.SelectedInfo>
      )}

      {errorMessage && !selectedResult && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}
    </div>
  );
};

export default PlaceSearchInput;
