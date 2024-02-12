import { useLogout, useUserAccountInfo, useUserSummary } from '@boolti/api';
import { BooltiLogo } from '@boolti/icon';
import { Footer, TextButton } from '@boolti/ui';
import { useNavigate } from 'react-router-dom';

import AccountInfo from '~/components/AccountInfo';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import ShowList from '~/components/ShowList';
import UserProfile from '~/components/UserProfile';
import { PATH } from '~/constants/routes';

import Styled from './HomePage.styles';

const HomePage = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const { data: userAccountInfoData, isLoading: isUserAccountInfoLoading } = useUserAccountInfo();
  const { data: userSummaryData, isLoading: isUserSummaryLoading } = useUserSummary();
  const { imagePath, email, nickname = '' } = userSummaryData ?? {};
  const { bankAccount } = userAccountInfoData ?? {};
  const { bankName, bankAccountNumber, bankAccountHolder } = bankAccount ?? {};
  const isLoading = isUserAccountInfoLoading || isUserSummaryLoading;

  return (
    <Layout
      header={
        <Header
          left={
            <Styled.Logo>
              <BooltiLogo />
            </Styled.Logo>
          }
          right={
            <TextButton
              onClick={async () => {
                await logout.mutateAsync();

                navigate(PATH.LOGIN, { replace: true });
              }}
            >
              로그아웃
            </TextButton>
          }
        />
      }
    >
      <Styled.Container>
        {!isLoading && (
          <>
            <UserProfile profileImage={imagePath} username={nickname} email={email} />
            <Styled.Seperator size={40} />
            <AccountInfo
              bankAccountHolder={bankAccountHolder}
              bankAccountNumber={bankAccountNumber}
              bankName={bankName}
            />
            <Styled.Seperator size={80} />
            <ShowList
              shows={[
                {
                  thumbnailPath: 'https://picsum.photos/200',
                  title: 'Show Title',
                  date: '2024-01-20',
                  host: '%사용자명%',
                },
                {
                  thumbnailPath: 'https://picsum.photos/200',
                  title: 'Show Title2',
                  date: '2024-01-21',
                  host: '%사용자명%',
                },
              ]}
            />
            <Styled.Seperator size={80} />
          </>
        )}
      </Styled.Container>
      <Footer />
    </Layout>
  );
};

export default HomePage;
