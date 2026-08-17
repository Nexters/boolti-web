import { useConcertHallSearchDetail, useConcertHallSearchImages } from '@boolti/api';
import type { ConcertHallAmenity, ConcertHallCapacity, ConcertHallImage } from '@boolti/api';
import {
  ArrowLeftIcon,
  CallOutlineIcon,
  CloseIcon,
  EmailOutlineIcon,
  PhotoIcon,
  ShareIcon,
  WebsiteIcon,
} from '@boolti/icon';
import { PreviewMap, SubwayLineBadge, useToast } from '@boolti/ui';
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { X_NCP_APIGW_API_KEY_ID } from '~/constants/ncp';
import ConcertHallRentalTab from './ConcertHallRentalTab';
import Styled from './ConcertHallSearchPage.styles';
import {
  AlcoholIcon,
  CabinetIcon,
  ParkingIcon,
  RestroomIcon,
  SecondFloorIcon,
  WaitingRoomIcon,
} from './icons';

const INTRODUCTION_COLLAPSED_HEIGHT = 280;

type DetailTab = 'home' | 'rental';
type GalleryState = { mode: 'list' | 'viewer'; index: number } | null;

const AMENITY_ICONS: Record<string, ReactNode> = {
  WAITING_ROOM: <WaitingRoomIcon />,
  SECOND_FLOOR_SEATING: <SecondFloorIcon />,
  INDOOR_RESTROOM: <RestroomIcon />,
  ALCOHOL_SALES: <AlcoholIcon />,
  PARKING: <ParkingIcon />,
  CABINET: <CabinetIcon />,
};

const formatAddress = (streetAddress?: string, detailAddress?: string) => {
  const address = [streetAddress, detailAddress].filter(Boolean).join(' ');
  return address || '위치 정보 없음';
};

const formatCapacity = (capacity?: ConcertHallCapacity) => {
  const values = [];
  if (capacity?.seatedCapacity != null) values.push(`좌석 ${capacity.seatedCapacity}석`);
  if (capacity?.standingCapacity != null) values.push(`스탠딩 ${capacity.standingCapacity}명`);
  return values.length > 0 ? values.join(' · ') : '정보 없음';
};

const formatAmenity = (amenity: ConcertHallAmenity) =>
  amenity.count != null ? `${amenity.name} ${amenity.count}` : amenity.name;

const bySequence = <T extends { sequence?: number }>(left: T, right: T) =>
  (left.sequence ?? 0) - (right.sequence ?? 0);

const formatUpdatedAt = (value?: string) => {
  if (!value) return null;
  const dateParts = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return dateParts ? `${dateParts[1]}.${dateParts[2]}.${dateParts[3]}` : null;
};

const Gallery = ({
  concertHallId,
  hallName,
  state,
  onChange,
  onClose,
}: {
  concertHallId: number;
  hallName: string;
  state: NonNullable<GalleryState>;
  onChange: (state: NonNullable<GalleryState>) => void;
  onClose: () => void;
}) => {
  const imagesQuery = useConcertHallSearchImages(concertHallId, true);
  const images = (imagesQuery.data?.items ?? []).slice().sort(bySequence);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useLayoutEffect(() => {
    if (state.mode === 'viewer' && viewerRef.current) {
      viewerRef.current.scrollLeft = viewerRef.current.clientWidth * state.index;
    }
  }, [state.index, state.mode]);

  const handleBack = () => {
    if (state.mode === 'viewer') {
      onChange({ mode: 'list', index: 0 });
      return;
    }
    onClose();
  };

  return (
    <Styled.GalleryOverlay role="dialog" aria-modal="true" aria-label={`${hallName} 사진 갤러리`}>
      <Styled.GalleryHeader>
        <Styled.GalleryHeaderButton type="button" aria-label="갤러리 뒤로" onClick={handleBack}>
          <ArrowLeftIcon />
        </Styled.GalleryHeaderButton>
        <Styled.GalleryTitle>사진</Styled.GalleryTitle>
        <Styled.GalleryHeaderButton type="button" aria-label="갤러리 닫기" onClick={onClose}>
          <CloseIcon />
        </Styled.GalleryHeaderButton>
      </Styled.GalleryHeader>
      {imagesQuery.isLoading ? (
        <Styled.GalleryState>사진을 불러오는 중입니다.</Styled.GalleryState>
      ) : imagesQuery.isError ? (
        <Styled.GalleryState>
          <div>
            <p>사진을 불러오지 못했어요.</p>
            <Styled.TextToggleButton type="button" onClick={() => imagesQuery.refetch()}>
              다시 시도
            </Styled.TextToggleButton>
          </div>
        </Styled.GalleryState>
      ) : state.mode === 'viewer' ? (
        <Styled.GalleryViewer ref={viewerRef}>
          {images.map((image, index) => (
            <Styled.GallerySlide key={image.id}>
              <img src={image.imageUrl} alt={`${hallName} 사진 ${index + 1}`} />
            </Styled.GallerySlide>
          ))}
        </Styled.GalleryViewer>
      ) : (
        <Styled.GalleryGrid>
          {images.map((image, index) => (
            <Styled.GalleryGridButton
              key={image.id}
              type="button"
              aria-label={`사진 ${index + 1} 크게 보기`}
              onClick={() => onChange({ mode: 'viewer', index })}
            >
              <img src={image.thumbnailUrl ?? image.imageUrl} alt="" />
            </Styled.GalleryGridButton>
          ))}
        </Styled.GalleryGrid>
      )}
    </Styled.GalleryOverlay>
  );
};

