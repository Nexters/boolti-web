import Styled from './Layout.styles';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default Layout;
