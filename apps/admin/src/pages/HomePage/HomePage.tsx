import Header from '~/components/Header/Header';
import Layout from '~/components/Layout/Layout';
import { PATH } from '~/constants/routes';
import Styled from './HomePage.styles';
import { Footer } from '@boolti/ui';

const HomePage = () => {
  return (
    <Layout
      header={
        <Header
          left={<Styled.Logo>Boolti Logo</Styled.Logo>}
          right={<Styled.LogoutLink to={PATH.LOGIN}>로그아웃</Styled.LogoutLink>}
        />
      }
    >
      <Styled.Container></Styled.Container>
      <Footer />
    </Layout>
  );
};

export default HomePage;
