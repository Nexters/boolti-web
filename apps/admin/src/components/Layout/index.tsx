import Styled from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  headerContainerStyle?: React.CSSProperties;
}

const Layout = ({ children, header, headerContainerStyle }: LayoutProps) => {
  return (
    <Styled.Layout>
      {header && (
        <Styled.HeaderContainer style={headerContainerStyle}>
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
