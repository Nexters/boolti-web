import styled from '@emotion/styled';

import NotFound from '~/components/NotFound';
import Layout from '~/components/Layout';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
`;

const NotFoundPage = () => (
  <Layout>
    <Center>
      <NotFound />
    </Center>
  </Layout>
);

export default NotFoundPage;
