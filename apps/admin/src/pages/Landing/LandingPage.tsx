import { domAnimation, LazyMotion } from 'framer-motion';

import LandingHeader from '~/components/LandingHeader/LandingHeader';

import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Styled.Container>
        <LandingHeader />
        <Styled.KeyVisual />
      </Styled.Container>
    </LazyMotion>
  );
};

export default LandingPage;
