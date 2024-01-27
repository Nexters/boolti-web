import { useToast } from '@boolti/ui';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import { PATH } from '../../constants/routes';
import Styled from './HomePage.styles';

const HomePage = () => {
  const toast = useToast();

  return (
    <Layout
      header={
        <Header
          left={<Styled.Logo>Boolti Logo</Styled.Logo>}
          right={<Styled.LogoutLink to={PATH.LOGIN}>로그아웃</Styled.LogoutLink>}
        />
      }
    >
      <h2>HomePage</h2>
      <div>
        <button
          onClick={() => {
            toast.success('성공했을 때 메세지입니다.');
          }}
        >
          성공 토스트 띄우기
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast.warning('경고 메세지입니다.');
          }}
        >
          경고 토스트 띄우기
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast.error('에러 메세지입니다.');
          }}
        >
          에러 토스트 띄우기
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast.info('정보제공 메세지입니다.');
          }}
        >
          정보 제공 토스트 띄우기
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;
