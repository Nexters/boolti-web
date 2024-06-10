import { LOCAL_STORAGE } from '@boolti/api';
import { BooltiDark, CloseIcon, MenuIcon } from '@boolti/icon';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';

import Styled from './LandingHeader.styles';

const LandingHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const isDesktop = useDeviceWidth() > parseInt(theme.breakpoint.mobile, 10);
  const isLogin =
    window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
    window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

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
            opacity: 0,
            height: 0,
          },
          visible: {
            opacity: 1,
            height: 172,
          },
        }}
      >
        <Styled.InternalLink to={PATH.QR}>앱 바로가기</Styled.InternalLink>
        <Styled.InternalLink to={PATH.HOME}>공연 준비하기</Styled.InternalLink>
        <Styled.Button
          colorTheme={isLogin ? 'netural' : 'primary'}
          size="bold"
          role="button"
          onClick={() => {
            navigate(PATH.LOGIN);
          }}
        >
          {isLogin ? '로그아웃' : '로그인'}
        </Styled.Button>
      </Styled.MobileMenu>
    </Styled.Header>
  );
};

export default LandingHeader;
