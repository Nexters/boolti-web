import { useLocation } from 'react-router-dom';
import Styled from './Layout.styles';
import SideNavigation from '../SideNavigation/SideNavigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isShowRoute = pathname.startsWith('/show/');

  return (
    <>
      {isShowRoute && <SideNavigation />}
      <Styled.Container hasNavigation={isShowRoute}>{children}</Styled.Container>
    </>
  );
};

export default Layout;
