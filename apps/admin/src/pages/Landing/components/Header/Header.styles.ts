import { Button as _Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = styled.header`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => `${theme.palette.grey.g50}${theme.palette.opacity[30]}`};
  background: ${({ theme }) => `${theme.palette.grey.g60}${theme.palette.opacity[40]}`};
  backdrop-filter: blur(40px);
  padding: 0 20px;
  ${mq_lg} {
    padding: 0 20px;
  }
`;

const HeaderContaienr = styled(m.div)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  height: 48px;
  ${mq_lg} {
    padding: 0 20px;
    height: 68px;
  }
`;

const BooltiIcon = styled.button`
  width: 55.5px;
  height: 21px;
  cursor: pointer;
  z-index: 1;

  ${mq_lg} {
    width: 74px;
    height: 28px;
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const MobileButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  & > svg {
    color: white;
    width: 24px;
    height: 24px;
  }

  ${mq_lg} {
    display: none;
  }
`;

const MobileMenu = styled(m.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: auto;
  width: 100%;

  ${mq_lg} {
    display: none;
  }
`;

const DesktopMenu = styled.div`
  display: none;
  ${mq_lg} {
    flex: 1;
    padding-left: 48px;
    display: flex;
  }
`;

const InternalLink = styled(Link)`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.w};
  cursor: pointer;

  padding: 12px 0;
  ${mq_lg} {
    ${({ theme }) => theme.typo.sh1};
    padding: 0 18px;
  }
`;

const DropDownContainer = styled.div`
  margin-left: auto;

  .icon-wrapper > svg {
    color: ${({ theme }) => theme.palette.grey.w};
  }
`;

const AuthButton = styled.button`
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;

  padding: 0 18px;
  color: ${({ theme }) => theme.palette.grey.w};
  &:last-child {
    margin-left: auto;
  }
`;

const MobileAuthButton = styled(_Button)`
  display: flex;
  cursor: pointer;
  width: 100%;
  margin: 12px 0 20px;
`;

export default {
  Header,
  DesktopMenu,
  HeaderContaienr,
  BooltiIcon,
  MobileButton,
  MobileMenu,
  InternalLink,
  MobileAuthButton,
  DropDownContainer,
  AuthButton,
};
