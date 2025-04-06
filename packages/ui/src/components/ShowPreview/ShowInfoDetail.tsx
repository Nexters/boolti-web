import Styled from './ShowPreview.styles';
import { CallIcon, MessageIcon } from '@boolti/icon';

import ShowInfoDescription from '../ShowContentMarkdown';
import PreviewMap from '../PreviewMap';

interface Props {
  show: {
    images: string[];
    name: string;
    date: string;
    startTime: string;
    runningTime: string;
    salesStartTime: string;
    salesEndTime: string;
    placeName: string;
    placeStreetAddress: string;
    placeDetailAddress: string;
    notice: string;
    hostName: string;
    hostPhoneNumber: string;
    latitude?: number;
    longitude?: number;
  };
  hasNoticePage?: boolean;
  onClickLink?: () => void;
  onClickLinkMobile?: () => void;
  onClickViewNotice?: () => void;
}

const ShowInfoDetail = ({
  show: {
    date,
    startTime,
    runningTime,
    salesStartTime,
    salesEndTime,
    placeName,
    placeStreetAddress,
    placeDetailAddress,
    notice,
    hostName,
    latitude,
    longitude,
  },
  hasNoticePage,
  onClickLink,
  onClickLinkMobile,
  onClickViewNotice,
}: Props) => {
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
          <Styled.ShowInfoTitle>일시</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoDescription>
          <span>
            {date} / {startTime}
          </span>
          <Styled.ShowInfoDescriptionBadge>{runningTime}분</Styled.ShowInfoDescriptionBadge>
        </Styled.ShowInfoDescription>
      </Styled.ShowInfoGroup>
      <Styled.ShowInfoGroup>
        <Styled.ShowInfoTitleContainer>
          <Styled.ShowInfoTitle>위치</Styled.ShowInfoTitle>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoSubtitle>{placeName}</Styled.ShowInfoSubtitle>
        <Styled.ShowInfoDescription>
          {`${placeStreetAddress} / ${placeDetailAddress} ・ `}
          <Styled.ShowInfoTitleButton
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`${placeStreetAddress} ${placeDetailAddress}`);
              alert('공연장 주소가 복사되었어요');
            }}
          >
            복사
          </Styled.ShowInfoTitleButton>
        </Styled.ShowInfoDescription>
        {latitude && longitude && <PreviewMap latitude={latitude} longitude={longitude} />}
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
            <a onClick={onClickLink}>
              <CallIcon />
            </a>
            <a onClick={onClickLink}>
              <MessageIcon />
            </a>
          </Styled.ShowHostLink>
          <Styled.ShowHostLinkMobile>
            <a onClick={onClickLinkMobile}>
              <CallIcon />
            </a>
            <a onClick={onClickLinkMobile}>
              <MessageIcon />
            </a>
          </Styled.ShowHostLinkMobile>
        </Styled.ShowHost>
      </Styled.ShowInfoGroup>
    </Styled.ShowInfo>
  );
};

export default ShowInfoDetail;
