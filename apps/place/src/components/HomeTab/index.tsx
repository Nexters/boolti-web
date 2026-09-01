import { type ConcertHallProfileResponse, useConcertHallImages } from '@boolti/api';
import {
  checkIsWebView,
  isWebViewBridgeAvailable,
  showToast,
  TOAST_DURATIONS,
  viewPlacePhotoDetail,
} from '@boolti/bridge';
import { ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { PreviewMapWithProvider, useToast } from '@boolti/ui';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import GalleryModal, { type GalleryMode } from '~/components/GalleryModal';
import {
  AlcoholIcon,
  CabinetIcon,
  CameraIcon,
  ParkingIcon,
  RestroomIcon,
  SecondFloorIcon,
  WaitingRoomIcon,
} from '~/components/icons';
import { X_NCP_APIGW_API_KEY_ID } from '~/constants/ncp';
import { formatAddress, formatAmenityLabel } from '~/utils/format';

import Styled from './HomeTab.styles';

const INTRODUCTION_COLLAPSED_HEIGHT = 280;

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WAITING_ROOM: <WaitingRoomIcon />,
  SECOND_FLOOR_SEATING: <SecondFloorIcon />,
  INDOOR_RESTROOM: <RestroomIcon />,
  ALCOHOL_SALES: <AlcoholIcon />,
  PARKING: <ParkingIcon />,
  CABINET: <CabinetIcon />,
};

interface IntroductionSectionProps {
  introduction: string;
}

const IntroductionSection = ({ introduction }: IntroductionSectionProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > INTRODUCTION_COLLAPSED_HEIGHT);
    }
  }, [introduction]);

  const isCollapsed = isOverflowing && !isExpanded;

  return (
    <Styled.Section>
      <Styled.SectionTitle>소개</Styled.SectionTitle>
      <Styled.IntroductionWrapper>
        <Styled.IntroductionText ref={textRef} isCollapsed={isCollapsed}>
          <Styled.IntroductionParagraph>{introduction}</Styled.IntroductionParagraph>
          {isCollapsed && <Styled.IntroductionDim />}
        </Styled.IntroductionText>
        {isOverflowing && (
          <Styled.MoreButton type="button" onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? '내용 접기' : '내용 더 보기'}
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Styled.MoreButton>
        )}
      </Styled.IntroductionWrapper>
    </Styled.Section>
  );
};

interface Props {
  profile: ConcertHallProfileResponse;
}

