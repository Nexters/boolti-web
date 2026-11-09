import styled from '@emotion/styled';

import Error from '~/components/Error';
import Layout from '~/components/Layout';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
`;

const ErrorPage = () => (
  <Layout>
    <Center>
      <Error />
    </Center>
  </Layout>
);

export default ErrorPage;
