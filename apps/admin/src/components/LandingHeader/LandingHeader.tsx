import { LOCAL_STORAGE, useLogout } from '@boolti/api';
import { BooltiDark, CloseIcon, MenuIcon } from '@boolti/icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

import Styled from './LandingHeader.styles';

const LandingHeader = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLogin, setIsLogin] = useState(
    Boolean(
      window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
        window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN),
    ),
  );

  const onClickAuthButton = async () => {
    if (isLogin) {
      await logout.mutateAsync();
      setIsLogin(false);
      return;
    }

    navigate(PATH.LOGIN);
  };

  return (
    <Styled.Header>
      <Styled.HeaderContaienr>
        <Styled.BooltiIcon>
          <BooltiDark />
        </Styled.BooltiIcon>

        <Styled.DesktopMenu>
          <Styled.InternalLink to={PATH.QR}>앱 바로가기</Styled.InternalLink>
          <Styled.InternalLink to={PATH.HOME}>공연 준비하기</Styled.InternalLink>
          <Styled.AuthButton onClick={onClickAuthButton}>
            {isLogin ? '로그아웃' : '로그인'}
          </Styled.AuthButton>
        </Styled.DesktopMenu>

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
        <Styled.MobileAuthButton
          colorTheme={isLogin ? 'netural' : 'primary'}
          size="bold"
          role="button"
          onClick={onClickAuthButton}
        >
          {isLogin ? '로그아웃' : '로그인'}
        </Styled.MobileAuthButton>
      </Styled.MobileMenu>
    </Styled.Header>
  );
};

export default LandingHeader;
