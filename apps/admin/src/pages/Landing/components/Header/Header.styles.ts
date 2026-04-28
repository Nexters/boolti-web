import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { LANDING_COLORS, mq_desktop, mq_lg } from '../../constants';

const Header = styled.header<{ hideBorder?: boolean }>`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid
    ${({ hideBorder }) => (hideBorder ? 'transparent' : LANDING_COLORS.headerBorder)};
  background: ${LANDING_COLORS.headerGlass};
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);
  padding: 0 24px;

  ${mq_lg} {
    padding: 0 48px;
    border-bottom: 1px solid ${LANDING_COLORS.headerBorder};
  }

  ${mq_desktop} {
    padding: 0 80px;
  }
`;

const HeaderContaienr = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;

  ${mq_lg} {
    max-width: 672px;
  }

  ${mq_desktop} {
    max-width: 1040px;
  }
`;

const BooltiIcon = styled.button`
  width: 55.5px;
  height: 21px;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${mq_lg} {
    width: 74px;
    height: 28px;
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const Nav = styled.div`
  display: none;
  align-items: center;
  gap: 24px;

  ${mq_lg} {
    display: flex;
  }
`;

const TextButton = styled.button`
  display: inline-flex;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.3;
  color: #ffffff;
  padding: 8px 12px;
  cursor: pointer;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 12px;
  background-color: ${LANDING_COLORS.primaryCta};
  color: #ffffff;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.3;
  text-decoration: none;
  cursor: pointer;
`;

const AuthTextButton = styled.button`
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: #ffffff;
  padding: 8px 12px;
  cursor: pointer;

  ${mq_lg} {
    font-size: 16px;
  }
`;

const DropDownContainer = styled.div`
  .icon-wrapper > svg {
    color: #ffffff;
  }
`;

/* Mobile hamburger menu */
const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: #ffffff;

  ${mq_lg} {
    display: none;
  }
`;

const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 72px;
  left: 0;
  width: 100%;
  flex-direction: column;
  background: ${LANDING_COLORS.headerGlass};
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);
  border-bottom: 1px solid ${LANDING_COLORS.headerBorder};
  z-index: 9;
  padding: 0 0 20px;

  ${mq_lg} {
    display: none;
  }
`;

const MobileMenuItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
  cursor: pointer;
  background: transparent;
`;

const MobileMenuPrimaryWrap = styled.div`
  padding: 12px 20px 0;
`;

const MobileMenuPrimary = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 20px;
  border-radius: 8px;
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
  background-color: ${LANDING_COLORS.primaryCta};
`;

export default {
  Header,
  HeaderContaienr,
  BooltiIcon,
  Nav,
  TextButton,
  PrimaryButton,
  AuthTextButton,
  DropDownContainer,
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenuItem,
  MobileMenuPrimaryWrap,
  MobileMenuPrimary,
};
