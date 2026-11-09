import { useConcertHallImages } from '@boolti/api';
import { ArrowLeftIcon, CloseIcon } from '@boolti/icon';
import { useEffect, useRef, useState } from 'react';

import { useBodyScrollLock } from '../../useBodyScrollLock';
import sortBySequence from '../../utils/sortBySequence';
import Styled from './GalleryModal.styles';

export type GalleryMode = 'list' | 'viewer';

interface Props {
  concertHallId: number;
  hallName: string;
  open: boolean;
  /** 'viewer'면 바로 크게 보기, 'list'면 사진 목록부터 */
  initialMode: GalleryMode;
  initialIndex?: number;
  onClose: () => void;
}

const GalleryModal = ({
  concertHallId,
  hallName,
  open,
  initialMode,
  initialIndex = 0,
  onClose,
}: Props) => {
  const { data, isLoading, isError, refetch } = useConcertHallImages(concertHallId, open);
  const images = sortBySequence(data?.items ?? []);

  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);

  // 모달이 열릴 때 초기 모드/인덱스 설정
  useEffect(() => {
    if (open) {
      setViewerIndex(initialMode === 'viewer' ? initialIndex : null);
      setActiveIndex(initialIndex);
    }
  }, [open, initialMode, initialIndex]);

  // 뷰어 진입 시 해당 인덱스로 스크롤 위치 이동
  useEffect(() => {
    if (viewerIndex != null && carouselRef.current) {
      const el = carouselRef.current;
      el.scrollLeft = el.clientWidth * viewerIndex;
      setActiveIndex(viewerIndex);
    }
  }, [viewerIndex]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.stopImmediatePropagation();
      if (viewerIndex != null && initialMode === 'list') {
        setViewerIndex(null);
      } else {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape, true);
    return () => {
      window.removeEventListener('keydown', handleEscape, true);
    };
  }, [initialMode, onClose, open, viewerIndex]);

  if (!open) {
    return null;
  }

  const isViewer = viewerIndex != null;

  // 목록에서 진입한 뷰어는 목록으로, 바로 뷰어로 진입한 경우는 모달 닫기
  const handleCloseViewer = () => {
    if (initialMode === 'viewer') {
      onClose();
    } else {
      setViewerIndex(null);
    }
  };

  const handleScroll = () => {
    const el = carouselRef.current;
    if (el && el.clientWidth > 0) {
      setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
    }
  };

  return (
    <Styled.Overlay role="dialog" aria-modal="true" aria-label={`${hallName} 사진 갤러리`}>
      <Styled.Inner>
        {isViewer ? (
          <Styled.Header>
            <Styled.HeaderSpacer />
            <Styled.HeaderButton type="button" aria-label="닫기" onClick={handleCloseViewer}>
              <CloseIcon />
            </Styled.HeaderButton>
          </Styled.Header>
        ) : (
          <Styled.Header>
            <Styled.HeaderButton type="button" aria-label="뒤로" onClick={onClose}>
              <ArrowLeftIcon />
            </Styled.HeaderButton>
            <Styled.HeaderTitle>사진</Styled.HeaderTitle>
          </Styled.Header>
        )}
        {isLoading ? (
          <Styled.State role="status">사진을 불러오는 중입니다.</Styled.State>
        ) : isError ? (
          <Styled.State role="alert">
            <Styled.StateContent>
              <Styled.StateMessage>사진을 불러오지 못했어요.</Styled.StateMessage>
              <Styled.RetryButton type="button" onClick={() => refetch()}>
                다시 시도
              </Styled.RetryButton>
            </Styled.StateContent>
          </Styled.State>
        ) : isViewer ? (
          <Styled.ViewerBody>
            <Styled.Carousel ref={carouselRef} onScroll={handleScroll}>
              {images.map((image, index) => (
                <Styled.Slide key={image.id}>
                  <Styled.SlideImage src={image.imageUrl} alt={`${hallName} 사진 ${index + 1}`} />
                </Styled.Slide>
              ))}
            </Styled.Carousel>
            {images.length > 1 && (
              <Styled.Dots>
                {images.map((image, index) => (
                  <Styled.Dot key={image.id} active={index === activeIndex} />
                ))}
              </Styled.Dots>
            )}
          </Styled.ViewerBody>
        ) : (
          <Styled.GridScroll>
            <Styled.Grid>
              {images.map((image, index) => (
                <Styled.GridItem
                  key={image.id}
                  type="button"
                  aria-label={`사진 ${index + 1} 크게 보기`}
                  onClick={() => setViewerIndex(index)}
                >
                  <Styled.GridImage
                    src={image.thumbnailUrl || image.imageUrl}
                    alt={`${hallName} 사진 ${index + 1}`}
                  />
                </Styled.GridItem>
              ))}
            </Styled.Grid>
          </Styled.GridScroll>
        )}
      </Styled.Inner>
    </Styled.Overlay>
  );
};

export default GalleryModal;
