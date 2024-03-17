import { useLogout, useShowList, useUserAccountInfo, useUserSummary } from '@boolti/api';
import { BooltiLogo } from '@boolti/icon';
import { Footer, TextButton, useConfirm } from '@boolti/ui';
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
  const confirm = useConfirm();

  const { data: userAccountInfoData, isLoading: isUserAccountInfoLoading } = useUserAccountInfo();
  const { data: userSummaryData, isLoading: isUserSummaryLoading } = useUserSummary();
  const { data: showList = [], isLoading: isShowListLoading } = useShowList();

  const { imagePath, email, nickname = '' } = userSummaryData ?? {};
  const { bankAccount } = userAccountInfoData ?? {};
  const { bankName, bankAccountNumber, bankAccountHolder } = bankAccount ?? {};

  const isLoading = isUserAccountInfoLoading || isUserSummaryLoading || isShowListLoading;

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
              colorTheme="netural"
              size="regular"
              onClick={async () => {
                const result = await confirm('로그아웃 할까요?', {
                  cancel: '취소하기',
                  confirm: '로그아웃',
                });
                if (result) {
                  await logout.mutateAsync();
                  navigate(PATH.LOGIN, { replace: true });
                }
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
            <AccountInfo
              bankAccountHolder={bankAccountHolder}
              bankAccountNumber={bankAccountNumber}
              bankName={bankName}
            />
            <ShowList shows={showList} />
          </>
        )}
      </Styled.Container>
      <Footer />
    </Layout>
  );
};

export default HomePage;