const ConcertHallDetailPanel = ({
  concertHallId,
  onClose,
}: {
  concertHallId: number;
  onClose: () => void;
}) => {
  const toast = useToast();
  const query = useConcertHallSearchDetail(concertHallId);
  const [activeTab, setActiveTab] = useState<DetailTab>('home');
  const [isIntroductionExpanded, setIsIntroductionExpanded] = useState(false);
  const [isIntroductionOverflowing, setIsIntroductionOverflowing] = useState(false);
  const [gallery, setGallery] = useState<GalleryState>(null);
  const introductionRef = useRef<HTMLDivElement>(null);
  const concertHall = query.data;

  useEffect(() => {
    if (window.innerWidth >= 1120) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (gallery?.mode === 'viewer') {
        setGallery({ mode: 'list', index: 0 });
      } else if (gallery) {
        setGallery(null);
      } else {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery, onClose]);

  useLayoutEffect(() => {
    const element = introductionRef.current;
    setIsIntroductionOverflowing(
      Boolean(element && element.scrollHeight > INTRODUCTION_COLLAPSED_HEIGHT),
    );
  }, [concertHall?.home?.introduction]);

  if (query.isLoading) {
    return (
      <Styled.DetailPane>
        <Styled.DetailState>
          <Styled.DetailCloseButton type="button" aria-label="상세 닫기" onClick={onClose}>
            <ArrowLeftIcon />
          </Styled.DetailCloseButton>
        </Styled.DetailState>
      </Styled.DetailPane>
    );
  }

  if (query.isError || !concertHall) {
    return (
      <Styled.DetailPane>
        <Styled.DetailState>
          <Styled.DetailCloseButton type="button" aria-label="상세 닫기" onClick={onClose}>
            <ArrowLeftIcon />
          </Styled.DetailCloseButton>
          <div>
            <Styled.EmptyTitle>공연장 상세 정보를 불러오지 못했어요.</Styled.EmptyTitle>
            <Styled.TextToggleButton type="button" onClick={() => query.refetch()}>
              다시 시도
            </Styled.TextToggleButton>
          </div>
        </Styled.DetailState>
      </Styled.DetailPane>
    );
  }

  const shareCode = concertHall.share?.shareCode ?? concertHall.shareCode;
  const contact = concertHall.head?.contact;
  const hasContact = Boolean(contact?.websiteUrl || contact?.phoneNumber || contact?.email);
  const location = concertHall.home?.location ?? concertHall.head?.location;
  const address = formatAddress(location?.streetAddress, location?.detailAddress);
  const previewImages = (concertHall.home?.images ?? []).slice().sort(bySequence);
  const totalImageCount = concertHall.home?.totalImageCount ?? previewImages.length;
  const hiddenImageCount = Math.max(totalImageCount - previewImages.length, 0);
  const updatedAt = formatUpdatedAt(concertHall.informationUpdatedAt);
  const hasMap =
    location?.latitude != null && location?.longitude != null && Boolean(X_NCP_APIGW_API_KEY_ID);

  const showMissingContactToast = () => toast.info('등록된 연락처 정보가 없어요.');
  const shareConcertHall = async () => {
    if (!shareCode) return;
    const shareData = {
      title: concertHall.share?.title ?? concertHall.name,
      url: `https://place.boolti.in/${shareCode}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 사용자가 공유 창을 닫은 경우
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast.success('공연장 링크를 복사했어요.');
    } catch {
      toast.error('공연장 링크를 복사하지 못했어요.');
    }
  };
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('주소를 복사했어요.');
    } catch {
      toast.error('주소를 복사하지 못했어요.');
    }
  };

  const renderHome = () => {
    if (!concertHall.hasHomeTabData) return <Styled.ComingSoon>COMING SOON</Styled.ComingSoon>;
    return (
      <>
        {concertHall.home?.introduction && (
          <Styled.DetailSection>
            <Styled.DetailSectionTitle>소개</Styled.DetailSectionTitle>
            <Styled.IntroductionText
              ref={introductionRef}
              $collapsed={isIntroductionOverflowing && !isIntroductionExpanded}
            >
              <Styled.DetailText>{concertHall.home.introduction}</Styled.DetailText>
            </Styled.IntroductionText>
            {isIntroductionOverflowing && (
              <Styled.TextToggleButton
                type="button"
                onClick={() => setIsIntroductionExpanded((value) => !value)}
              >
                {isIntroductionExpanded ? '내용 접기' : '내용 더 보기'}
              </Styled.TextToggleButton>
            )}
          </Styled.DetailSection>
        )}
        {previewImages.length > 0 && (
          <Styled.DetailSection>
            <Styled.DetailSectionTitle>사진</Styled.DetailSectionTitle>
            <Styled.ImageGrid>
              {previewImages.map((image: ConcertHallImage, index) => {
                const isLast = index === previewImages.length - 1;
                return isLast && hiddenImageCount > 0 ? (
                  <Styled.MoreImageButton
                    key={image.id}
                    type="button"
                    imageUrl={image.thumbnailUrl ?? image.imageUrl}
                    aria-label={`사진 ${hiddenImageCount}장 더 보기`}
                    onClick={() => setGallery({ mode: 'list', index: 0 })}
                  >
                    <PhotoIcon />
                    <Styled.MoreImageCount>+{hiddenImageCount}</Styled.MoreImageCount>
                  </Styled.MoreImageButton>
                ) : (
                  <Styled.GalleryGridButton
                    key={image.id}
                    type="button"
                    aria-label={`사진 ${index + 1} 크게 보기`}
                    onClick={() => setGallery({ mode: 'viewer', index })}
                  >
                    <img src={image.thumbnailUrl ?? image.imageUrl} alt="" />
                  </Styled.GalleryGridButton>
                );
              })}
            </Styled.ImageGrid>
          </Styled.DetailSection>
        )}
        <Styled.DetailSection>
          <Styled.DetailSectionTitle>편의 시설 및 서비스</Styled.DetailSectionTitle>
          {concertHall.home?.amenities?.length ? (
            <Styled.AmenityGrid>
              {concertHall.home.amenities.map((amenity) => (
                <li key={amenity.type ?? amenity.name}>
                  {AMENITY_ICONS[amenity.type]}
                  <span>{formatAmenity(amenity)}</span>
                </li>
              ))}
            </Styled.AmenityGrid>
          ) : (
            <Styled.DetailText>등록된 편의 시설 정보가 없습니다.</Styled.DetailText>
          )}
        </Styled.DetailSection>
        {address !== '위치 정보 없음' && (
          <Styled.DetailSection>
            <Styled.DetailSectionTitle>위치</Styled.DetailSectionTitle>
            <Styled.AddressLine>
              {address} ·{' '}
              <Styled.InlineActionButton type="button" onClick={copyAddress}>
                복사
              </Styled.InlineActionButton>
            </Styled.AddressLine>
            {hasMap && (
              <div aria-label={`${concertHall.name} 지도`}>
                <Suspense fallback={<Styled.MapBox aria-label="지도 불러오는 중" />}>
                  <PreviewMap
                    latitude={location.latitude as number}
                    longitude={location.longitude as number}
                    name={concertHall.name}
                    isAppWebview={false}
                  />
                </Suspense>
              </div>
            )}
          </Styled.DetailSection>
        )}
      </>
    );
  };

  const renderRental = () => {
    if (concertHall.hasRentalTabData === false || !concertHall.rental) {
      return <Styled.ComingSoon>COMING SOON</Styled.ComingSoon>;
    }

    return <ConcertHallRentalTab rental={concertHall.rental} />;
  };
  return (
    <Styled.DetailPane>
      <Styled.DetailNavigation>
        <Styled.DetailCloseButton type="button" aria-label="상세 닫기" onClick={onClose}>
          <ArrowLeftIcon />
        </Styled.DetailCloseButton>
        <Styled.DetailShareButton
          type="button"
          aria-label="공연장 링크 공유"
          disabled={!shareCode}
          onClick={shareConcertHall}
        >
          <ShareIcon />
        </Styled.DetailShareButton>
      </Styled.DetailNavigation>
      <Styled.DetailHeader>
        <Styled.DetailHeaderTitle>{concertHall.name}</Styled.DetailHeaderTitle>
      </Styled.DetailHeader>
      <Styled.DetailHero imageUrl={concertHall.representativeImageUrl}>
        <Styled.DetailTitle>{concertHall.name}</Styled.DetailTitle>
      </Styled.DetailHero>
      <Styled.DetailMetaList style={{ padding: '16px 20px' }}>
        <Styled.DetailMetaLabel>대관료</Styled.DetailMetaLabel>
        <Styled.DetailMetaValue>
          {concertHall.head?.rentalFeeSummary ?? '문의'}
        </Styled.DetailMetaValue>
        <Styled.DetailMetaLabel>수용 인원</Styled.DetailMetaLabel>
        <Styled.DetailMetaValue>
          {formatCapacity(concertHall.head?.capacity)}
        </Styled.DetailMetaValue>
        <Styled.DetailMetaLabel>위치</Styled.DetailMetaLabel>
        <Styled.DetailMetaValue>{address}</Styled.DetailMetaValue>
        <Styled.DetailMetaLabel>지하철역</Styled.DetailMetaLabel>
        <Styled.DetailMetaValue>
          <Styled.SubwayList>
            {(concertHall.head?.subwayStations ?? []).map((station) => (
              <Styled.SubwayItem key={station.id ?? station.stationName}>
                {station.lines.map((line) => (
                  <span
                    key={line.id ?? line.lineName}
                    aria-label={`${station.stationName} ${line.lineName}`}
                  >
                    <SubwayLineBadge
                      lineName={line.lineName}
                      colorHex={line.colorHex}
                      size="small"
                    />
                  </span>
                ))}
                {station.stationName}
              </Styled.SubwayItem>
            ))}
          </Styled.SubwayList>
        </Styled.DetailMetaValue>
      </Styled.DetailMetaList>
      {hasContact && (
        <Styled.DetailActions>
          <Styled.DetailAction
            type="button"
            aria-label="웹사이트 열기"
            aria-disabled={!contact?.websiteUrl}
            onClick={() =>
              contact?.websiteUrl
                ? window.open(contact.websiteUrl, '_blank', 'noreferrer')
                : showMissingContactToast()
            }
          >
            <WebsiteIcon />
            웹사이트
          </Styled.DetailAction>
          <Styled.DetailAction
            type="button"
            aria-label="전화 걸기"
            aria-disabled={!contact?.phoneNumber}
            onClick={() =>
              contact?.phoneNumber
                ? window.location.assign(`tel:${contact.phoneNumber}`)
                : showMissingContactToast()
            }
          >
            <CallOutlineIcon />
            전화
          </Styled.DetailAction>
          <Styled.DetailAction
            type="button"
            aria-label="메일 보내기"
            aria-disabled={!contact?.email}
            onClick={() =>
              contact?.email
                ? window.location.assign(`mailto:${contact.email}`)
                : showMissingContactToast()
            }
          >
            <EmailOutlineIcon />
            메일
          </Styled.DetailAction>
        </Styled.DetailActions>
      )}
      <Styled.DetailTabs role="tablist" aria-label="공연장 상세 탭">
        <Styled.DetailTab
          type="button"
          role="tab"
          aria-selected={activeTab === 'home'}
          onClick={() => setActiveTab('home')}
        >
          홈
        </Styled.DetailTab>
        <Styled.DetailTab
          type="button"
          role="tab"
          aria-selected={activeTab === 'rental'}
          onClick={() => setActiveTab('rental')}
        >
          대관 정보
        </Styled.DetailTab>
      </Styled.DetailTabs>
      {activeTab === 'home' ? renderHome() : renderRental()}
      <Styled.Disclaimer>
        공연장 정보는 공연장 제공 자료를 바탕으로 하며, 실제 대관 조건은 공연장에 확인해 주세요.
        {updatedAt && (
          <>
            <br />
            정보 업데이트 {updatedAt}
          </>
        )}
      </Styled.Disclaimer>
      {gallery && (
        <Gallery
          concertHallId={concertHall.id}
          hallName={concertHall.name}
          state={gallery}
          onChange={setGallery}
          onClose={() => setGallery(null)}
        />
      )}
    </Styled.DetailPane>
  );
};

export default ConcertHallDetailPanel;
