import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Logo = styled(Link)`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 60px;
  height: 22.7px;
  cursor: pointer;

  ${mq_lg} {
    width: 174px;
    height: 44px;
  }
`;

const LogoutLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 18px;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const Container = styled.main`
  min-height: calc(100vh - 64px - 274px);
  padding: 20px 20px 0;

  ${mq_lg} {
    padding: 60px 20px 0;
  }
`;

export default {
  Logo,
  LogoutLink,
  Container,
};
