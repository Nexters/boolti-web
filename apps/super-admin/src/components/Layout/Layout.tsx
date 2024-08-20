import { useLocation } from 'react-router-dom';
import Styled from './Layout.styles';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  return <Styled.Container path={pathname}>{children}</Styled.Container>;
};

export default Layout;
