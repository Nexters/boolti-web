import { mq } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

const Header = styled.header`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => `${theme.palette.grey.g50}${theme.palette.opacity[30]}`};
  background: ${({ theme }) => `${theme.palette.grey.g60}${theme.palette.opacity[40]}`};
  backdrop-filter: blur(40px);
  padding: 0 20px;
  ${mq} {
    padding: 0 20px;
  }
`;

const HeaderContaienr = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  height: 48px;
  ${mq} {
    height: 68px;
  }
`;

const BooltiIcon = styled.div`
  width: 55.5px;
  height: 21px;
  ${mq} {
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

  ${mq} {
    display: none;
  }
`;

const MobileMenu = styled(m.div)`
  margin-top: auto;
  width: 100%;

  ${mq} {
    display: none;
  }
`;

export default {
  Header,
  HeaderContaienr,
  BooltiIcon,
  MobileButton,
  MobileMenu,
};
