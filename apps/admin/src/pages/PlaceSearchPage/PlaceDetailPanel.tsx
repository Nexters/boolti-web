import { useConcertHallProfile } from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { ConcertHallProfile, useBodyScrollLock } from '@boolti/ui';
import { useEffect } from 'react';

import { X_NCP_APIGW_API_KEY_ID } from '~/constants/ncp';
import Styled from './PlaceSearchPage.styles';

const PlaceDetailPanel = ({
  concertHallId,
  onClose,
}: {
  concertHallId: number;
  onClose: () => void;
}) => {
  const query = useConcertHallProfile(concertHallId);
  const concertHall = query.data;

  useBodyScrollLock(window.innerWidth < 1120);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (document.querySelector('[role="dialog"][aria-modal="true"]')) {
        return;
      }

      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (query.isLoading) {
    return (
      <Styled.DetailPane>
        <Styled.DetailState>
          <Styled.DetailCloseButton type="button" aria-label="상세 닫기" onClick={onClose}>
            <ArrowLeftIcon />
          </Styled.DetailCloseButton>
          <p>공연장 상세 정보를 불러오는 중입니다.</p>
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

  return (
    <Styled.DetailPane>
      <ConcertHallProfile
        profile={concertHall}
        displayMode="full"
        shareUrl={shareCode ? `https://place.boolti.in/${shareCode}` : ''}
        naverMapKey={X_NCP_APIGW_API_KEY_ID}
        onBack={onClose}
      />
    </Styled.DetailPane>
  );
};

export default PlaceDetailPanel;
