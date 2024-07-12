import { useParams } from 'react-router-dom';
import Styled from './GiftRegisterPage.styles';
import GiftGuide from './components/GiftGuide';
import GiftInformation from './components/GiftInformation';

const GiftRegisterPage = () => {
  const { giftId = '' } = useParams<{ giftId: string }>();

  return (
    <Styled.Container>
      <Styled.GiftWrapper>
        <GiftInformation />
      </Styled.GiftWrapper>
      <GiftGuide isCancelled={false} isRegistered={false} giftUuid={giftId} />
    </Styled.Container>
  );
};

export default GiftRegisterPage;