const HomeTab = ({ profile }: Props) => {
  const toast = useToast();
  const home = profile.home;
  const [gallery, setGallery] = useState<{ mode: GalleryMode; index: number } | null>(null);

  // 앱 웹뷰에서는 사진 화면을 앱이 띄우므로, 넘겨줄 전체 사진 ID를 미리 조회해 둔다
  const isAppWebView = isWebViewBridgeAvailable();
  const { data: allImages } = useConcertHallImages(profile.id, isAppWebView);

  // 미리보기 장수는 백엔드가 제어(최대 5장)하고, 전체는 갤러리 모달에서 별도 조회한다.
  const visibleImages = home?.images ?? [];
  const totalImageCount = home?.totalImageCount ?? visibleImages.length;
  const hiddenImageCount = totalImageCount - visibleImages.length;

  const amenities = home?.amenities ?? [];
  const location = home?.location;
  const addressText = formatAddress(location);
  const hasMap =
    location?.latitude != null && location?.longitude != null && Boolean(X_NCP_APIGW_API_KEY_ID);

  // 갤러리 모달 open/close 등 HomeTab 리렌더 때 지도까지 리렌더되면
  // react-naver-maps가 지도를 파괴/재생성하며 크래시한다(KVO.destroy null 등).
  // 지도 엘리먼트를 메모이즈해 참조를 고정하면 React가 이 서브트리 재조정을 건너뛴다.
  const mapElement = useMemo(() => {
    if (!hasMap) {
      return null;
    }

    return (
      <PreviewMapWithProvider
        ncpKeyId={X_NCP_APIGW_API_KEY_ID}
        latitude={location.latitude as number}
        longitude={location.longitude as number}
        name={profile.name}
        isAppWebview={checkIsWebView()}
      />
    );
  }, [hasMap, location?.latitude, location?.longitude, profile.name]);

  // 앱 웹뷰에서는 사진 목록/뷰어를 앱 네이티브 화면이 담당하므로 브릿지로 넘긴다
  const handlePhotoClick = (index: number, showMoreOverlay: boolean) => {
    if (isAppWebView) {
      const images = allImages?.items ?? visibleImages;
      const selectedImage = visibleImages[index];

      viewPlacePhotoDetail({
        id: profile.id,
        // 더보기 버튼이면 전체 목록, 개별 사진이면 그 사진 하나만 넘긴다
        imageIds:
          showMoreOverlay || !selectedImage ? images.map((image) => image.id) : [selectedImage.id],
      }).catch(() => {
        // 앱이 응답하지 않아도 웹에서 할 수 있는 처리는 없다
      });

      return;
    }

    setGallery(showMoreOverlay ? { mode: 'list', index: 0 } : { mode: 'viewer', index });
  };

  // 인앱 웹뷰에서는 웹 토스트 대신 앱이 네이티브 토스트를 띄우도록 브릿지로 넘긴다.
  const notify = (message: string, showWebToast: (message: string) => void) => {
    if (isAppWebView) {
      showToast({ message, duration: TOAST_DURATIONS.SHORT }).catch(() => {
        // 앱이 응답하지 않아도 웹에서 할 수 있는 처리는 없다
      });

      return;
    }

    showWebToast(message);
  };

  const handleCopyAddress = async () => {
    if (!addressText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(addressText);
      notify('주소를 복사했어요.', toast.success);
    } catch {
      notify('주소 복사에 실패했어요.', toast.error);
    }
  };

  return (
    <>
      <Styled.Container>
        {home?.introduction && <IntroductionSection introduction={home.introduction} />}
        {visibleImages.length > 0 && (
          <Styled.Section>
            <Styled.SectionTitle>사진</Styled.SectionTitle>
            <Styled.PhotoGrid>
              {visibleImages.map((image, index) => {
                const isLastVisible = index === visibleImages.length - 1;
                const showMoreOverlay = isLastVisible && hiddenImageCount > 0;

                return (
                  <Styled.PhotoItem
                    key={image.id}
                    type="button"
                    onClick={() => handlePhotoClick(index, showMoreOverlay)}
                  >
                    <Styled.PhotoImage
                      src={image.thumbnailUrl || image.imageUrl}
                      alt={`${profile.name} 사진 ${index + 1}`}
                    />
                    {showMoreOverlay && (
                      <Styled.PhotoMoreOverlay>
                        <CameraIcon />
                        <Styled.PhotoMoreCount>{totalImageCount}</Styled.PhotoMoreCount>
                      </Styled.PhotoMoreOverlay>
                    )}
                  </Styled.PhotoItem>
                );
              })}
            </Styled.PhotoGrid>
          </Styled.Section>
        )}
        {amenities.length > 0 && (
          <Styled.Section>
            <Styled.SectionTitle>편의 시설 및 서비스</Styled.SectionTitle>
            <Styled.AmenityGrid>
              {amenities.map((amenity) => (
                <Styled.AmenityItem key={amenity.type}>
                  {AMENITY_ICONS[amenity.type]}
                  <Styled.AmenityLabel>{formatAmenityLabel(amenity)}</Styled.AmenityLabel>
                </Styled.AmenityItem>
              ))}
            </Styled.AmenityGrid>
          </Styled.Section>
        )}
        {addressText && (
          <Styled.Section>
            <Styled.SectionTitle>위치</Styled.SectionTitle>
            <Styled.AddressLine type="button" onClick={handleCopyAddress}>
              {addressText}・<Styled.CopyLabel>복사</Styled.CopyLabel>
            </Styled.AddressLine>
            {mapElement}
          </Styled.Section>
        )}
      </Styled.Container>
      {gallery && (
        <GalleryModal
          concertHallId={profile.id}
          hallName={profile.name}
          open
          initialMode={gallery.mode}
          initialIndex={gallery.index}
          onClose={() => setGallery(null)}
        />
      )}
    </>
  );
};

export default HomeTab;
