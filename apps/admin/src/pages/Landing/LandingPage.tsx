import { domAnimation, LazyMotion } from 'framer-motion';

import KeyVisual from '~/components/KeyVisual/KeyVisual';
import LandingHeader from '~/components/LandingHeader/LandingHeader';

import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Styled.Container>
        <LandingHeader />

        <KeyVisual />
      </Styled.Container>
    </LazyMotion>
  );
};

export default LandingPage;
