import { useLocation } from 'react-router-dom';
import Styled from './Layout.styles';
import SideNavigation from '../SideNavigation/SideNavigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && <SideNavigation />}
      <Styled.Container path={pathname}>{children}</Styled.Container>
    </>
  );
};

export default Layout;
