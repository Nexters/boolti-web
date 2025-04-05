import { ShowPreviewResponse } from "@boolti/api";
import { ShowInfoDetail } from "@boolti/ui";
import { format } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Styled from './ShowInfoDetailPage.styles';

const ShowInfoDetailPage: React.FC = () => {
  const [show, { count: soldTicketCount }] = useLoaderData() as ShowPreviewResponse;

  const {
    notice,
    salesEndTime,
    salesStartTime,
    hostName,
    isEnded
  } = show;

  const callLinkClickHandler = () => {
    location.href = `tel:${show.hostPhoneNumber}`;
  }

  const messageLinkClickHandler = () => {
    location.href = `sms:${show.hostPhoneNumber}`;
  }

  return (
    <Styled.Container>
      <ShowInfoDetail
        show={{
          salesStartTime: format(new Date(salesStartTime), 'yyyy.MM.dd (E)'),
          salesEndTime: format(new Date(salesEndTime), 'yyyy.MM.dd (E)'),
          notice,
          hostName,
          isEnded,
        }}
        soldTicketCount={soldTicketCount}
        onClickCallLink={callLinkClickHandler}
        onClickMessageLink={messageLinkClickHandler}
        onClickCallLinkMobile={callLinkClickHandler}
        onClickMessageLinkMobile={messageLinkClickHandler}
      />
    </Styled.Container>
  );
}

export default ShowInfoDetailPage;
