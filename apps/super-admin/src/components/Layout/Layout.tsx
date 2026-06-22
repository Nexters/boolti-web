import { useLocation } from 'react-router-dom';
import Styled from './Layout.styles';
import SideNavigation from '../SideNavigation/SideNavigation';
import ConcertHallNavigation from '../ConcertHallNavigation/ConcertHallNavigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isShowRoute = pathname.startsWith('/show/');
  const isConcertHallRoute = pathname.startsWith('/concert-hall/');

  return (
    <>
      {isShowRoute && <SideNavigation />}
      {isConcertHallRoute && <ConcertHallNavigation />}
      <Styled.Container hasNavigation={isShowRoute || isConcertHallRoute}>
        {children}
      </Styled.Container>
    </>
  );
};

export default Layout;
