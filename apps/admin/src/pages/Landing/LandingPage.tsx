import { Footer } from '@boolti/ui';
import { domAnimation, LazyMotion } from 'framer-motion';

import { Header, KeyVisual, OrganizerSection, UserSection } from './components';
import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Styled.Container>
        <Header />

        <KeyVisual />

        <OrganizerSection />

        <UserSection />

        <Styled.FooterContainer>
          <Footer />
        </Styled.FooterContainer>
      </Styled.Container>
    </LazyMotion>
  );
};

export default LandingPage;
