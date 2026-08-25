import {
  useCreateConcertHallEntryRequest,
  useConcertHallAutocomplete,
  useConcertHallRecommendedRegions,
  useConcertHallSearchList,
} from '@boolti/api';
import type {
  ConcertHallAutocompleteItem,
  ConcertHallSearchItem,
  ConcertHallSearchSort,
} from '@boolti/api';
import {
  AreaIcon,
  AscendingIcon,
  ArrowRightIcon,
  BooltiLogo,
  CloseIcon,
  DescendingIcon,
  InfoIcon,
  MapMarkerIcon,
  MenuIcon,
  RefreshIcon,
  SearchIcon,
} from '@boolti/icon';
import { Button, useToast } from '@boolti/ui';
import {
  AnimationEvent as ReactAnimationEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { PATH } from '~/constants/routes';
import Styled from './ConcertHallSearchPage.styles';
import { useOnClickOutside } from '@boolti/ui/src/hooks/useOnClickOutside';
import { useIsMobile } from '~/hooks/useIsMobile';
import { BooltiWhiteLogo } from './icons';
import ConcertHallDetailPanel from './ConcertHallDetailPanel';
import { Global, css, useTheme } from '@emotion/react';

const DEFAULT_PAGE_SIZE = 12;
const AUTOCOMPLETE_DEBOUNCE_MS = 300;
const RECENT_KEYWORDS_STORAGE_KEY = 'concert-hall-search-recent-keywords';
const MAX_RECENT_KEYWORD_COUNT = 8;
const DEFAULT_RENTAL_FEE_LABEL = '금액 설정';
const DEFAULT_CAPACITY_LABEL = '인원 설정';
const DEFAULT_SORT: ConcertHallSearchSort = 'FEE_ASC';

type SearchField = 'keyword' | 'rentalFee' | 'capacity';
type ActiveSearchField = SearchField | 'overview';
type ConcertHallSearchLocationState = Record<string, unknown> & {
  concertHallDetailId?: unknown;
};

type RangeOption = {
  id: string;
  label: string;
  min?: number;
  max?: number;
};

const rentalFeeOptions: RangeOption[] = [
  { id: 'up-to-500k', label: '500,000원 이하', max: 500000 },
  { id: '500k-to-1m', label: '500,000원 ~ 1,000,000원', min: 500000, max: 1000000 },
  { id: '1m-to-1_5m', label: '1,000,000원 ~ 1,500,000원', min: 1000000, max: 1500000 },
  { id: '1_5m-to-2m', label: '1,500,000원 ~ 2,000,000원', min: 1500000, max: 2000000 },
];

const capacityOptions: RangeOption[] = [
  { id: 'up-to-20', label: '20명 이하', max: 20 },
  { id: '20-to-50', label: '20명 ~ 50명', min: 20, max: 50 },
  { id: '50-to-100', label: '50명 ~ 100명', min: 50, max: 100 },
  { id: '100-to-200', label: '100명 ~ 200명', min: 100, max: 200 },
  { id: '200-to-300', label: '200명 ~ 300명', min: 200, max: 300 },
  { id: 'over-300', label: '300명 이상', min: 300 },
];

const parseNumberParam = (value: string | null) => {
  if (value == null || value.trim() === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseNumberInput = (value: string) => {
  const normalized = value.replace(/[^\d]/g, '');
  if (!normalized) return undefined;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const formatPlainNumber = (value?: number) => (value == null ? '' : String(value));

const formatWon = (value: number) => `${value.toLocaleString('ko-KR')}원`;

const formatRangeLabel = (min?: number, max?: number, emptyLabel = '설정') => {
  if (min != null && max != null) return `${formatWon(min)} - ${formatWon(max)}`;
  if (max != null) return `${formatWon(max)} 이하`;
  if (min != null) return `${formatWon(min)} 이상`;
  return emptyLabel;
};

const formatPeopleRangeLabel = (min?: number, max?: number, emptyLabel = '설정') => {
  if (min != null && max != null)
    return `${min.toLocaleString('ko-KR')}명 - ${max.toLocaleString('ko-KR')}명`;
  if (max != null) return `${max.toLocaleString('ko-KR')}명 이하`;
  if (min != null) return `${min.toLocaleString('ko-KR')}명 이상`;
  return emptyLabel;
};

const findRangeOption = (options: RangeOption[], min?: number, max?: number) =>
  options.find((option) => option.min === min && option.max === max);

const isSort = (value: string | null): value is ConcertHallSearchSort =>
  value === 'FEE_ASC' || value === 'FEE_DESC';

const getLocationState = (state: unknown): ConcertHallSearchLocationState =>
  state && typeof state === 'object' ? (state as ConcertHallSearchLocationState) : {};

const getConcertHallDetailId = (state: unknown) => {
  const detailId = getLocationState(state).concertHallDetailId;
  return typeof detailId === 'number' && Number.isInteger(detailId) && detailId > 0
    ? detailId
    : null;
};

const readRecentKeywords = () => {
  if (typeof window === 'undefined') return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_KEYWORDS_STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === 'string')
      : [];
  } catch {
    return [];
  }
};

const writeRecentKeywords = (keywords: string[]) => {
  window.localStorage.setItem(RECENT_KEYWORDS_STORAGE_KEY, JSON.stringify(keywords));
};

const formatSearchCapacity = (concertHall: ConcertHallSearchItem) => {
  const values = [];
  if (concertHall.seatedCapacity != null) values.push(`좌석 ${concertHall.seatedCapacity}석`);
  if (concertHall.standingCapacity != null) values.push(`스탠딩 ${concertHall.standingCapacity}명`);
  return values.length > 0 ? values.join(' · ') : '정보 없음';
};

const HighlightedAutocompleteName = ({ name, keyword }: { name: string; keyword: string }) => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword) return name;

  const fragments = [];
  let cursor = 0;
  let matchIndex = name.indexOf(trimmedKeyword, cursor);

  while (matchIndex >= 0) {
    if (matchIndex > cursor) fragments.push(name.slice(cursor, matchIndex));
    fragments.push(
      <Styled.AutocompleteMatch key={`${matchIndex}-${trimmedKeyword}`}>
        {trimmedKeyword}
      </Styled.AutocompleteMatch>,
    );
    cursor = matchIndex + trimmedKeyword.length;
    matchIndex = name.indexOf(trimmedKeyword, cursor);
  }

  if (cursor === 0) return name;
  if (cursor < name.length) fragments.push(name.slice(cursor));

  return <>{fragments}</>;
};

const ConcertHallCard = ({
  concertHall,
  isDimmed,
  isSelected,
  onClick,
}: {
  concertHall: ConcertHallSearchItem;
  isDimmed: boolean;
  isSelected: boolean;
  onClick: (concertHallId: number, trigger: HTMLButtonElement) => void;
}) => (
  <Styled.ConcertHallCard
    type="button"
    aria-label={`${concertHall.name} 상세 보기`}
    aria-pressed={isSelected}
    $dimmed={isDimmed}
    onClick={(event) => onClick(concertHall.concertHallId, event.currentTarget)}
  >
    <Styled.CardImage imageUrl={concertHall.representativeImageUrl ?? undefined} />
    <Styled.CardInfo>
      <Styled.CardInfoHeader>
        <Styled.PriceRow>
          {concertHall.defaultFee > 0 ? (
            <>
              <Styled.Price>{concertHall.defaultFee.toLocaleString('ko-KR')}</Styled.Price>
              <Styled.PriceLabel>원~</Styled.PriceLabel>
            </>
          ) : (
            <Styled.Price>문의</Styled.Price>
          )}
          <Styled.PriceHours>
            /{' '}
            {concertHall.rentalTimeHours != null
              ? `${concertHall.rentalTimeHours}시간`
              : '정보 없음'}
          </Styled.PriceHours>
        </Styled.PriceRow>
        <Styled.CardTitle>{concertHall.name}</Styled.CardTitle>
      </Styled.CardInfoHeader>
      <Styled.CardDivider />
      <Styled.MetaList>
        <Styled.MetaLabel>수용 인원</Styled.MetaLabel>
        <Styled.MetaValue>{formatSearchCapacity(concertHall)}</Styled.MetaValue>
        <Styled.MetaLabel>위치</Styled.MetaLabel>
        <Styled.MetaValue>{concertHall.regionName ?? '정보 없음'}</Styled.MetaValue>
      </Styled.MetaList>
    </Styled.CardInfo>
  </Styled.ConcertHallCard>
);

