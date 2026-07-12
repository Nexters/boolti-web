import styled from '@emotion/styled';

import ComingSoon from '~/components/ComingSoon';
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
      <ComingSoon />
    </Center>
  </Layout>
);

export default ErrorPage;
