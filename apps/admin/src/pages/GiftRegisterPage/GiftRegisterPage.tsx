import Styled from './GiftRegisterPage.styles';
import { useSearchParams } from 'react-router-dom';
import GiftGuide from './components/GiftGuide';
import GiftInformation from './components/GiftInformation';
import GiftReceive from './components/GiftReceive';
import { useState } from 'react';

const GiftRegisterPage = () => {
  const [searchParams] = useSearchParams();
  const giftUuid = searchParams.get('uuid');
  const [isOpen, setIsOpen] = useState(false);

  console.log(giftUuid);

  const handleOpenGift = () => {
    setIsOpen(true);
  };

  const giftMockData = {
    recipient: '박영호',
    description: '에스파의 콘서트에 온걸 환영해!',
    ticketImg: 'https://newsimg.sedaily.com/2024/02/18/2D5EQYC0HG_1.jpg',
    showTitle: '링팝 : 더 퍼스트 브이알콘서트 에스파',
    posterImg:
      'https://i.namu.wiki/i/YsE_Dkn98pLq1vCL0OcgahPkIkLxckfvbqhGdw_yoWFGR9N_r33YlT6Ri9xrwa3mtG9VoHJ2pnoycBR1pM_EtX9SNVjJhHRZjE1Ftey9jphWkcUODpix24LQgC00V-oYUqOkbaRBAl0kieELysmHfA.webp',
    date: '2024년 6월 23일',
    isRejected: false,
    isCancelled: false,
    isRegistered: false,
  };

  return (
    <Styled.Container>
      <Styled.GiftWrapper>
        {isOpen ? (
          <GiftInformation {...giftMockData} />
        ) : (
          <GiftReceive sender={'보낸 분 이름'} openGift={handleOpenGift} />
        )}
      </Styled.GiftWrapper>
      {isOpen && <GiftGuide isCancelled={false} isRegistered={false} />}
    </Styled.Container>
  );
};

export default GiftRegisterPage;
