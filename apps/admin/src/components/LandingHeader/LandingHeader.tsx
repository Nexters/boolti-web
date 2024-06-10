import { BooltiDark, CloseIcon, MenuIcon } from '@boolti/icon';
import { useState } from 'react';

import Styled from './LandingHeader.styles';

const LandingHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Styled.Header>
      <Styled.HeaderContaienr>
        <Styled.BooltiIcon>
          <BooltiDark />
        </Styled.BooltiIcon>

        {/** 모바일용 */}
        <Styled.MobileButton
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
        >
          {isExpanded ? <CloseIcon /> : <MenuIcon />}
        </Styled.MobileButton>
      </Styled.HeaderContaienr>
      <Styled.MobileMenu
        initial={false}
        animate={isExpanded ? 'visible' : 'invisible'}
        variants={{
          invisible: {
            height: 'auto',
          },
          visible: {
            height: 172,
          },
        }}
      ></Styled.MobileMenu>
    </Styled.Header>
  );
};

export default LandingHeader;
