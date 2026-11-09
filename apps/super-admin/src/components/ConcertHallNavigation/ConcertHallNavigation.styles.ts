import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

const Container = styled.aside`
  width: 220px;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 0px 18px 0px #888d9d59;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
`;

const Header = styled.header`
  padding: 24px 20px 20px;
`;

const HallName = styled.h1`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Navigation = styled.div`
  padding: 0 20px;
`;

const MenuItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.li``;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g50};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.o1};
  }

  &.active {
    ${({ theme }) => theme.typo.sh1};
    color: ${({ theme }) => theme.palette.primary.o1};
    /* primary.o1 10% — Figma node 9160:9658 */
    background-color: rgba(255, 90, 20, 0.1);
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
  HallName,
  Navigation,
  MenuItemList,
  MenuItem,
  MenuLink,
  Footer,
  HomeButton,
};
