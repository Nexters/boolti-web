import { BooltiDark, CloseIcon, MenuIcon } from '@boolti/icon';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

import { useDeviceWidth } from '~/hooks/useDeviceWidth';

import Styled from './LandingHeader.styles';

const LandingHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isDesktop = useDeviceWidth() > parseInt(theme.breakpoint.mobile, 10);

  useEffect(() => {
    if (isDesktop) {
      setIsExpanded(false);
    }
  }, [isDesktop]);

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
