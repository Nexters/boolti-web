import Styled from './GiftRegisterPage.styles';
import GiftGuide from './components/GiftGuide';
import GiftInformation from './components/GiftInformation';
import GiftTerms from './components/GiftTerms';

const GiftRegisterPage = () => {
  return (
    <>
      <Styled.Container>
        <Styled.GiftWrapper>
          <GiftInformation />
        </Styled.GiftWrapper>
        <GiftGuide />
        <GiftTerms />
      </Styled.Container>
    </>
  );
};

export default GiftRegisterPage;
