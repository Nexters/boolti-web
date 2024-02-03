import Header from '~/components/Header/Header';
import Layout from '~/components/Layout/Layout';
import { PATH } from '~/constants/routes';
import Styled from './HomePage.styles';
import { Footer } from '@boolti/ui';
import UserProfile from '~/components/UserProfile';
import AccountInfo from '~/components/AccountInfo';
import ShowList from '~/components/ShowList';

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
      <Styled.Container>
        <UserProfile
          profileImage="https://picsum.photos/200"
          username="%사용자명%"
          email="Boolti@boolti.io"
        />
        <Styled.Seperator size={40} />
        <AccountInfo accountHolder="김불티" accountNumber="000000000000" orgName="토스뱅크" />
        <Styled.Seperator size={80} />
        <ShowList shows={[]} />
        <Styled.Seperator size={80} />
      </Styled.Container>
      <Footer />
    </Layout>
  );
};

export default HomePage;
