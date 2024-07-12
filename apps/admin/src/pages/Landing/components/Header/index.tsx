import { useLogout, useUserSummary } from '@boolti/api';
import { BooltiDark, CloseIcon, MenuIcon } from '@boolti/icon';
import { useTheme } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileDropdown from '~/components/ProfileDropdown';
import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useScrollDirection } from '~/hooks/useScrollDirection';

import { visibleSectionAtom } from '../../atoms/visibleSectionAtom';
import { Tab } from '..';
import Styled from './Header.styles';
import { useAuthAtom } from '~/atoms/useAuthAtom';

const Header = () => {
  const { isLogin, removeToken } = useAuthAtom();
  const currentVisibleSection = useAtomValue(visibleSectionAtom);
  const scrollDirection = useScrollDirection();
  const visible = currentVisibleSection === 'key-visal' || scrollDirection === 'up';

  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const logout = useLogout({}, removeToken);
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const { data } = useUserSummary({ enabled: isLogin });
  const { imagePath } = data ?? {};

  const onClickAuthButton = async () => {
    if (isLogin) {
      await logout.mutateAsync();
      return;
    }

    navigate(PATH.LOGIN);
  };

  return (
    <Styled.Header>
      <Styled.HeaderContaienr
        initial={false}
        animate={visible ? 'visible' : 'hidden'}
        transition={{ duration: 0.4 }}
        variants={{
          hidden: {
            maxHeight: 0,
            opacity: 0,
          },
          visible: {
            maxHeight: 100,
            opacity: 1,
          },
        }}
      >
        <Styled.BooltiIcon onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
          <BooltiDark />
        </Styled.BooltiIcon>

        <Styled.DesktopMenu>
          <Styled.InternalLink
            to="#"
            onClick={() => {
              if (isMobile) {
                return window.open(LINK.DYNAMIC_LINK, '_blank');
              }
              navigate(PATH.QR);
            }}
          >
            앱 바로가기
          </Styled.InternalLink>
          <Styled.InternalLink to={PATH.HOME}>공연 준비하기</Styled.InternalLink>
          {isLogin ? (
            <Styled.DropDownContainer>
              <ProfileDropdown image={imagePath} />
            </Styled.DropDownContainer>
          ) : (
            <Styled.AuthButton onClick={onClickAuthButton}>로그인</Styled.AuthButton>
          )}
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
        animate={isExpanded && visible ? 'visible' : 'invisible'}
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
        <Styled.InternalLink
          to="#"
          onClick={() => {
            if (isMobile) {
              return window.open(LINK.DYNAMIC_LINK, '_blank');
            }
            navigate(PATH.QR);
          }}
        >
          앱 바로가기
        </Styled.InternalLink>
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

      {!isMobile && <Tab />}
    </Styled.Header>
  );
};

export default Header;
