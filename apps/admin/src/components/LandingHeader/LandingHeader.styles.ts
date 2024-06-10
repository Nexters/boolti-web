import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Header = styled.header`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => `${theme.palette.grey.g50}${theme.palette.opacity[30]}`};
  background: ${({ theme }) => `${theme.palette.grey.g60}${theme.palette.opacity[40]}`};
  backdrop-filter: blur(40px);
  padding: 4px 20px;
  ${mq} {
    height: 68px;
    padding: 12px 20px;
  }
`;

const HeaderContaienr = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export default {
  Header,
  HeaderContaienr,
  BooltiIcon,
};
