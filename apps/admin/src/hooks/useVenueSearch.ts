import { fetcher, WebHostConcertHallListResponse } from '@boolti/api';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 300;
const BOOLTI_PAGE_SIZE = 5;

export type VenueSource = 'boolti';

// 불티에 등록된 공연장 검색 결과. 등록되지 않은 공연장은 PlaceSearchInput의
// 다음 우편번호 서비스 + 네이버 지오코딩(주소 직접 검색)으로 처리한다.
export type VenueResult = {
  source: 'boolti';
  concertHallId: number;
  name: string;
  address: string;
};

// fetcher (ky) automatically attaches the access token and refreshes on 401.
const fetchBoolti = async (keyword: string, signal: AbortSignal): Promise<VenueResult[]> => {
  const data = await fetcher.get<WebHostConcertHallListResponse>('web/v1/host/concert-halls', {
    searchParams: { keyword, page: 0, size: BOOLTI_PAGE_SIZE },
    signal,
  });
  return data.items.map((item) => ({
    source: 'boolti' as const,
    concertHallId: item.id,
    name: item.name,
    address: [item.streetAddress, item.detailAddress].filter(Boolean).join(' ') || item.address || '',
  }));
};

interface UseVenueSearchOptions {
  /**
   * false면 검색하지 않는다. 공연장을 이미 선택해 입력창에 공연장명/주소가 들어 있을 때
   * 그 값으로 다시 검색하지 않도록 끈다.
   */
  enabled?: boolean;
}

const useVenueSearch = ({ enabled = true }: UseVenueSearchOptions = {}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VenueResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<VenueSource, Error>>>({});
  const abortRef = useRef<AbortController | null>(null);

  const cancelInFlight = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  useEffect(() => {
    if (!enabled) {
      cancelInFlight();
      setIsLoading(false);
      return;
    }

    const keyword = query.trim();
    if (!keyword) {
      cancelInFlight();
      setResults([]);
      setIsLoading(false);
      setErrors({});
      return;
    }

    const timer = setTimeout(async () => {
      cancelInFlight();
      const controller = new AbortController();
      abortRef.current = controller;
      setIsLoading(true);
      setErrors({});

      try {
        const booltiResults = await fetchBoolti(keyword, controller.signal);
        if (controller.signal.aborted) return;
        setResults(booltiResults);
      } catch (error) {
        if (controller.signal.aborted) return;
        setResults([]);
        setErrors({ boolti: error instanceof Error ? error : new Error(String(error)) });
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query, enabled, cancelInFlight]);

  useEffect(() => cancelInFlight, [cancelInFlight]);

  // 결과만 비운다. 입력창 값(query)은 건드리지 않는다.
  const clearResults = useCallback(() => {
    cancelInFlight();
    setResults([]);
    setErrors({});
    setIsLoading(false);
  }, [cancelInFlight]);

  return { query, setQuery, clearResults, results, isLoading, errors };
};

export default useVenueSearch;
