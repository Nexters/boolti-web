import { Footer } from '@boolti/ui';

import { Header, KeyVisual, MoreInformation, OrganizerSection, UserSection } from './components';
import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
    <>
      <Styled.Container>
        <Header />

        <KeyVisual />

        <OrganizerSection />

        <UserSection />

        <MoreInformation />

        <Styled.FooterContainer>
          <Footer />
        </Styled.FooterContainer>
      </Styled.Container>
    </>
  );
};

export default LandingPage;
