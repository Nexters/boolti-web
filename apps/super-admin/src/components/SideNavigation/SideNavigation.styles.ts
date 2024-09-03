import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';
import { PATH } from '~/constants/routes';

interface SideNavigationContainerProps {
  path: string;
}
const Container = styled.aside<SideNavigationContainerProps>`
  width: 220px;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 0px 18px 0px #888d9d59;
  display: ${({ path }) => (path === PATH.INDEX ? 'none' : 'flex')};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
`;

const Header = styled.header`
  padding: 16px 17px 16px 20px;
`;

const ShowId = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g90};
  padding-bottom: 7px;
`;

const ShowTitle = styled.h1`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Navigation = styled.div`
  margin-top: 12px;
`;

const MenuWrapper = styled.section`
  & + & {
    margin-top: 24px;
  }
`;

const MenuTitle = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  padding: 4px 20px;
`;

const MenuItemList = styled.ul`
  list-style: none;
`;

const MenuItem = styled.li``;

const MenuLink = styled(NavLink)`
  display: block;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  padding: 4px 20px;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.o1};
  }

  &.active {
    ${({ theme }) => theme.typo.sh0};
    color: ${({ theme }) => theme.palette.primary.o1};
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 0 20px 24px 20px;
`;

const HomeButton = styled(Link)`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  display: flex;
  align-items: center;
`;

export default {
  Container,
  Header,
  ShowId,
  ShowTitle,
  Navigation,
  MenuWrapper,
  MenuTitle,
  MenuItemList,
  MenuItem,
  MenuLink,
  Footer,
  HomeButton,
};
