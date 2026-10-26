import { trackClick } from '@boolti/analytics';
import { ShowPreviewResponse } from '@boolti/api';
import { checkIsAndroid, navigateToPlaceDetail } from '@boolti/bridge';
import { ShowInfoDetail } from '@boolti/ui';
import { format } from 'date-fns';
import { useLoaderData } from 'react-router-dom';
import Styled from './ShowInfoDetailPage.styles';
import { X_NCP_APIGW_API_KEY_ID } from '../../constants/ncp';

const ShowInfoDetailPage: React.FC = () => {
  const [show, { count: soldTicketCount }] = useLoaderData() as [
    ShowPreviewResponse,
    { count: number },
  ];

  const {
    date,
    notice,
    salesEndTime,
    salesStartTime,
    hostName,
    placeName,
    streetAddress,
    detailAddress,
    latitude,
    longitude,
    concertHallId,
  } = show;

  const callLinkClickHandler = () => {
    location.href = `tel:${show.hostPhoneNumber}`;
  };

  const messageLinkClickHandler = () => {
    location.href = `sms:${show.hostPhoneNumber}`;
  };

  // 공연장 프로필 화면은 앱이 담당하므로 브릿지로 넘긴다.
  // iOS 는 브릿지를 받을 때 클릭을 기록하고 Android 는 기록하지 않아서 Android 일 때만 웹이 보낸다.
  const placeProfileClickHandler = (hallId: number) => {
    if (checkIsAndroid()) {
      trackClick('ShowDetail', 'Item', 'PlaceProfile', {
        show_id: show.id,
        place_id: hallId,
        entry_point: 'Location',
      });
    }

    navigateToPlaceDetail({ placeId: hallId }).catch(() => {
      // 앱이 응답하지 않아도 웹에서 할 수 있는 처리는 없다
    });
  };

  return (
    <Styled.Container>
      <ShowInfoDetail
        show={{
          date,
          salesStartTime: salesStartTime && format(new Date(salesStartTime), 'yyyy.MM.dd (E)'),
          salesEndTime: salesEndTime && format(new Date(salesEndTime), 'yyyy.MM.dd (E)'),
          placeName,
          streetAddress,
          detailAddress,
          notice,
          hostName,
          latitude,
          longitude,
          concertHallId,
        }}
        soldTicketCount={soldTicketCount}
        isAppWebview
        onClickCallLink={callLinkClickHandler}
        onClickMessageLink={messageLinkClickHandler}
        onClickCallLinkMobile={callLinkClickHandler}
        onClickMessageLinkMobile={messageLinkClickHandler}
        onClickPlaceProfile={placeProfileClickHandler}
        onClickMap={() => trackClick('ShowDetail', 'Item', 'Map', { map_provider: 'NaverMap' })}
        naverMapClientId={X_NCP_APIGW_API_KEY_ID}
      />
    </Styled.Container>
  );
};

export default ShowInfoDetailPage;
