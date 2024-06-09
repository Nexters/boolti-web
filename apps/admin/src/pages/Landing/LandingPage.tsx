import { BooltiDark } from '@boolti/icon';

import Styled from './LandingPage.styles';

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
