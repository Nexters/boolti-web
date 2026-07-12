import type { ConcertHallProfileResponse } from '@boolti/api';
import { checkIsWebView } from '@boolti/bridge';
import { ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { PreviewMapWithProvider, useToast } from '@boolti/ui';
import { useLayoutEffect, useRef, useState } from 'react';

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

  // 미리보기 장수는 백엔드가 제어(최대 5장)하고, 전체는 갤러리 모달에서 별도 조회한다.
  const visibleImages = home?.images ?? [];
  const totalImageCount = home?.totalImageCount ?? visibleImages.length;
  const hiddenImageCount = totalImageCount - visibleImages.length;

  const amenities = home?.amenities ?? [];
  const location = home?.location;
  const addressText = formatAddress(location);
  const hasMap =
    location?.latitude != null && location?.longitude != null && Boolean(X_NCP_APIGW_API_KEY_ID);

  const handleCopyAddress = async () => {
    if (!addressText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(addressText);
      toast.success('주소를 복사했어요.');
    } catch {
      toast.error('주소 복사에 실패했어요.');
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
                  onClick={() =>
                    setGallery(
                      showMoreOverlay ? { mode: 'list', index: 0 } : { mode: 'viewer', index },
                    )
                  }
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
          <Styled.AddressLine>
            {addressText}・
            <Styled.CopyButton type="button" onClick={handleCopyAddress}>
              복사
            </Styled.CopyButton>
          </Styled.AddressLine>
          {hasMap && (
            <PreviewMapWithProvider
              ncpKeyId={X_NCP_APIGW_API_KEY_ID}
              latitude={location.latitude as number}
              longitude={location.longitude as number}
              name={profile.name}
              isAppWebview={checkIsWebView()}
            />
          )}
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
