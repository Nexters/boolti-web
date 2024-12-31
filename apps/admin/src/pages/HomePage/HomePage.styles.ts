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

const ProfileDropdown = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
  }
`;

const ProfileDropdownMobile = styled.div`
  ${mq_lg} {
    display: none;
  }
`;

const Container = styled.main`
  min-height: calc(100vh - 64px - 274px);
  padding: 20px 20px 0;

  ${mq_lg} {
    padding: 60px 20px 0;
  }
`;

const BannerContainer = styled.div`
  border-bottom: 1px solid #c5e1ff;
`;

const Banner = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  margin: 0 auto;
  padding: 16px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const BannerShowTitle = styled.strong`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const BannerDescription = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const BannerLink = styled(Link)`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.status.link};
  display: inline-flex;
  align-items: center;
`;

const HeaderMenu = styled.div`
  position: absolute;
  top: 68px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  box-shadow: 0 4px 4px 0 ${({ theme }) => theme.palette.shadow};
  padding-bottom: 8px;
  z-index: 1;

  ${mq_lg} {
    display: none;
  }
`;

const HeaderMenuItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 20px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  cursor: pointer;
`;

export default {
  Logo,
  LogoutLink,
  ProfileDropdown,
  ProfileDropdownMobile,
  Container,
  BannerContainer,
  Banner,
  BannerShowTitle,
  BannerDescription,
  BannerLink,
  HeaderMenu,
  HeaderMenuItemButton,
};
