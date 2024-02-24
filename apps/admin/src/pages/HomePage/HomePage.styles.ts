import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Logo = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 174px;
  height: 44px;
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
  min-height: calc(100vh - 68px - 274px);
  padding: 60px 20px 0;
`;

export default {
  Logo,
  LogoutLink,
  Container,
};
