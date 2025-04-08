import Styled from './ShowPreview.styles';
import { CallIcon, MessageIcon, TicketIcon } from '@boolti/icon';

import ShowInfoDescription from '../ShowContentMarkdown';
import PreviewMap from '../PreviewMap';

interface Props {
  show: {
    date: string;
    salesStartTime: string;
    salesEndTime: string;
    notice: string;
    hostName: string;
    placeName: string;
    streetAddress: string;
    detailAddress: string;
    latitude?: number;
    longitude?: number;
  };
  soldTicketCount?: number;
  hasNoticePage?: boolean;
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
  hasNoticePage,
  onClickCallLink,
  onClickMessageLink,
  onClickCallLinkMobile,
  onClickMessageLinkMobile,
  onClickViewNotice,
}: Props) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const isEnded = nextDay < new Date();

  return (
    <Styled.ShowInfo>
      <Styled.ShowInfoGroup>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>티켓 판매</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoDescription>
          {salesStartTime} - {salesEndTime}
        </Styled.ShowInfoDescription>
      </Styled.ShowInfoGroup>
      <Styled.ShowInfoGroup>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>위치</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoSubtitle>{placeName}</Styled.ShowInfoSubtitle>
        <Styled.ShowInfoDescription>
          {`${streetAddress} / ${detailAddress} ・ `}
          <Styled.ShowInfoTitleButton
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`${streetAddress} ${detailAddress}`);
              alert('공연장 주소가 복사되었어요');
            }}
          >
            복사
          </Styled.ShowInfoTitleButton>
        </Styled.ShowInfoDescription>
        {latitude && longitude && <PreviewMap latitude={latitude} longitude={longitude} />}
        {isEnded && soldTicketCount !== undefined && (
          <Styled.ShowTicketInfoDescription>
            <Styled.TicketIcon>
              <TicketIcon />
            </Styled.TicketIcon>{' '}
            {soldTicketCount}매 판매 완료
          </Styled.ShowTicketInfoDescription>
        )}
      </Styled.ShowInfoGroup>
      <Styled.ShowInfoGroup>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>내용</Styled.ShowInfoTitle>
          {hasNoticePage && (
            <Styled.ShowInfoTitleTextButton type="button" onClick={onClickViewNotice}>
              전체보기
            </Styled.ShowInfoTitleTextButton>
          )}
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoDescription isFullContent={hasNoticePage}>
          <ShowInfoDescription content={notice} />
        </Styled.ShowInfoDescription>
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
