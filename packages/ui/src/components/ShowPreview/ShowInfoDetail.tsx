import Linkify from 'linkify-react';
import Styled from './ShowPreview.styles';
import { CallIcon, MessageIcon } from '@boolti/icon';

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
          <Styled.ShowInfoTitle>장소</Styled.ShowInfoTitle>
          <Styled.ShowInfoTitleButton
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`${placeStreetAddress} ${placeDetailAddress}`);
              alert('공연장 주소가 복사되었어요');
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3914_12951)">
                <path
                  d="M11.666 4.66602H5.83268C5.18835 4.66602 4.66602 5.18835 4.66602 5.83268V11.666C4.66602 12.3103 5.18835 12.8327 5.83268 12.8327H11.666C12.3103 12.8327 12.8327 12.3103 12.8327 11.666V5.83268C12.8327 5.18835 12.3103 4.66602 11.666 4.66602Z"
                  stroke="#6F7485"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.33268 9.33268C1.69102 9.33268 1.16602 8.80768 1.16602 8.16602V2.33268C1.16602 1.69102 1.69102 1.16602 2.33268 1.16602H8.16602C8.80768 1.16602 9.33268 1.69102 9.33268 2.33268"
                  stroke="#6F7485"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3914_12951">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            주소복사
          </Styled.ShowInfoTitleButton>
        </Styled.ShowInfoTitleContainer>
        <Styled.ShowInfoSubtitle>{placeName}</Styled.ShowInfoSubtitle>
        <Styled.ShowInfoDescription>
          {placeStreetAddress} / {placeDetailAddress}
        </Styled.ShowInfoDescription>
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
        <Styled.ShowInfoDescription as="p" isFullContent={hasNoticePage}>
          {notice.split('\n').map((text, index) => (
            <Linkify key={`${text}_${index}`} options={{ target: '_blank' }}>
              {text}
              <br />
            </Linkify>
          ))}
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
