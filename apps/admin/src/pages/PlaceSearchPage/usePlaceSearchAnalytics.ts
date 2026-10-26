import {
  type SearchSource,
  trackClick,
  trackImpression,
  trackSearch,
  trackViewScreen,
} from '@boolti/analytics';
import { useEffect, useRef } from 'react';

type FilterType = 'Region' | 'RentalFee' | 'Capacity';

type FilterSnapshot = Record<FilterType, string | null>;

interface Params {
  keyword: string;
  regionName?: string;
  regionId?: number;
  rentalFeeMin?: number;
  rentalFeeMax?: number;
  capacityMin?: number;
  capacityMax?: number;
  searchConditionsKey: string;
  hasSearchConditions: boolean;
  /** 현재 검색 조건의 첫 페이지 응답을 받았을 때만 true */
  isFirstPageLoaded: boolean;
  totalElements: number;
}

/** 대관료: '{min}-{max}', 상한 없음 '500000-', 하한 없음 '-100000' */
const formatRentalFee = (min?: number, max?: number) =>
  min == null && max == null ? null : `${min ?? ''}-${max ?? ''}`;

/** 수용 인원: '50-100', 상한 없음 '300~', 하한 없음 '~50' */
const formatCapacity = (min?: number, max?: number) => {
  if (min != null && max != null) return `${min}-${max}`;
  if (max != null) return `~${max}`;
  if (min != null) return `${min}~`;
  return null;
};

const getViewSource = () => new URLSearchParams(window.location.search).get('source') ?? 'Direct';

const usePlaceSearchAnalytics = ({
  keyword,
  regionName,
  regionId,
  rentalFeeMin,
  rentalFeeMax,
  capacityMin,
  capacityMax,
  searchConditionsKey,
  hasSearchConditions,
  isFirstPageLoaded,
  totalElements,
}: Params) => {
  const searchSourceRef = useRef<SearchSource>('Direct');
  const trackedSearchConditionsKeyRef = useRef<string | null>(null);
  const appliedFiltersRef = useRef<FilterSnapshot>({
    Region: null,
    RentalFee: null,
    Capacity: null,
  });

  const filters: FilterSnapshot = {
    Region: regionId != null ? regionName ?? String(regionId) : null,
    RentalFee: formatRentalFee(rentalFeeMin, rentalFeeMax),
    Capacity: formatCapacity(capacityMin, capacityMax),
  };
  const filterCount = Object.values(filters).filter((value) => value != null).length;
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    trackViewScreen('PlaceSearch', { source: getViewSource() });
  }, []);

  useEffect(() => {
    if (!isFirstPageLoaded || trackedSearchConditionsKeyRef.current === searchConditionsKey) return;
    trackedSearchConditionsKeyRef.current = searchConditionsKey;

    const currentFilters = filtersRef.current;
    const previousFilters = appliedFiltersRef.current;
    appliedFiltersRef.current = currentFilters;

    (Object.keys(currentFilters) as FilterType[]).forEach((filterType) => {
      const filterValue = currentFilters[filterType];
      if (filterValue == null || filterValue === previousFilters[filterType]) return;

      trackClick('PlaceSearch', 'Button', 'ApplyFilter', {
        filter_type: filterType,
        filter_value: filterValue,
      });
    });

    if (!hasSearchConditions) return;

    const searchKeyword = keyword || currentFilters.Region || '';
    const filterProperties = {
      filter_region: currentFilters.Region,
      filter_price: currentFilters.RentalFee,
      filter_capacity: currentFilters.Capacity,
      filter_count: filterCount,
    };

    trackSearch('PlaceSearch', searchKeyword, {
      search_source: searchSourceRef.current,
      result_count: totalElements,
      ...filterProperties,
    });
    searchSourceRef.current = 'Direct';

    if (totalElements === 0) {
      trackImpression('PlaceSearch', 'Section', 'NoResult', {
        search_keyword: searchKeyword,
        filter_count: filterCount,
        filter_value: Object.values(currentFilters)
          .filter((value) => value != null)
          .join(','),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstPageLoaded, searchConditionsKey]);

  return {
    setSearchSource: (source: SearchSource) => {
      searchSourceRef.current = source;
    },
    trackFilterChip: (filterType: FilterType) => {
      trackClick('PlaceSearch', 'Chip', 'Filter', { filter_type: filterType });
    },
    trackAutoComplete: (selectedKeyword: string) => {
      searchSourceRef.current = 'AutoComplete';
      trackClick('PlaceSearch', 'Item', 'AutoComplete', { keyword: selectedKeyword });
    },
    trackRecommendedRegion: (selectedKeyword: string) => {
      searchSourceRef.current = 'RecommendedRegion';
      trackClick('PlaceSearch', 'Chip', 'RecommendedRegion', { keyword: selectedKeyword });
    },
    trackResetFilter: () => {
      trackClick('PlaceSearch', 'Button', 'ResetFilter');
    },
    trackResultItemClick: (placeId: number, itemRank: number) => {
      trackClick('PlaceSearch', 'Item', placeId, {
        item_rank: itemRank,
        filter_count: filterCount,
      });
    },
  };
};

export type { FilterType };
export default usePlaceSearchAnalytics;
