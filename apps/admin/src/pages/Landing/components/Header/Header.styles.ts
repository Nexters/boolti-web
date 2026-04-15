import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';

import { LANDING_COLORS } from '../../constants';

const Header = styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid ${LANDING_COLORS.headerBorder};
  background: ${LANDING_COLORS.headerGlass};
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);
  padding: 0 20px;
`;

const HeaderContaienr = styled(m.div)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  height: 56px;

  ${mq_lg} {
    height: 72px;
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
  display: flex;
  align-items: center;
  gap: 12px;

  ${mq_lg} {
    gap: 24px;
  }
`;

const TextButton = styled.button`
  display: none;
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
  padding: 8px 12px;
  cursor: pointer;

  ${mq_lg} {
    display: inline-flex;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 12px;
  background-color: ${LANDING_COLORS.primaryCta};
  color: #ffffff;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  text-decoration: none;
  cursor: pointer;

  ${mq_lg} {
    padding: 10px 18px;
    font-size: 16px;
  }
`;

const AuthTextButton = styled.button`
  font-family: Pretendard, sans-serif;
  font-weight: 600;
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

export default {
  Header,
  HeaderContaienr,
  BooltiIcon,
  Nav,
  TextButton,
  PrimaryButton,
  AuthTextButton,
  DropDownContainer,
};
