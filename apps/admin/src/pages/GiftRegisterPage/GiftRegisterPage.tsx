import Styled from './GiftRegisterPage.styles';
import GiftGuide from './components/GiftGuide';
import GiftInformation from './components/GiftInformation';

const GiftRegisterPage = () => {
  return (
    <Styled.Container>
      <Styled.GiftWrapper>
        <GiftInformation />
      </Styled.GiftWrapper>
      <GiftGuide isCancelled={false} isRegistered={false} />
    </Styled.Container>
  );
};

export default GiftRegisterPage;
