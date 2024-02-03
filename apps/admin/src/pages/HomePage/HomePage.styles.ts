import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Logo = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey.g40};
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
  padding-top: 60px;
`;

export default {
  Logo,
  LogoutLink,
  Container,
};
