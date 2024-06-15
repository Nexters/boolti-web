import { domAnimation, LazyMotion } from 'framer-motion';

import { Header, KeyVisual, OrganizerSection } from './components';
import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Styled.Container>
        <Header />

        <KeyVisual />

        <OrganizerSection />
      </Styled.Container>
    </LazyMotion>
  );
};

export default LandingPage;
