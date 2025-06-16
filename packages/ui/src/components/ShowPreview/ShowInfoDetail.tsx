import { useRef, useState, useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import { showToast, checkIsWebView, TOAST_DURATIONS } from '@boolti/bridge';
import { CallIcon, ChevronDownIcon, ChevronUpIcon, MessageIcon, TicketIcon } from '@boolti/icon';

import Styled from './ShowPreview.styles';
import PreviewMap from '../PreviewMap';

interface Props {
  show: {
    date: string;
    salesStartTime?: string;
    salesEndTime?: string;
    notice: string;
    hostName: string;
    placeName: string;
    streetAddress: string;
    detailAddress: string;
    latitude?: number;
    longitude?: number;
  };
  soldTicketCount?: number;
  isAppWebview?: boolean;
  onClickCallLink?: () => void;
  onClickMessageLink?: () => void;
  onClickCallLinkMobile?: () => void;
  onClickMessageLinkMobile?: () => void;
  onClickViewNotice?: () => void;
}

const ShowInfoDetail = ({
  show: {
    date,
    salesStartTime,
    salesEndTime,
    notice,
    hostName,
    latitude,
    longitude,
    placeName,
    streetAddress,
    detailAddress,
  },
  soldTicketCount,
  isAppWebview = false,
  onClickCallLink,
  onClickMessageLink,
  onClickCallLinkMobile,
  onClickMessageLinkMobile,
  onClickViewNotice,
}: Props) => {
  const showNoticeRef = useRef<HTMLDivElement>(null);
  const swiper = useSwiper();

  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const isEnded = nextDay < new Date();

  const [collapse, setCollapse] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (showNoticeRef.current) {
      setIsOverflow(showNoticeRef.current.scrollHeight > 400);
    }
  }, [notice]);

  useEffect(() => {
    swiper?.update();
  }, [collapse, isOverflow, swiper]);

  const viewMoreClickHandler = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <Styled.ShowInfo>
      {salesStartTime && salesEndTime && (
        <Styled.ShowInfoGroup>
          <Styled.ShowInfoTitleContainer>
            <Styled.ShowInfoTitle>티켓 판매</Styled.ShowInfoTitle>
          </Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoDescription style={{ marginBottom: '0' }}>
            {salesStartTime} - {salesEndTime}
          </Styled.ShowInfoDescription>
          {isEnded && soldTicketCount !== undefined && (
            <Styled.ShowTicketInfoDescription>
              <Styled.TicketIcon>
                <TicketIcon />
              </Styled.TicketIcon>{' '}
              {soldTicketCount}매 판매 완료
            </Styled.ShowTicketInfoDescription>
          )}
        </Styled.ShowInfoGroup>
      )}
      <Styled.ShowInfoGroup style={{ paddingBottom: isOverflow ? '0' : '24px' }}>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>내용</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoDescription collapse={isOverflow ? collapse : false} ref={showNoticeRef}>

        </Styled.ShowInfoDescription>
        {isOverflow && (
          <Styled.ShowInfoMoreButton
            type="button"
            onClick={() => {
              onClickViewNotice?.();
              viewMoreClickHandler();
            }}
          >
            {collapse ? (
              <>
                내용 더 보기 <ChevronDownIcon />
              </>
            ) : (
              <>
                내용 접기 <ChevronUpIcon />
              </>
            )}
          </Styled.ShowInfoMoreButton>
        )}
      </Styled.ShowInfoGroup>
      <Styled.ShowInfoGroup>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>위치</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoSubtitle>{placeName}</Styled.ShowInfoSubtitle>
        <Styled.ShowInfoDescription>
          <Styled.ShowInfoDescriptionText>
            {`${streetAddress} / ${detailAddress} ・ `}
            <Styled.ShowInfoDescriptionButton
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`${streetAddress} ${detailAddress}`);
                if (checkIsWebView()) {
                  showToast({ message: '주소를 복사했어요.', duration: TOAST_DURATIONS.SHORT });
                } else {
                  alert('공연장 주소가 복사되었어요');
                }
              }}
            >
              복사
            </Styled.ShowInfoDescriptionButton>
          </Styled.ShowInfoDescriptionText>
        </Styled.ShowInfoDescription>
        {latitude && longitude && (
          <PreviewMap
            latitude={latitude}
            longitude={longitude}
            name={placeName}
            isAppWebview={isAppWebview}
          />
        )}
      </Styled.ShowInfoGroup>
      <Styled.ShowInfoGroup>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>주최</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowHost>
          <Styled.ShowHostName>{hostName}</Styled.ShowHostName>
          <Styled.ShowHostLink>
            <a onClick={onClickCallLink}>
              <CallIcon />
            </a>
            <a onClick={onClickMessageLink}>
              <MessageIcon />
            </a>
          </Styled.ShowHostLink>
          <Styled.ShowHostLinkMobile>
            <a onClick={onClickCallLinkMobile}>
              <CallIcon />
            </a>
            <a onClick={onClickMessageLinkMobile}>
              <MessageIcon />
            </a>
          </Styled.ShowHostLinkMobile>
        </Styled.ShowHost>
      </Styled.ShowInfoGroup>
    </Styled.ShowInfo>
  );
};

export default ShowInfoDetail;
