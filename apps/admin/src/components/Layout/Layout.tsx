import Styled from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

const Layout = ({ children, header }: LayoutProps) => {
  return (
    <Styled.Layout>
      {header && (
        <Styled.HeaderContainer>
          <Styled.Header>{header}</Styled.Header>
        </Styled.HeaderContainer>
      )}
      <Styled.ContentContainer>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ContentContainer>
    </Styled.Layout>
  );
};

export default Layout;