const ConcertHallSearchPage = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const regionId = parseNumberParam(searchParams.get('regionId'));
  const rentalFeeMin = parseNumberParam(searchParams.get('rentalFeeMin'));
  const rentalFeeMax = parseNumberParam(searchParams.get('rentalFeeMax'));
  const capacityMin = parseNumberParam(searchParams.get('capacityMin'));
  const capacityMax = parseNumberParam(searchParams.get('capacityMax'));
  const sortParam = searchParams.get('sort');
  const sort = isSort(sortParam) ? sortParam : DEFAULT_SORT;

  const searchFormRef = useRef<HTMLFormElement>(null);
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const mobileKeywordInputRef = useRef<HTMLInputElement>(null);
  const rentalFeeMaxInputRef = useRef<HTMLInputElement>(null);
  const infoPopupRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);
  const recentClearConfirmRef = useRef<HTMLDivElement>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const keywordInputSnapshotRef = useRef<{
    keywordInput: string;
    selectedRegionId: number | null;
    selectedRegionNameInput?: string;
  } | null>(null);
  const applySearchRef = useRef<(() => void) | null>(null);
  const [keywordInput, setKeywordInput] = useState(keyword);
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(regionId ?? null);
  const [selectedRegionNameInput, setSelectedRegionNameInput] = useState<string>();
  const [rentalFeeMinInput, setRentalFeeMinInput] = useState(formatPlainNumber(rentalFeeMin));
  const [rentalFeeMaxInput, setRentalFeeMaxInput] = useState(formatPlainNumber(rentalFeeMax));
  const [selectedRentalFeeOptionId, setSelectedRentalFeeOptionId] = useState<string | null>(
    findRangeOption(rentalFeeOptions, rentalFeeMin, rentalFeeMax)?.id ?? null,
  );
  const [selectedCapacityOptionId, setSelectedCapacityOptionId] = useState<string | null>(
    findRangeOption(capacityOptions, capacityMin, capacityMax)?.id ?? null,
  );
  const [isCapacityCleared, setIsCapacityCleared] = useState(false);
  const [page, setPage] = useState(0);
  const [visibleConcertHalls, setVisibleConcertHalls] = useState<ConcertHallSearchItem[]>([]);
  const selectedConcertHallId = getConcertHallDetailId(location.state);
  const detailTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [pendingDetail, setPendingDetail] = useState<{ id: number; search: string } | null>(null);
  const previousSelectedConcertHallIdRef = useRef<number | null>(selectedConcertHallId);
  const [activeSearchField, setActiveSearchField] = useState<ActiveSearchField | null>(null);
  const [isMobileFilterClosing, setIsMobileFilterClosing] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState(readRecentKeywords);
  const [isRecentClearConfirmOpen, setIsRecentClearConfirmOpen] = useState(false);
  const [isEntryRequestOpen, setIsEntryRequestOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [entryRequestName, setEntryRequestName] = useState(keyword);
  const [entryRequestTouched, setEntryRequestTouched] = useState(false);

  const toast = useToast();
  const entryRequestMutation = useCreateConcertHallEntryRequest();
  const recommendedRegionsQuery = useConcertHallRecommendedRegions();
  const recommendedRegionName = recommendedRegionsQuery.data?.find(
    (region) => region.regionId === regionId,
  )?.name;
  const autocompleteQueryText = activeSearchField === 'keyword' ? debouncedKeyword : '';
  const autocompleteQuery = useConcertHallAutocomplete(autocompleteQueryText);
  const trimmedKeywordInput = keywordInput.trim();
  const isAutocompleteWaiting =
    activeSearchField === 'keyword' &&
    trimmedKeywordInput.length > 0 &&
    debouncedKeyword !== trimmedKeywordInput;
  const shouldKeepPreviousSearchContent =
    trimmedKeywordInput.length > 0 &&
    (isAutocompleteWaiting || autocompleteQuery.isLoading) &&
    autocompleteQuery.data == null;

  const restoreKeywordInputDraft = useCallback(() => {
    const snapshot = keywordInputSnapshotRef.current;
    keywordInputSnapshotRef.current = null;
    if (!snapshot || keywordInput.trim().length > 0) return;

    setKeywordInput(snapshot.keywordInput);
    setSelectedRegionId(snapshot.selectedRegionId);
    setSelectedRegionNameInput(snapshot.selectedRegionNameInput);
  }, [keywordInput]);

  const handleKeywordInputFocus = () => {
    if (keywordInputSnapshotRef.current == null) {
      keywordInputSnapshotRef.current = {
        keywordInput,
        selectedRegionId,
        selectedRegionNameInput,
      };
    }
    setActiveSearchField('keyword');
  };

  const closeActiveSearchField = useCallback(
    (restoreKeywordDraft = true) => {
      if (restoreKeywordDraft && activeSearchField === 'keyword') restoreKeywordInputDraft();
      mobileKeywordInputRef.current?.blur();

      if (
        !isMobile ||
        activeSearchField == null ||
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ) {
        setIsMobileFilterClosing(false);
        setActiveSearchField(null);
        return;
      }

      setIsMobileFilterClosing(true);
    },
    [activeSearchField, isMobile, restoreKeywordInputDraft],
  );

  const handleMobileFilterAnimationEnd = (event: ReactAnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !isMobileFilterClosing) return;

    setIsMobileFilterClosing(false);
    setActiveSearchField(null);
  };

  const cancelMobileKeywordSearch = () => {
    const snapshot = keywordInputSnapshotRef.current;
    keywordInputSnapshotRef.current = null;

    if (snapshot) {
      setKeywordInput(snapshot.keywordInput);
      setSelectedRegionId(snapshot.selectedRegionId);
      setSelectedRegionNameInput(snapshot.selectedRegionNameInput);
    }

    mobileKeywordInputRef.current?.blur();
    setActiveSearchField('overview');
  };

  useEffect(() => {
    if (keyword || regionId == null) setKeywordInput(keyword);
    else if (recommendedRegionName) {
      setKeywordInput((currentKeywordInput) => currentKeywordInput || recommendedRegionName);
    }
    setEntryRequestName(keyword);
  }, [keyword, regionId, recommendedRegionName]);

  useEffect(() => {
    setSelectedRegionId(regionId ?? null);
  }, [regionId]);

  useEffect(() => {
    if (!trimmedKeywordInput) {
      setDebouncedKeyword('');
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setDebouncedKeyword(trimmedKeywordInput);
    }, AUTOCOMPLETE_DEBOUNCE_MS);
    return () => window.clearTimeout(timerId);
  }, [trimmedKeywordInput]);

  useEffect(() => {
    setRentalFeeMinInput(formatPlainNumber(rentalFeeMin));
    setRentalFeeMaxInput(formatPlainNumber(rentalFeeMax));
    setSelectedRentalFeeOptionId(
      findRangeOption(rentalFeeOptions, rentalFeeMin, rentalFeeMax)?.id ?? null,
    );
  }, [rentalFeeMax, rentalFeeMin]);

  useEffect(() => {
    setSelectedCapacityOptionId(
      findRangeOption(capacityOptions, capacityMin, capacityMax)?.id ?? null,
    );
    setIsCapacityCleared(false);
  }, [capacityMax, capacityMin]);

  useEffect(() => {
    if (!isMobile || activeSearchField == null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeSearchField, isMobile]);

  useEffect(() => {
    const wasDetailOpen = previousSelectedConcertHallIdRef.current != null;
    previousSelectedConcertHallIdRef.current = selectedConcertHallId;

    if (!wasDetailOpen || selectedConcertHallId != null) return;

    window.setTimeout(() => detailTriggerRef.current?.focus(), 0);
  }, [selectedConcertHallId]);

  useEffect(() => {
    if (pendingDetail == null || location.search.slice(1) !== pendingDetail.search) return;

    const { id } = pendingDetail;
    setPendingDetail(null);
    navigate('.', {
      state: {
        ...getLocationState(location.state),
        concertHallDetailId: id,
      },
    });
  }, [location.search, location.state, navigate, pendingDetail]);

  const listParams = useMemo(
    () => ({
      regionId,
      keyword: keyword || undefined,
      minFee: rentalFeeMin,
      maxFee: rentalFeeMax,
      minCapacity: capacityMin,
      maxCapacity: capacityMax,
      sort,
      page,
      size: DEFAULT_PAGE_SIZE,
    }),
    [capacityMax, capacityMin, keyword, page, regionId, rentalFeeMax, rentalFeeMin, sort],
  );
  const searchConditionsKey = useMemo(
    () =>
      JSON.stringify({ capacityMax, capacityMin, keyword, regionId, rentalFeeMax, rentalFeeMin }),
    [capacityMax, capacityMin, keyword, regionId, rentalFeeMax, rentalFeeMin],
  );
  const [lastTotalElements, setLastTotalElements] = useState<{
    searchConditionsKey: string;
    totalElements: number;
  } | null>(null);

  const concertHallListQuery = useConcertHallSearchList(listParams);
  const currentPageConcertHalls = useMemo(
    () => concertHallListQuery.data?.items ?? [],
    [concertHallListQuery.data?.items],
  );
  const currentPageConcertHallIds = currentPageConcertHalls
    .map((concertHall) => concertHall.concertHallId)
    .join(',');
  const concertHalls =
    visibleConcertHalls.length > 0 ? visibleConcertHalls : currentPageConcertHalls;
  const totalElements =
    concertHallListQuery.data?.totalElements ??
    (lastTotalElements?.searchConditionsKey === searchConditionsKey
      ? lastTotalElements.totalElements
      : 0);
  const hasDetail = selectedConcertHallId != null;
  const openDetailFromCard = useCallback(
    (concertHallId: number, trigger: HTMLButtonElement) => {
      detailTriggerRef.current = trigger;
      navigate('.', {
        state: {
          ...getLocationState(location.state),
          concertHallDetailId: concertHallId,
        },
      });
    },
    [location.state, navigate],
  );
  const closeDetail = useCallback(() => {
    if (selectedConcertHallId == null) return;
    navigate(-1);
  }, [navigate, selectedConcertHallId]);
  const hasSearchConditions =
    keyword.length > 0 ||
    regionId != null ||
    rentalFeeMin != null ||
    rentalFeeMax != null ||
    capacityMin != null ||
    capacityMax != null;
  const hasKeywordSearch = keyword.trim().length > 0;
  const hasEntryRequestError = entryRequestTouched && entryRequestName.trim().length === 0;
  const mobileSortLabel = sort === 'FEE_ASC' ? '대관료 낮은 순' : '대관료 높은 순';
  const rentalFeeLabel = formatRangeLabel(rentalFeeMin, rentalFeeMax, DEFAULT_RENTAL_FEE_LABEL);
  const stagedRentalFeeLabel = formatRangeLabel(
    parseNumberInput(rentalFeeMinInput),
    parseNumberInput(rentalFeeMaxInput),
    DEFAULT_RENTAL_FEE_LABEL,
  );
  const selectedCapacityOption = capacityOptions.find(
    (option) => option.id === selectedCapacityOptionId,
  );
  const appliedCapacityOption = findRangeOption(capacityOptions, capacityMin, capacityMax);
  const appliedRegionId = regionId ?? selectedRegionId ?? undefined;
  const selectedRegionName =
    recommendedRegionsQuery.data?.find((region) => region.regionId === appliedRegionId)?.name ??
    selectedRegionNameInput;
  const stagedCapacityLabel = isCapacityCleared
    ? DEFAULT_CAPACITY_LABEL
    : selectedCapacityOption?.label ??
      formatPeopleRangeLabel(capacityMin, capacityMax, DEFAULT_CAPACITY_LABEL);
  const hasStagedMobileFilters =
    keywordInput.trim().length > 0 ||
    selectedRegionId != null ||
    parseNumberInput(rentalFeeMinInput) != null ||
    parseNumberInput(rentalFeeMaxInput) != null ||
    selectedCapacityOptionId != null ||
    (!isCapacityCleared && (capacityMin != null || capacityMax != null));
  const hasPendingCapacityFilter = isCapacityCleared
    ? capacityMin != null || capacityMax != null
    : selectedCapacityOptionId !== (appliedCapacityOption?.id ?? null);
  const toggleMobileSort = () => {
    updateParams({
      keyword,
      regionId,
      rentalFeeMin,
      rentalFeeMax,
      capacityMin,
      capacityMax,
      sort: sort === 'FEE_ASC' ? 'FEE_DESC' : 'FEE_ASC',
    });
  };

  useEffect(() => {
    setPage(0);
    setVisibleConcertHalls([]);
  }, [capacityMax, capacityMin, keyword, regionId, rentalFeeMax, rentalFeeMin, sort]);

  useEffect(() => {
    if (concertHallListQuery.data?.totalElements == null) return;

    setLastTotalElements({
      searchConditionsKey,
      totalElements: concertHallListQuery.data.totalElements,
    });
  }, [concertHallListQuery.data?.totalElements, searchConditionsKey]);

  useEffect(() => {
    if (!concertHallListQuery.data) return;

    setVisibleConcertHalls((prevConcertHalls) => {
      if (page === 0) return currentPageConcertHalls;

      const prevConcertHallIds = new Set(
        prevConcertHalls.map((concertHall) => concertHall.concertHallId),
      );
      const nextConcertHalls = currentPageConcertHalls.filter(
        (concertHall) => !prevConcertHallIds.has(concertHall.concertHallId),
      );
      if (nextConcertHalls.length === 0) return prevConcertHalls;
      return [...prevConcertHalls, ...nextConcertHalls];
    });
  }, [currentPageConcertHallIds, currentPageConcertHalls, page, concertHallListQuery.data]);

  useEffect(() => {
    const loadMoreTrigger = loadMoreTriggerRef.current;
    if (!loadMoreTrigger || !concertHallListQuery.data?.hasNext || concertHallListQuery.isLoading)
      return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        setPage((currentPage) => currentPage + 1);
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(loadMoreTrigger);
    return () => observer.disconnect();
  }, [
    concertHallListQuery.data?.currentPage,
    concertHallListQuery.data?.hasNext,
    concertHallListQuery.isLoading,
  ]);

  useOnClickOutside(infoPopupRef, () => {
    setInfoPopupOpen(false);
  });
  useOnClickOutside(headerMenuRef, () => setIsHeaderMenuOpen(false));

  useEffect(() => {
    if (!isHeaderMenuOpen) return undefined;

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsHeaderMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isHeaderMenuOpen]);

  const updateParams = (
    next: {
      regionId?: number;
      keyword?: string;
      rentalFeeMin?: number;
      rentalFeeMax?: number;
      capacityMin?: number;
      capacityMax?: number;
      sort?: ConcertHallSearchSort;
    },
    nextSelectedConcertHallId: number | null = null,
  ) => {
    const params = new URLSearchParams();
    if (next.regionId != null) params.set('regionId', String(next.regionId));
    if (next.keyword) params.set('keyword', next.keyword);
    if (next.rentalFeeMin != null) params.set('rentalFeeMin', String(next.rentalFeeMin));
    if (next.rentalFeeMax != null) params.set('rentalFeeMax', String(next.rentalFeeMax));
    if (next.capacityMin != null) params.set('capacityMin', String(next.capacityMin));
    if (next.capacityMax != null) params.set('capacityMax', String(next.capacityMax));
    if (next.sort && next.sort !== DEFAULT_SORT) params.set('sort', next.sort);
    const nextSearch = params.toString();
    setPendingDetail(
      nextSelectedConcertHallId == null
        ? null
        : { id: nextSelectedConcertHallId, search: nextSearch },
    );
    setSearchParams(params, { state: null });
    setPage(0);
    setVisibleConcertHalls([]);
  };

  const saveRecentKeyword = (nextKeyword: string) => {
    if (!nextKeyword) return;

    const nextKeywords = [
      nextKeyword,
      ...recentKeywords.filter((item) => item !== nextKeyword),
    ].slice(0, MAX_RECENT_KEYWORD_COUNT);
    setRecentKeywords(nextKeywords);
    writeRecentKeywords(nextKeywords);
  };

  const applySearch = (
    nextKeyword = keywordInput.trim(),
    nextRegionId: number | null = selectedRegionId,
    nextSelectedConcertHallId: number | null = null,
    closeSearchField = true,
  ) => {
    const rentalFeeMinValue = parseNumberInput(rentalFeeMinInput);
    const rentalFeeMaxValue = parseNumberInput(rentalFeeMaxInput);
    const capacityOption = capacityOptions.find((option) => option.id === selectedCapacityOptionId);

    if (nextRegionId == null) saveRecentKeyword(nextKeyword);
    updateParams(
      {
        regionId: nextRegionId ?? undefined,
        keyword: nextRegionId == null ? nextKeyword : undefined,
        rentalFeeMin: rentalFeeMinValue,
        rentalFeeMax: rentalFeeMaxValue,
        capacityMin: capacityOption?.min ?? (isCapacityCleared ? undefined : capacityMin),
        capacityMax: capacityOption?.max ?? (isCapacityCleared ? undefined : capacityMax),
        sort,
      },
      nextSelectedConcertHallId,
    );
    keywordInputSnapshotRef.current = null;
    keywordInputRef.current?.blur();
    mobileKeywordInputRef.current?.blur();
    if (closeSearchField) closeActiveSearchField(false);
  };
  applySearchRef.current = applySearch;

  const submitSearch = (resetEmptyPlace = false) => {
    if (resetEmptyPlace && keywordInput.trim().length === 0) {
      applySearch('', null);
    } else {
      applySearch();
    }
  };

  const handleMobilePrimaryAction = () => {
    if (activeSearchField === 'rentalFee') {
      applySearch(keywordInput.trim(), selectedRegionId, null, false);
      setActiveSearchField('capacity');
      return;
    }

    submitSearch();
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (isMobile) return;
      if (searchFormRef.current?.contains(event.target as Node)) return;
      if (mobileFilterRef.current?.contains(event.target as Node)) return;
      if (recentClearConfirmRef.current?.contains(event.target as Node)) return;
      if (activeSearchField === 'capacity' && hasPendingCapacityFilter) {
        applySearchRef.current?.();
        return;
      }
      closeActiveSearchField();
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [activeSearchField, closeActiveSearchField, hasPendingCapacityFilter, isMobile]);

  const handleSearchFieldClick = (nextField: SearchField, toggle = true) => {
    if (activeSearchField === 'capacity' && hasPendingCapacityFilter) {
      applySearch(keywordInput.trim(), selectedRegionId, null, false);
      if (nextField !== 'capacity') setActiveSearchField(nextField);
      return;
    }

    if (activeSearchField === 'keyword' && nextField !== 'keyword') {
      restoreKeywordInputDraft();
    }

    if (toggle) {
      setActiveSearchField((value) => (value === nextField ? null : nextField));
      return;
    }

    if (activeSearchField !== nextField) setActiveSearchField(nextField);
  };

  const handleKeywordInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    if (isMobile && activeSearchField === 'keyword') {
      keywordInputSnapshotRef.current = null;
      mobileKeywordInputRef.current?.blur();
      setActiveSearchField('rentalFee');
      return;
    }

    submitSearch(true);
  };

  const applyRecentKeyword = (nextKeyword: string) => {
    setSelectedRegionId(null);
    setSelectedRegionNameInput(undefined);
    setKeywordInput(nextKeyword);
    applySearch(nextKeyword, null);
  };

  const applyRegion = (nextRegionId: number, nextRegionName: string) => {
    setSelectedRegionId(nextRegionId);
    setSelectedRegionNameInput(nextRegionName);
    setKeywordInput(nextRegionName);
    applySearch(nextRegionName, nextRegionId);
  };

  const applyAutocomplete = (item: ConcertHallAutocompleteItem) => {
    if (item.type === 'REGION') {
      applyRegion(item.id, item.name);
      return;
    }

    setSelectedRegionId(null);
    setSelectedRegionNameInput(undefined);
    setKeywordInput(item.name);
    applySearch(item.name, null, item.id);
  };

  const selectRentalFeeOption = (option: RangeOption) => {
    setSelectedRentalFeeOptionId(option.id);
    setRentalFeeMinInput(formatPlainNumber(option.min));
    setRentalFeeMaxInput(formatPlainNumber(option.max));
  };

  const clearRentalFee = () => {
    setSelectedRentalFeeOptionId(null);
    setRentalFeeMinInput('');
    setRentalFeeMaxInput('');
  };

  const clearCapacity = () => {
    setSelectedCapacityOptionId(null);
    setIsCapacityCleared(true);
  };

  const removeRecentKeyword = (targetKeyword: string) => {
    const nextKeywords = recentKeywords.filter((item) => item !== targetKeyword);
    setRecentKeywords(nextKeywords);
    writeRecentKeywords(nextKeywords);
  };

  const clearRecentKeywords = () => {
    setRecentKeywords([]);
    writeRecentKeywords([]);
    setIsRecentClearConfirmOpen(false);
  };

  const resetSearch = () => {
    setSelectedRegionId(null);
    setSelectedRegionNameInput(undefined);
    setKeywordInput('');
    setRentalFeeMinInput('');
    setRentalFeeMaxInput('');
    setSelectedRentalFeeOptionId(null);
    setSelectedCapacityOptionId(null);
    setIsCapacityCleared(true);
    updateParams({ sort: DEFAULT_SORT });
  };

  const clearMobileFilters = () => {
    setSelectedRegionId(null);
    setSelectedRegionNameInput(undefined);
    setKeywordInput('');
    setRentalFeeMinInput('');
    setRentalFeeMaxInput('');
    setSelectedRentalFeeOptionId(null);
    setSelectedCapacityOptionId(null);
    setIsCapacityCleared(true);
    keywordInputSnapshotRef.current = null;
    mobileKeywordInputRef.current?.blur();
    setIsMobileFilterClosing(false);
    setActiveSearchField('overview');
    updateParams({ sort });
  };

  const closeMobileFilter = () => {
    if (activeSearchField === 'capacity' && hasPendingCapacityFilter) {
      applySearch();
      return;
    }

    closeActiveSearchField();
  };

  const stageMobileRegion = (nextRegionId: number, nextRegionName: string) => {
    setSelectedRegionId(nextRegionId);
    setSelectedRegionNameInput(nextRegionName);
    setKeywordInput(nextRegionName);
    keywordInputSnapshotRef.current = null;
    setActiveSearchField('rentalFee');
  };

  const stageMobileAutocomplete = (item: ConcertHallAutocompleteItem) => {
    if (item.type === 'REGION') {
      stageMobileRegion(item.id, item.name);
      return;
    }

    applyAutocomplete(item);
  };

  const stageMobileRecentKeyword = (nextKeyword: string) => {
    setSelectedRegionId(null);
    setSelectedRegionNameInput(undefined);
    setKeywordInput(nextKeyword);
    keywordInputSnapshotRef.current = null;
    setActiveSearchField('rentalFee');
  };

  const handleRentalFeeMinKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Tab' || event.shiftKey) return;
    event.preventDefault();
    rentalFeeMaxInputRef.current?.focus();
  };

  const handleRentalFeeMaxKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    setActiveSearchField('capacity');
  };

  const submitEntryRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEntryRequestTouched(true);

    const name = entryRequestName.trim();
    if (!name) return;

    try {
      await entryRequestMutation.mutateAsync({ name });
      toast.success('입점 요청을 보냈어요.');
      setIsEntryRequestOpen(false);
      setEntryRequestTouched(false);
    } catch {
      toast.error('입점 요청에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
    <Global styles={css`
      body {
        background: ${theme.palette.grey.b};
      }
    `} />
    <Styled.Page>
      <Styled.Header $menuOpen={isHeaderMenuOpen}>
        <Styled.Logo
          onClick={() => {
            setIsHeaderMenuOpen(false);
            resetSearch();
          }}
        >
          <BooltiLogo />
        </Styled.Logo>
        <Styled.HeaderMenuContainer ref={headerMenuRef}>
          <Styled.MenuButton
            type="button"
            aria-label={isHeaderMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-haspopup="menu"
            aria-expanded={isHeaderMenuOpen}
            aria-controls="concert-hall-header-menu"
            onClick={() => {
              setActiveSearchField(null);
              setIsHeaderMenuOpen((isOpen) => !isOpen);
            }}
          >
            <MenuIcon />
          </Styled.MenuButton>
          {isHeaderMenuOpen && (
            <Styled.HeaderMenuPopup id="concert-hall-header-menu" role="menu">
              <Styled.HeaderMenuLabel
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsHeaderMenuOpen(false);
                  navigate(PATH.QR);
                }}
              >
                앱 둘러보기
              </Styled.HeaderMenuLabel>
              <Styled.HeaderMenuPrimaryButton
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsHeaderMenuOpen(false);
                  navigate(`${PATH.HOME}?target=register`);
                }}
              >
                공연 등록 시작하기
                <ArrowRightIcon />
              </Styled.HeaderMenuPrimaryButton>
            </Styled.HeaderMenuPopup>
          )}
        </Styled.HeaderMenuContainer>
        <Styled.SearchForm
          ref={searchFormRef}
          $hiddenOnMobile={isHeaderMenuOpen}
          onSubmit={handleSearch}
        >
          <Styled.SearchInputField
            active={activeSearchField === 'keyword'}
            $hideDivider={activeSearchField === 'keyword' || activeSearchField === 'rentalFee'}
            onMouseDown={isMobile ? undefined : () => handleSearchFieldClick('keyword', false)}
            onClick={(event) => {
              if (isMobile) return;
              if (event.target !== event.currentTarget) return;
              keywordInputRef.current?.focus();
            }}
          >
            {isMobile ? (
              <Styled.MobileSearchTrigger
                type="button"
                aria-label="모바일 공연장 검색 필터 열기"
                aria-haspopup="dialog"
                isPlaceholder={!(selectedRegionNameInput ?? keywordInput)}
                onClick={() => {
                  setIsMobileFilterClosing(false);
                  setActiveSearchField('overview');
                }}
              >
                {(selectedRegionNameInput ?? keywordInput) || '내 조건에 맞는 공연장 찾기'}
              </Styled.MobileSearchTrigger>
            ) : (
              <>
                <Styled.SearchInputLabel htmlFor="concert-hall-search-keyword">
                  장소
                </Styled.SearchInputLabel>
                <Styled.KeywordInput
                  ref={keywordInputRef}
                  id="concert-hall-search-keyword"
                  value={keywordInput}
                  placeholder="지역, 공연장명 검색"
                  aria-label="지역, 공연장명 검색"
                  onFocus={handleKeywordInputFocus}
                  onKeyDown={handleKeywordInputKeyDown}
                  onChange={(event) => {
                    setSelectedRegionId(null);
                    setSelectedRegionNameInput(undefined);
                    setKeywordInput(event.target.value);
                  }}
                />
              </>
            )}
            {!isMobile && activeSearchField === 'keyword' && (
              <Styled.KeywordPopover aria-label="장소 검색">
                {trimmedKeywordInput && !shouldKeepPreviousSearchContent ? (
                  <>
                    {autocompleteQuery.isError ? (
                      <Styled.AutocompleteState>
                        자동완성 결과를 불러오지 못했어요.
                      </Styled.AutocompleteState>
                    ) : autocompleteQuery.data?.items.length ? (
                      <Styled.RecentList>
                        {autocompleteQuery.data.items.map((item) => (
                          <Styled.RecentItem key={`${item.type}-${item.id}`}>
                            <Styled.RecentKeywordButton
                              type="button"
                              aria-label={`${item.name}${item.streetAddress ? ` ${item.streetAddress}` : ''} 선택`}
                              onClick={() => applyAutocomplete(item)}
                            >
                              <Styled.RecentItemIcon>
                                <AreaIcon />
                              </Styled.RecentItemIcon>
                              <Styled.AutocompleteText>
                                <span>
                                  <HighlightedAutocompleteName
                                    name={item.name}
                                    keyword={trimmedKeywordInput}
                                  />
                                </span>
                                {item.streetAddress && (
                                  <Styled.AutocompleteAddress>
                                    {item.streetAddress}
                                  </Styled.AutocompleteAddress>
                                )}
                              </Styled.AutocompleteText>
                            </Styled.RecentKeywordButton>
                          </Styled.RecentItem>
                        ))}
                      </Styled.RecentList>
                    ) : (
                      <Styled.AutocompleteState>
                        일치하는 지역이나 공연장이 없어요.
                      </Styled.AutocompleteState>
                    )}
                  </>
                ) : (
                  <>
                    {recentKeywords.length > 0 && (
                      <>
                        <Styled.PopoverHeader>
                          <span>최근 검색어</span>
                          {recentKeywords.length >= 2 && (
                            <Styled.TextButton
                              type="button"
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onClick={() => setIsRecentClearConfirmOpen(true)}
                            >
                              전체 삭제
                            </Styled.TextButton>
                          )}
                        </Styled.PopoverHeader>
                        <Styled.RecentList>
                          {recentKeywords.slice(0, 5).map((recentKeyword) => (
                            <Styled.RecentItem key={recentKeyword}>
                              <Styled.RecentKeywordButton
                                type="button"
                                aria-label={`${recentKeyword} 검색`}
                                onClick={() => applyRecentKeyword(recentKeyword)}
                              >
                                <Styled.RecentItemIcon>
                                  <SearchIcon />
                                </Styled.RecentItemIcon>
                                {recentKeyword}
                              </Styled.RecentKeywordButton>
                              <Styled.IconButton
                                type="button"
                                aria-label={`${recentKeyword} 삭제`}
                                onClick={() => removeRecentKeyword(recentKeyword)}
                              >
                                <CloseIcon />
                              </Styled.IconButton>
                            </Styled.RecentItem>
                          ))}
                        </Styled.RecentList>
                      </>
                    )}
                    <Styled.PopoverHeader>
                      <span>추천 지역</span>
                    </Styled.PopoverHeader>
                    {recommendedRegionsQuery.isLoading ? (
                      <Styled.AutocompleteState>
                        추천 지역을 불러오는 중입니다.
                      </Styled.AutocompleteState>
                    ) : recommendedRegionsQuery.isError ? (
                      <Styled.AutocompleteState>
                        추천 지역을 불러오지 못했어요.
                      </Styled.AutocompleteState>
                    ) : (
                      <Styled.RecentList>
                        {(recommendedRegionsQuery.data ?? []).map((region) => (
                          <Styled.RecentItem key={region.regionId}>
                            <Styled.RecentKeywordButton
                              type="button"
                              aria-label={`${region.name} 검색`}
                              onClick={() => applyRegion(region.regionId, region.name)}
                            >
                              <Styled.RecentItemIcon>
                                <AreaIcon />
                              </Styled.RecentItemIcon>
                              {region.name}
                            </Styled.RecentKeywordButton>
                          </Styled.RecentItem>
                        ))}
                      </Styled.RecentList>
                    )}
                  </>
                )}
              </Styled.KeywordPopover>
            )}
          </Styled.SearchInputField>
          <Styled.FilterField>
            <Styled.FieldButton
              type="button"
              $showDivider
              $hideDivider={activeSearchField === 'rentalFee' || activeSearchField === 'capacity'}
              active={
                activeSearchField === 'rentalFee' || rentalFeeMin != null || rentalFeeMax != null
              }
              aria-label={`대관료 ${rentalFeeLabel}`}
              aria-expanded={activeSearchField === 'rentalFee'}
              onClick={() => handleSearchFieldClick('rentalFee')}
            >
              <Styled.FieldLabel>대관료</Styled.FieldLabel>
              <Styled.FieldValue isPlaceholder={stagedRentalFeeLabel === DEFAULT_RENTAL_FEE_LABEL}>
                {stagedRentalFeeLabel}
              </Styled.FieldValue>
            </Styled.FieldButton>
            {activeSearchField === 'rentalFee' && (
              <Styled.RangePopover aria-label="대관료 필터">
                <Styled.RangeInputRow>
                  <Styled.RangeInputLabel>
                    최소
                    <Styled.RangeInput
                      aria-label="대관료 최소"
                      inputMode="numeric"
                      placeholder="1"
                      value={rentalFeeMinInput}
                      onChange={(event) => {
                        setSelectedRentalFeeOptionId(null);
                        setRentalFeeMinInput(event.target.value.replace(/[^\d]/g, ''));
                      }}
                      onKeyDown={handleRentalFeeMinKeyDown}
                    />
                  </Styled.RangeInputLabel>
                  <Styled.RangeDash>~</Styled.RangeDash>
                  <Styled.RangeInputLabel>
                    최대
                    <Styled.RangeInput
                      ref={rentalFeeMaxInputRef}
                      aria-label="대관료 최대"
                      inputMode="numeric"
                      placeholder="5,000,000"
                      value={rentalFeeMaxInput}
                      onChange={(event) => {
                        setSelectedRentalFeeOptionId(null);
                        setRentalFeeMaxInput(event.target.value.replace(/[^\d]/g, ''));
                      }}
                      onKeyDown={handleRentalFeeMaxKeyDown}
                    />
                  </Styled.RangeInputLabel>
                </Styled.RangeInputRow>
                <Styled.FilterOptionList>
                  {rentalFeeOptions.map((option) => (
                    <Styled.FilterOption
                      key={option.id}
                      type="button"
                      active={selectedRentalFeeOptionId === option.id}
                      onClick={() => {
                        selectRentalFeeOption(option);
                        setActiveSearchField('capacity');
                      }}
                    >
                      {option.label}
                    </Styled.FilterOption>
                  ))}
                </Styled.FilterOptionList>
                <Styled.PopoverFooter>
                  <Styled.TextButton
                    type="button"
                    aria-label="대관료 초기화"
                    disabled={
                      !rentalFeeMinInput && !rentalFeeMaxInput && !selectedRentalFeeOptionId
                    }
                    onClick={clearRentalFee}
                  >
                    <RefreshIcon />
                    초기화
                  </Styled.TextButton>
                </Styled.PopoverFooter>
              </Styled.RangePopover>
            )}
          </Styled.FilterField>
          <Styled.FilterField>
            <Styled.FieldButton
              type="button"
              active={activeSearchField === 'capacity' || !!selectedCapacityOptionId}
              aria-label={`수용 인원 ${stagedCapacityLabel}`}
              aria-expanded={activeSearchField === 'capacity'}
              onClick={() => handleSearchFieldClick('capacity')}
            >
              <Styled.FieldLabel>수용 인원</Styled.FieldLabel>
              <Styled.FieldValue isPlaceholder={stagedCapacityLabel === DEFAULT_CAPACITY_LABEL}>
                {stagedCapacityLabel}
              </Styled.FieldValue>
            </Styled.FieldButton>
            {activeSearchField === 'capacity' && (
              <Styled.FilterPopover aria-label="수용 인원 필터">
                <Styled.FilterOptionList>
                  {capacityOptions.map((option) => (
                    <Styled.FilterOption
                      key={option.id}
                      type="button"
                      active={selectedCapacityOptionId === option.id}
                      onClick={() => {
                        setSelectedCapacityOptionId(option.id);
                        setIsCapacityCleared(false);
                      }}
                    >
                      {option.label}
                    </Styled.FilterOption>
                  ))}
                </Styled.FilterOptionList>
                <Styled.PopoverFooter>
                  <Styled.TextButton
                    type="button"
                    aria-label="수용 인원 초기화"
                    disabled={!selectedCapacityOptionId}
                    onClick={clearCapacity}
                  >
                    <RefreshIcon />
                    초기화
                  </Styled.TextButton>
                </Styled.PopoverFooter>
              </Styled.FilterPopover>
            )}
          </Styled.FilterField>
          <Styled.SearchButton type="submit" aria-label="검색">
            <SearchIcon />
          </Styled.SearchButton>
        </Styled.SearchForm>
      </Styled.Header>

      {isMobile && activeSearchField != null && (
        <Styled.MobileFilterOverlay
          $isClosing={isMobileFilterClosing}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            closeMobileFilter();
          }}
        >
          <Styled.MobileFilterSheet
            $isClosing={isMobileFilterClosing}
            ref={mobileFilterRef}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 공연장 검색 필터"
            onAnimationEnd={handleMobileFilterAnimationEnd}
          >
            <Styled.MobileSheetHandle
              type="button"
              aria-label="모바일 바텀시트 닫기"
              onClick={closeMobileFilter}
            />
            {activeSearchField === 'keyword' ? (
              <>
                <Styled.MobileSheetHeader>
                  <Styled.MobileSheetTitle>장소</Styled.MobileSheetTitle>
                  <Styled.MobileSheetCloseButton
                    type="button"
                    aria-label="모바일 검색 필터 닫기"
                    onClick={cancelMobileKeywordSearch}
                  >
                    <CloseIcon />
                  </Styled.MobileSheetCloseButton>
                </Styled.MobileSheetHeader>
                <Styled.MobileLocationSearch>
                  <Styled.MobileLocationInput
                    ref={mobileKeywordInputRef}
                    autoFocus
                    value={keywordInput}
                    placeholder="지역, 공연장명 검색"
                    aria-label="모바일 지역, 공연장명 검색"
                    onFocus={handleKeywordInputFocus}
                    onKeyDown={handleKeywordInputKeyDown}
                    onChange={(event) => {
                      setSelectedRegionId(null);
                      setSelectedRegionNameInput(undefined);
                      setKeywordInput(event.target.value);
                    }}
                  />
                  <SearchIcon />
                </Styled.MobileLocationSearch>
                <Styled.MobileSheetBody>
                  {trimmedKeywordInput && !shouldKeepPreviousSearchContent ? (
                    <>
                      {autocompleteQuery.isError ? (
                        <Styled.AutocompleteState>
                          자동완성 결과를 불러오지 못했어요.
                        </Styled.AutocompleteState>
                      ) : autocompleteQuery.data?.items.length ? (
                        <Styled.MobileResultList>
                          {autocompleteQuery.data.items.map((item) => (
                            <Styled.MobileResultButton
                              key={`${item.type}-${item.id}`}
                              type="button"
                              aria-label={`${item.name}${item.streetAddress ? ` ${item.streetAddress}` : ''} 선택`}
                              onClick={() => stageMobileAutocomplete(item)}
                            >
                              <Styled.MobileResultIcon>
                                {item.type === 'REGION' ? <AreaIcon /> : <MapMarkerIcon />}
                              </Styled.MobileResultIcon>
                              <Styled.AutocompleteText>
                                <span>
                                  <HighlightedAutocompleteName
                                    name={item.name}
                                    keyword={trimmedKeywordInput}
                                  />
                                </span>
                                {item.streetAddress && (
                                  <Styled.AutocompleteAddress>
                                    {item.streetAddress}
                                  </Styled.AutocompleteAddress>
                                )}
                              </Styled.AutocompleteText>
                            </Styled.MobileResultButton>
                          ))}
                        </Styled.MobileResultList>
                      ) : (
                        <Styled.AutocompleteState>
                          일치하는 지역이나 공연장이 없어요.
                        </Styled.AutocompleteState>
                      )}
                    </>
                  ) : recentKeywords.length > 0 ? (
                    <>
                      <Styled.MobileResultHeading>최근 검색어

                          {recentKeywords.length >= 2 && (
                            <Styled.TextButton
                              type="button"
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onClick={() => setIsRecentClearConfirmOpen(true)}
                            >
                              전체 삭제
                            </Styled.TextButton>
                          )}
                      </Styled.MobileResultHeading>
                      <Styled.MobileResultList>
                        {recentKeywords.map((recentKeyword) => (
                          <Styled.MobileResultButton
                            key={recentKeyword}
                            type="button"
                            aria-label={`${recentKeyword} 검색`}
                            onClick={() => stageMobileRecentKeyword(recentKeyword)}
                          >
                            <Styled.MobileResultIcon>
                              <SearchIcon />
                            </Styled.MobileResultIcon>
                            {recentKeyword}
                          </Styled.MobileResultButton>
                        ))}
                      </Styled.MobileResultList>
                    </>
                  ) : null}
                  {(!trimmedKeywordInput || shouldKeepPreviousSearchContent) && (
                    <>
                      <Styled.MobileResultHeading>추천 지역</Styled.MobileResultHeading>
                      {recommendedRegionsQuery.isLoading ? (
                        <Styled.AutocompleteState>
                          추천 지역을 불러오는 중입니다.
                        </Styled.AutocompleteState>
                      ) : recommendedRegionsQuery.isError ? (
                        <Styled.AutocompleteState>
                          추천 지역을 불러오지 못했어요.
                        </Styled.AutocompleteState>
                      ) : (
                        <Styled.MobileResultList>
                          {(recommendedRegionsQuery.data ?? []).map((region) => (
                            <Styled.MobileResultButton
                              key={region.regionId}
                              type="button"
                              aria-label={`${region.name} 검색`}
                              onClick={() => stageMobileRegion(region.regionId, region.name)}
                            >
                              <Styled.MobileResultIcon>
                                <AreaIcon />
                              </Styled.MobileResultIcon>
                              {region.name}
                            </Styled.MobileResultButton>
                          ))}
                        </Styled.MobileResultList>
                      )}
                    </>
                  )}
                </Styled.MobileSheetBody>
              </>
            ) : (
              <>
                <Styled.MobileFilterSections>
                  {activeSearchField === 'overview' ? (
                    <Styled.MobileOverviewLocation>
                      <Styled.MobileSheetHeader>
                        <Styled.MobileSheetTitle>장소</Styled.MobileSheetTitle>
                      </Styled.MobileSheetHeader>
                      <Styled.MobileLocationTrigger
                        type="button"
                        autoFocus
                        aria-label="모바일 장소 검색 열기"
                        isPlaceholder={!(selectedRegionNameInput ?? keywordInput)}
                        onClick={() => handleSearchFieldClick('keyword', false)}
                      >
                        <span>
                          {(selectedRegionNameInput ?? keywordInput) || '지역, 공연장명 검색'}
                        </span>
                        <SearchIcon />
                      </Styled.MobileLocationTrigger>
                    </Styled.MobileOverviewLocation>
                  ) : (
                    <Styled.MobileFilterSummary
                      type="button"
                      isPlaceholder={!(selectedRegionNameInput ?? keywordInput)}
                      onClick={() => handleSearchFieldClick('keyword', false)}
                    >
                      <Styled.MobileExpandedTitle>장소</Styled.MobileExpandedTitle>
                      <strong>
                        {(selectedRegionNameInput ?? keywordInput) || '지역, 공연장명 검색'}
                      </strong>
                    </Styled.MobileFilterSummary>
                  )}

                  {activeSearchField === 'rentalFee' ? (
                    <Styled.MobileExpandedFilter>
                      <Styled.MobileExpandedTitle>대관료</Styled.MobileExpandedTitle>
                      <Styled.RangeInputRow>
                        <Styled.RangeInputLabel>
                          최소
                          <Styled.RangeInput
                            aria-label="모바일 대관료 최소"
                            inputMode="numeric"
                            placeholder="1"
                            value={rentalFeeMinInput}
                            onChange={(event) => {
                              setSelectedRentalFeeOptionId(null);
                              setRentalFeeMinInput(event.target.value.replace(/[^\d]/g, ''));
                            }}
                          />
                        </Styled.RangeInputLabel>
                        <Styled.RangeDash>~</Styled.RangeDash>
                        <Styled.RangeInputLabel>
                          최대
                          <Styled.RangeInput
                            aria-label="모바일 대관료 최대"
                            inputMode="numeric"
                            placeholder="5,000,000"
                            value={rentalFeeMaxInput}
                            onChange={(event) => {
                              setSelectedRentalFeeOptionId(null);
                              setRentalFeeMaxInput(event.target.value.replace(/[^\d]/g, ''));
                            }}
                          />
                        </Styled.RangeInputLabel>
                      </Styled.RangeInputRow>
                      <Styled.FilterOptionList>
                        {rentalFeeOptions.map((option) => (
                          <Styled.FilterOption
                            key={option.id}
                            type="button"
                            active={selectedRentalFeeOptionId === option.id}
                            aria-label={`모바일 ${option.label} 선택`}
                            onClick={() => selectRentalFeeOption(option)}
                          >
                            {option.label}
                          </Styled.FilterOption>
                        ))}
                      </Styled.FilterOptionList>
                      <Styled.MobileExpandedFilterFooter>
                        <Styled.TextButton
                          type="button"
                          aria-label="대관료 초기화"
                          disabled={
                            !rentalFeeMinInput && !rentalFeeMaxInput && !selectedRentalFeeOptionId
                          }
                          onClick={clearRentalFee}
                        >
                          <RefreshIcon />
                          초기화
                        </Styled.TextButton>
                      </Styled.MobileExpandedFilterFooter>
                    </Styled.MobileExpandedFilter>
                  ) : (
                    <Styled.MobileFilterSummary
                      type="button"
                      isPlaceholder={stagedRentalFeeLabel === DEFAULT_RENTAL_FEE_LABEL}
                      aria-label={
                        stagedRentalFeeLabel === DEFAULT_RENTAL_FEE_LABEL
                          ? '대관료 설정'
                          : `대관료 ${stagedRentalFeeLabel}`
                      }
                      onClick={() => handleSearchFieldClick('rentalFee', false)}
                    >
                      <Styled.MobileExpandedTitle>대관료</Styled.MobileExpandedTitle>
                      <strong>
                        {stagedRentalFeeLabel === DEFAULT_RENTAL_FEE_LABEL
                          ? '대관료 설정'
                          : stagedRentalFeeLabel}
                      </strong>
                    </Styled.MobileFilterSummary>
                  )}

                  {activeSearchField === 'capacity' ? (
                    <Styled.MobileExpandedFilter>
                      <Styled.MobileExpandedTitle>수용 인원</Styled.MobileExpandedTitle>
                      <Styled.FilterOptionList>
                        {capacityOptions.map((option) => (
                          <Styled.FilterOption
                            key={option.id}
                            type="button"
                            active={selectedCapacityOptionId === option.id}
                            aria-label={`모바일 ${option.label} 선택`}
                            onClick={() => {
                              setSelectedCapacityOptionId(option.id);
                              setIsCapacityCleared(false);
                            }}
                          >
                            {option.label}
                          </Styled.FilterOption>
                        ))}
                      </Styled.FilterOptionList>
                      <Styled.MobileExpandedFilterFooter>
                        <Styled.TextButton
                          type="button"
                          aria-label="수용 인원 초기화"
                          disabled={!selectedCapacityOptionId}
                          onClick={clearCapacity}
                        >
                          <RefreshIcon />
                          초기화
                        </Styled.TextButton>
                      </Styled.MobileExpandedFilterFooter>
                    </Styled.MobileExpandedFilter>
                  ) : (
                    <Styled.MobileFilterSummary
                      type="button"
                      isPlaceholder={stagedCapacityLabel === DEFAULT_CAPACITY_LABEL}
                      onClick={() => handleSearchFieldClick('capacity', false)}
                    >
                      <Styled.MobileExpandedTitle>수용 인원</Styled.MobileExpandedTitle>
                      <strong>{stagedCapacityLabel}</strong>
                    </Styled.MobileFilterSummary>
                  )}
                </Styled.MobileFilterSections>
                <Styled.MobileFilterFooter>
                  <Styled.MobileClearButton
                    type="button"
                    disabled={!hasStagedMobileFilters}
                    onClick={clearMobileFilters}
                  >
                    전체 삭제
                  </Styled.MobileClearButton>
                  <Styled.MobileApplyButton
                    type="button"
                    aria-label={
                      activeSearchField === 'rentalFee' ? '모바일 필터 다음' : '모바일 필터 검색하기'
                    }
                    onClick={handleMobilePrimaryAction}
                  >
                    {activeSearchField === 'rentalFee' ? '다음' : '검색하기'}
                  </Styled.MobileApplyButton>
                </Styled.MobileFilterFooter>
              </>
            )}
          </Styled.MobileFilterSheet>
        </Styled.MobileFilterOverlay>
      )}

      <Styled.Content hasDetail={hasDetail}>
        <Styled.ResultsPane $detailPanelOpen={hasDetail}>

          {hasSearchConditions && (
            <Styled.ChipRow>
              {(appliedRegionId != null || selectedRegionNameInput) && (
                <Styled.Chip
                  type="button"
                  aria-label={`${selectedRegionName ?? '선택한 지역'} 필터 제거`}
                  onClick={() => {
                    setSelectedRegionId(null);
                    setSelectedRegionNameInput(undefined);
                    setKeywordInput('');
                    updateParams({
                      keyword,
                      rentalFeeMin,
                      rentalFeeMax,
                      capacityMin,
                      capacityMax,
                      sort,
                    });
                  }}
                >
                  {selectedRegionName ?? '선택한 지역'} <CloseIcon />
                </Styled.Chip>
              )}
              {(rentalFeeMin != null || rentalFeeMax != null) && (
                <Styled.Chip
                  type="button"
                  onClick={() => {
                    clearRentalFee();
                    updateParams({ keyword, regionId, capacityMin, capacityMax, sort });
                  }}
                >
                  {rentalFeeLabel} <CloseIcon />
                </Styled.Chip>
              )}
              {appliedCapacityOption && (
                <Styled.Chip
                  type="button"
                  onClick={() => {
                    clearCapacity();
                    updateParams({ keyword, regionId, rentalFeeMin, rentalFeeMax, sort });
                  }}
                >
                  {appliedCapacityOption.label} <CloseIcon />
                </Styled.Chip>
              )}
            </Styled.ChipRow>
          )}

          {concertHalls.length > 0 && (
            <Styled.Toolbar $dimmed={activeSearchField != null} $detailPanelOpen={hasDetail}>
              <Styled.CountInfoPopup isOpen={isInfoPopupOpen} ref={infoPopupRef}>
                불티는 공연장 정보 제공 플랫폼으로, 대관 계약 및 예약 확정에 대한 책임은 당사자 간에
                있습니다.
                <Styled.CountInfoPopupCloseButton
                  type="button"
                  aria-label="닫기"
                  onClick={() => {
                    setInfoPopupOpen(false);
                  }}
                >
                  <CloseIcon />
                </Styled.CountInfoPopupCloseButton>
              </Styled.CountInfoPopup>
              <Styled.Count>
                <span>공연장</span>
                <Styled.CountValue $hasSearchConditions={hasSearchConditions}>
                  {totalElements}개
                </Styled.CountValue>
                <Styled.CountInfoPopupButton
                  type="button"
                  aria-label="공연장 검색 안내"
                  onClick={() => {
                    setInfoPopupOpen(true);
                  }}
                >
                  <InfoIcon />
                </Styled.CountInfoPopupButton>
              </Styled.Count>
              <Styled.SortGroup role="group" aria-label="공연장 정렬" $disabled={hasDetail}>
                <Styled.SortButton
                  type="button"
                  aria-pressed={sort === 'FEE_ASC'}
                  active={sort === 'FEE_ASC'}
                  disabled={hasDetail}
                  onClick={() =>
                    updateParams({
                      keyword,
                      regionId,
                      rentalFeeMin,
                      rentalFeeMax,
                      capacityMin,
                      capacityMax,
                      sort: 'FEE_ASC',
                    })
                  }
                >
                  대관료 낮은 순
                </Styled.SortButton>
                <Styled.SortButton
                  type="button"
                  aria-pressed={sort === 'FEE_DESC'}
                  active={sort === 'FEE_DESC'}
                  disabled={hasDetail}
                  onClick={() =>
                    updateParams({
                      keyword,
                      regionId,
                      rentalFeeMin,
                      rentalFeeMax,
                      capacityMin,
                      capacityMax,
                      sort: 'FEE_DESC',
                    })
                  }
                >
                  대관료 높은 순
                </Styled.SortButton>
              </Styled.SortGroup>
              <Styled.MobileSortButton
                type="button"
                aria-label={`정렬 ${mobileSortLabel}`}
                onClick={toggleMobileSort}
              >
                {sort === 'FEE_ASC' ? <AscendingIcon /> : <DescendingIcon />}
                {mobileSortLabel}
              </Styled.MobileSortButton>
            </Styled.Toolbar>
          )}

          {concertHallListQuery.isError && (
            <Styled.Empty>
              <Styled.EmptyTitle>공연장 정보를 불러오지 못했어요.</Styled.EmptyTitle>
              <Button
                type="button"
                colorTheme="netural"
                size="bold"
                onClick={() => concertHallListQuery.refetch()}
              >
                다시 시도
              </Button>
            </Styled.Empty>
          )}
          {!concertHallListQuery.isLoading &&
            !concertHallListQuery.isError &&
            concertHalls.length === 0 && (
              <Styled.Empty>
                <Styled.EmptyIcon aria-hidden="true">
                  <BooltiWhiteLogo />
                </Styled.EmptyIcon>
                {hasKeywordSearch ? (
                  <>
                    <Styled.EmptyDescription>
                      <span>찾으시는 공연장이 없어요.</span>
                      <span>입점을 요청해 보세요.</span>
                    </Styled.EmptyDescription>
                    <Styled.ButtonRow>
                      <Button type="button" colorTheme="netural" size="bold" onClick={resetSearch}>
                        필터 초기화
                      </Button>
                      <Button
                        type="button"
                        colorTheme="primary"
                        size="bold"
                        onClick={() => {
                          setEntryRequestName(keyword);
                          setEntryRequestTouched(false);
                          setIsEntryRequestOpen(true);
                        }}
                      >
                        입점 요청하기
                      </Button>
                    </Styled.ButtonRow>
                  </>
                ) : (
                  <>
                    <Styled.EmptyDescription>
                      <span>찾으시는 결과가 없어요.</span>
                      <span>조건을 변경해 보세요.</span>
                    </Styled.EmptyDescription>
                    <Button type="button" colorTheme="netural" size="bold" onClick={resetSearch}>
                      필터 초기화
                    </Button>
                  </>
                )}
              </Styled.Empty>
            )}
          {(page > 0 || !concertHallListQuery.isLoading) &&
            !concertHallListQuery.isError &&
            concertHalls.length > 0 && (
              <>
                <Styled.CardGrid $dimmed={activeSearchField != null}>
                  {concertHalls.map((concertHall) => (
                    <ConcertHallCard
                      key={concertHall.concertHallId}
                      concertHall={concertHall}
                      isDimmed={hasDetail && selectedConcertHallId !== concertHall.concertHallId}
                      isSelected={selectedConcertHallId === concertHall.concertHallId}
                      onClick={openDetailFromCard}
                    />
                  ))}
                </Styled.CardGrid>
                {concertHallListQuery.data?.hasNext && (
                  <Styled.LoadMoreTrigger ref={loadMoreTriggerRef} aria-hidden="true" />
                )}
              </>
            )}
        </Styled.ResultsPane>

        {hasDetail && (
          <>
            <Styled.DetailBackdrop aria-label="상세 배경" onClick={closeDetail} />
            <ConcertHallDetailPanel concertHallId={selectedConcertHallId} onClose={closeDetail} />
          </>
        )}
      </Styled.Content>

      {isRecentClearConfirmOpen && (
        <Styled.ModalBackdrop>
          <Styled.ConfirmModal ref={recentClearConfirmRef}>
            <Styled.ModalTitle>최근 검색어를 모두 삭제하시겠어요?</Styled.ModalTitle>
            <Styled.ModalButtons>
              <Button
                type="button"
                colorTheme="netural"
                size="bold"
                onClick={() => setIsRecentClearConfirmOpen(false)}
              >
                취소하기
              </Button>
              <Button type="button" colorTheme="primary" size="bold" onClick={clearRecentKeywords}>
                삭제하기
              </Button>
            </Styled.ModalButtons>
          </Styled.ConfirmModal>
        </Styled.ModalBackdrop>
      )}

      {isEntryRequestOpen && (
        <Styled.ModalBackdrop>
          <Styled.Modal onSubmit={submitEntryRequest}>
            <Styled.ModalTitle>공연장 이름을 확인한 후 요청 버튼을 눌러주세요!</Styled.ModalTitle>
            <Styled.ModalLabel>
              <Styled.ModalInput
                value={entryRequestName}
                hasError={hasEntryRequestError}
                onBlur={() => setEntryRequestTouched(true)}
                onChange={(event) => {
                  const nextName = event.target.value;
                  setEntryRequestName(nextName);
                  if (nextName.trim().length === 0) setEntryRequestTouched(true);
                }}
                placeholder="공연장 명을 입력해 주세요"
              />
            </Styled.ModalLabel>
            {hasEntryRequestError && <Styled.ErrorText>필수 입력사항입니다.</Styled.ErrorText>}
            <Styled.ModalButtons>
              <Button
                type="button"
                colorTheme="netural"
                size="bold"
                onClick={() => setIsEntryRequestOpen(false)}
              >
                취소하기
              </Button>
              <Button
                type="submit"
                colorTheme="primary"
                size="bold"
                disabled={entryRequestName.trim().length === 0 || entryRequestMutation.isLoading}
                onClick={() => setIsEntryRequestOpen(false)}
              >
                요청하기
              </Button>
            </Styled.ModalButtons>
          </Styled.Modal>
        </Styled.ModalBackdrop>
      )}
    </Styled.Page>
    </>
  );
};

export default ConcertHallSearchPage;
