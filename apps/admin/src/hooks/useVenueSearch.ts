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
const fetchBoolti = async (keyword: string): Promise<VenueResult[]> => {
  const data = await fetcher.get<WebHostConcertHallListResponse>('web/v1/host/concert-halls', {
    searchParams: { keyword, page: 0, size: BOOLTI_PAGE_SIZE },
  });
  return data.items.map((item) => ({
    source: 'boolti' as const,
    concertHallId: item.id,
    name: item.name,
    address: [item.streetAddress, item.detailAddress].filter(Boolean).join(' ') || item.address || '',
  }));
};

const useVenueSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VenueResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<VenueSource, Error>>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setResults([]);
      setIsLoading(false);
      setErrors({});
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setErrors({});

    try {
      const booltiResults = await fetchBoolti(keyword);
      if (controller.signal.aborted) return;
      setResults(booltiResults);
      setErrors({});
    } catch (error) {
      if (controller.signal.aborted) return;
      setResults([]);
      setErrors({ boolti: error instanceof Error ? error : new Error(String(error)) });
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void search(query);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setErrors({});
  }, []);

  return { query, setQuery, clearResults, results, isLoading, errors };
};

export default useVenueSearch;
