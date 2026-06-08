import { Footer } from '@boolti/ui';
import { usePopup } from '@boolti/api';

import usePopupDialog from '~/hooks/usePopupDialog';

import {
  Header,
  Hero,
  HowToUse,
  Problem,
  SolutionFeatures,
  SolutionHighlight,
} from './components';
import Styled from './LandingPage.styles';

const LandingPage = () => {
  const { data: popupData } = usePopup('HOME');
  usePopupDialog(popupData);

  return (
    <Styled.Container>
      <Header />

      <Hero />
      <Problem />
      <SolutionFeatures />
      <SolutionHighlight />
      <HowToUse />

      <Styled.FooterContainer>
        <Footer />
      </Styled.FooterContainer>
    </Styled.Container>
  );
};

export default LandingPage;
