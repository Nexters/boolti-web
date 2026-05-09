import { useCallback, useEffect, useRef, useState } from 'react';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_LOCAL_KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_LOCAL_ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address.json';

const DEBOUNCE_MS = 300;

export interface KakaoKeywordResult {
  id: string;
  place_name: string;
  category_group_code: string;
  category_group_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  phone: string;
}

export interface KakaoAddressResult {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  } | null;
  road_address: {
    address_name: string;
    road_name: string;
    building_name: string;
  } | null;
}

export type PlaceSearchResultType = 'place' | 'address';

export interface PlaceSearchResult {
  type: PlaceSearchResultType;
  id: string;
  placeName: string;
  addressName: string;
  roadAddressName: string;
  x: string;
  y: string;
}

const searchKeyword = async (query: string): Promise<PlaceSearchResult[]> => {
  const url = new URL(KAKAO_LOCAL_KEYWORD_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('size', '5');

  const response = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
  });

  if (!response.ok) return [];

  const data = await response.json();
  return (data.documents as KakaoKeywordResult[]).map((doc) => ({
    type: 'place' as const,
    id: doc.id,
    placeName: doc.place_name,
    addressName: doc.address_name,
    roadAddressName: doc.road_address_name,
    x: doc.x,
    y: doc.y,
  }));
};

const searchAddress = async (query: string): Promise<PlaceSearchResult[]> => {
  const url = new URL(KAKAO_LOCAL_ADDRESS_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('size', '5');

  const response = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
  });

  if (!response.ok) return [];

  const data = await response.json();
  return (data.documents as KakaoAddressResult[]).map((doc, index) => ({
    type: 'address' as const,
    id: `addr-${index}-${doc.x}-${doc.y}`,
    placeName: '',
    addressName: doc.address?.address_name ?? doc.address_name,
    roadAddressName: doc.road_address?.address_name ?? doc.address_name,
    x: doc.x,
    y: doc.y,
  }));
};

const useKakaoLocalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    try {
      const [keywordResults, addressResults] = await Promise.all([
        searchKeyword(keyword),
        searchAddress(keyword),
      ]);

      const seenIds = new Set<string>();
      const merged: PlaceSearchResult[] = [];

      for (const result of keywordResults) {
        if (!seenIds.has(result.id)) {
          seenIds.add(result.id);
          merged.push(result);
        }
      }

      for (const result of addressResults) {
        if (!seenIds.has(result.id)) {
          seenIds.add(result.id);
          merged.push(result);
        }
      }

      setResults(merged.slice(0, 8));
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      search(query);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, search]);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    clearResults,
  };
};

export default useKakaoLocalSearch;
