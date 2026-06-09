import { fetcher, WebHostConcertHallListResponse } from '@boolti/api';
import { useCallback, useEffect, useRef, useState } from 'react';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_LOCAL_KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_LOCAL_ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address.json';

const DEBOUNCE_MS = 300;
const KAKAO_PAGE_SIZE = 5;
const BOOLTI_PAGE_SIZE = 5;

interface KakaoKeywordDoc {
  id: string;
  place_name: string;
  category_group_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface KakaoAddressDoc {
  address_name: string;
  x: string;
  y: string;
  address: { address_name: string } | null;
  road_address: { address_name: string } | null;
}

export type VenueSource = 'boolti' | 'kakao_place' | 'kakao_address';

export type VenueResult =
  | {
      source: 'boolti';
      concertHallId: number;
      name: string;
      address: string;
    }
  | {
      source: 'kakao_place';
      placeName: string;
      addressName: string;
      roadAddressName: string;
      category: string;
      x: string;
      y: string;
    }
  | {
      source: 'kakao_address';
      addressName: string;
      roadAddressName: string;
      x: string;
      y: string;
    };

// fetcher (ky) automatically attaches the access token and refreshes on 401.
// Note: AbortSignal isn't passed into kakao fetch because jsdom's signal class
// trips an instanceof check inside node's fetch impl; stale responses are
// filtered out via the controller.signal.aborted check after allSettled.
const fetchBoolti = async (keyword: string): Promise<VenueResult[]> => {
  const data = await fetcher.get<WebHostConcertHallListResponse>('web/v1/host/concert-halls', {
    searchParams: { keyword, page: 0, size: BOOLTI_PAGE_SIZE },
  });
  return data.items.map((item) => ({
    source: 'boolti' as const,
    concertHallId: item.id,
    name: item.name,
    address: item.address,
  }));
};

const fetchKakaoKeyword = async (keyword: string): Promise<VenueResult[]> => {
  const url = new URL(KAKAO_LOCAL_KEYWORD_URL);
  url.searchParams.set('query', keyword);
  url.searchParams.set('size', String(KAKAO_PAGE_SIZE));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
  });
  if (!res.ok) throw new Error(`kakao_place ${res.status}`);
  const data = (await res.json()) as { documents: KakaoKeywordDoc[] };
  return data.documents.map((doc) => ({
    source: 'kakao_place' as const,
    placeName: doc.place_name,
    category: doc.category_group_name,
    addressName: doc.address_name,
    roadAddressName: doc.road_address_name,
    x: doc.x,
    y: doc.y,
  }));
};

const fetchKakaoAddress = async (keyword: string): Promise<VenueResult[]> => {
  const url = new URL(KAKAO_LOCAL_ADDRESS_URL);
  url.searchParams.set('query', keyword);
  url.searchParams.set('size', String(KAKAO_PAGE_SIZE));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
  });
  if (!res.ok) throw new Error(`kakao_address ${res.status}`);
  const data = (await res.json()) as { documents: KakaoAddressDoc[] };
  return data.documents.map((doc) => ({
    source: 'kakao_address' as const,
    addressName: doc.address?.address_name ?? doc.address_name,
    roadAddressName: doc.road_address?.address_name ?? doc.address_name,
    x: doc.x,
    y: doc.y,
  }));
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const merge = (
  boolti: VenueResult[],
  kakaoPlace: VenueResult[],
  kakaoAddress: VenueResult[],
): VenueResult[] => {
  const booltiNames = new Set(
    boolti
      .filter((r): r is Extract<VenueResult, { source: 'boolti' }> => r.source === 'boolti')
      .map((r) => normalizeName(r.name)),
  );
  const filteredKakaoPlace = kakaoPlace.filter(
    (r) => r.source === 'kakao_place' && !booltiNames.has(normalizeName(r.placeName)),
  );
  return [...boolti, ...filteredKakaoPlace, ...kakaoAddress];
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

    const settled = await Promise.allSettled([
      fetchBoolti(keyword),
      fetchKakaoKeyword(keyword),
      fetchKakaoAddress(keyword),
    ]);

    if (controller.signal.aborted) return;

    const nextErrors: Partial<Record<VenueSource, Error>> = {};
    const sourceMap: VenueSource[] = ['boolti', 'kakao_place', 'kakao_address'];
    const sourceResults: VenueResult[][] = settled.map((s, i) => {
      if (s.status === 'fulfilled') return s.value;
      nextErrors[sourceMap[i]] = s.reason instanceof Error ? s.reason : new Error(String(s.reason));
      return [];
    });

    setResults(merge(sourceResults[0], sourceResults[1], sourceResults[2]));
    setErrors(nextErrors);
    setIsLoading(false);
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
