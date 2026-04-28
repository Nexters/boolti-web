import { useState } from 'react';
import { BooltiDark } from '@boolti/icon';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { openStoreLink } from '~/utils/link';

import { LANDING_BREAKPOINT } from '../../constants';
import Styled from './Header.styles';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const deviceWidth = useDeviceWidth();
  const isMobile = deviceWidth < LANDING_BREAKPOINT.tablet;
  const navigate = useNavigate();

  const handleAppExplore = () => {
    if (isMobile) {
      openStoreLink();
      return;
    }
    navigate(PATH.QR);
  };

  return (
    <>
      <Styled.Header hideBorder={mobileMenuOpen}>
        <Styled.HeaderContaienr>
          <Styled.BooltiIcon onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
            <BooltiDark />
          </Styled.BooltiIcon>

          {/* Desktop / Tablet nav */}
          <Styled.Nav>
            <Styled.TextButton type="button" onClick={handleAppExplore}>
              앱 둘러보기
            </Styled.TextButton>
            <Styled.PrimaryButton to={PATH.HOME}>시작하기</Styled.PrimaryButton>
          </Styled.Nav>

          {/* Mobile hamburger */}
          <Styled.MobileMenuButton
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="메뉴"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </Styled.MobileMenuButton>
        </Styled.HeaderContaienr>
      </Styled.Header>

      {/* Mobile dropdown */}
      <Styled.MobileMenuOverlay isOpen={mobileMenuOpen}>
        <Styled.MobileMenuItem
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            handleAppExplore();
          }}
        >
          앱 둘러보기
        </Styled.MobileMenuItem>
        <Styled.MobileMenuPrimaryWrap>
          <Styled.MobileMenuPrimary
            to={PATH.HOME}
            onClick={() => setMobileMenuOpen(false)}
          >
            시작하기
          </Styled.MobileMenuPrimary>
        </Styled.MobileMenuPrimaryWrap>
      </Styled.MobileMenuOverlay>
    </>
  );
};

export default Header;
