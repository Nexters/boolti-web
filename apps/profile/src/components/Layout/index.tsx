import type { PropsWithChildren } from 'react';

import { Container, ContentWrapper } from './Layout.styles';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default Layout;
