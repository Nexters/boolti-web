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
  SpaceBanner,
} from './components';
import Styled from './LandingPage.styles';

const LandingPage = () => {
  const { data: popupData } = usePopup('HOME');
  usePopupDialog(popupData);

  return (
    <Styled.Container>
      <SpaceBanner variant="top" />
      <Styled.TopBar>
        <Header />
      </Styled.TopBar>

      <Hero />
      <Problem />
      <SolutionFeatures />
      <SolutionHighlight />
      <HowToUse />

      <SpaceBanner variant="bottom" />

      <Styled.FooterContainer>
        <Footer />
      </Styled.FooterContainer>
    </Styled.Container>
  );
};

export default LandingPage;
