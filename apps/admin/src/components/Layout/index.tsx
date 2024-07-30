import Styled from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  headerMenu?: React.ReactNode;
  banner?: React.ReactNode;
  layoutStyle?: React.CSSProperties;
  headerContainerStyle?: React.CSSProperties;
}

const Layout = ({
  children,
  header,
  headerMenu,
  banner,
  layoutStyle,
  headerContainerStyle,
}: LayoutProps) => {
  return (
    <Styled.Layout style={layoutStyle}>
      {header && (
        <Styled.HeaderContainer style={headerContainerStyle}>
          <Styled.Header>{header}</Styled.Header>
          {headerMenu}
        </Styled.HeaderContainer>
      )}
      {banner && (
        <Styled.BannerContainer>
          <Styled.Banner>{banner}</Styled.Banner>
        </Styled.BannerContainer>
      )}
      <Styled.ContentContainer>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ContentContainer>
    </Styled.Layout>
  );
};

export default Layout;
