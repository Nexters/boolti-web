import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import entranceNotificationImg from '~/assets/images/entrance-notification.png';
import mobileTicketPreivewImg from '~/assets/images/mobile-ticket-preview.png';
import showInfoImg from '~/assets/images/show-info.png';
import ticketPreviewImg from '~/assets/images/pc-ticket-preview.png';
import ticketPurchaseImg from '~/assets/images/ticket-purchase.png';
import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';

import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import FeatureItem from '../FeatureItem';
import Styled from './UserSection.styles';

const UserSection = () => {
  const { ref: sectionRef } = useVisibleSectionAtom('user');
  const navigate = useNavigate();
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);
  return (
    <Styled.Section ref={sectionRef} id="user">
      <Styled.Container>
        <Styled.Title>빠른 입장을 원하는{'\n'}예매자를 위한 앱</Styled.Title>
        <Styled.Description>
          번거로운 티켓 찾기는 이제 그만!{'\n'}앱에서 바로 티켓을 제시해 보세요
        </Styled.Description>
        <Styled.Button
          colorTheme="primary"
          size={isMobile ? 'regular' : 'bold'}
          onClick={() => {
            if (isMobile) {
              return window.open(LINK.DYNAMIC_LINK, '_blank');
            }
            navigate(PATH.QR);
          }}
        >
          앱 바로가기
        </Styled.Button>
        <Styled.TicketPreviewImage src={ticketPreviewImg} />
        <Styled.MobileTicketPreviewImage src={mobileTicketPreivewImg} />
      </Styled.Container>
      <FeatureItem
        category="공연 정보"
        title={'한눈에 보는\n공연 정보'}
        description={'공연일, 공연장 위치, 안내 사항 등\n방문할 공연의 정보를 한눈에 확인해요'}
        position="left"
        imageSrc={showInfoImg}
        maxWidth={[360, 536]}
        imagePadding={[0, 12]}
      />
      <FeatureItem
        category="티켓 결제"
        title={'다양한 결제 수단'}
        description={'카드, 계좌이체, 간편결제 등\n원하는 결제 수단으로 티켓을 구매해요'}
        position="right"
        imageSrc={ticketPurchaseImg}
        maxWidth={[360, 536]}
        imagePadding={[0, 18]}
      />
      <FeatureItem
        category="입장 알림"
        title={'빠른 입장을 돕는\n공연 입장 알림'}
        description={'공연 30분 전 입장 알림 발송으로\n티켓을 미리 준비하고 빠르게 입장해요'}
        position="left"
        imageSrc={entranceNotificationImg}
        maxWidth={[360, 536]}
        imagePadding={[0, 12]}
      />
    </Styled.Section>
  );
};

export default UserSection;
