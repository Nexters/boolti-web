import { BooltiDark } from '@boolti/icon';

import Styled from './LandingHeader.styles';

const LandingHeader = () => {
  return (
    <Styled.Header>
      <Styled.HeaderContaienr>
        <Styled.BooltiIcon>
          <BooltiDark />
        </Styled.BooltiIcon>
      </Styled.HeaderContaienr>
    </Styled.Header>
  );
};

export default LandingHeader;
