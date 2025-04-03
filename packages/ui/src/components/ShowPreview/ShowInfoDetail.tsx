import Styled from './ShowPreview.styles';
import { CallIcon, MessageIcon, TicketIcon } from '@boolti/icon';

import ShowInfoDescription from '../ShowContentMarkdown';

interface Props {
  show: {
    salesStartTime: string;
    salesEndTime: string;
    notice: string;
    hostName: string;
  };
  hasNoticePage?: boolean;
  onClickCallLink?: () => void;
  onClickMessageLink?: () => void;
  onClickCallLinkMobile?: () => void;
  onClickMessageLinkMobile?: () => void;
  onClickViewNotice?: () => void;
}

const ShowInfoDetail = ({
  show: {
    salesStartTime,
    salesEndTime,
    notice,
    hostName,
  },
  hasNoticePage,
  onClickCallLink,
  onClickMessageLink,
  onClickCallLinkMobile,
  onClickMessageLinkMobile,
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
        <Styled.ShowTicketInfoDescription>
          <Styled.TicketIcon>
            <TicketIcon />
          </Styled.TicketIcon> 50매 판매 완료
        </Styled.ShowTicketInfoDescription>
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
