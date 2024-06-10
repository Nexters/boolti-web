import { BooltiDark } from '@boolti/icon';
import { domAnimation, LazyMotion } from 'framer-motion';

import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Styled.Container>
        <Styled.Header>
          <Styled.HeaderContaienr>
            <Styled.BooltiIcon>
              <BooltiDark />
            </Styled.BooltiIcon>
          </Styled.HeaderContaienr>
        </Styled.Header>
        <Styled.KeyVisual />
      </Styled.Container>
    </LazyMotion>
  );
};

export default LandingPage;
