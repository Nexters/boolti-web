import {
  useLogout,
  useSettlementBanners,
  useShowList,
  useUserAccountInfo,
  useUserSummary,
} from '@boolti/api';
import { BooltiLogo, ChevronRightIcon } from '@boolti/icon';
import { Footer, TextButton, useConfirm } from '@boolti/ui';
import { useNavigate } from 'react-router-dom';

import AccountInfo from '~/components/AccountInfo';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import ShowList from '~/components/ShowList';
import UserProfile from '~/components/UserProfile';
import { HREF, PATH } from '~/constants/routes';

import Styled from './HomePage.styles';
import { useAuthAtom } from '~/atoms/useAuthAtom';

const bannerDescription = {
  REQUIRED: '공연의 정산 내역서가 도착했어요. 내역을 확인한 후 정산을 요청해 주세요.',
  DONE: '공연의 정산이 완료되었어요.',
};

const HomePage = () => {
  const { removeToken } = useAuthAtom();
  const navigate = useNavigate();
  const logout = useLogout({}, removeToken);
  const confirm = useConfirm();

  const { data: userAccountInfoData, isLoading: isUserAccountInfoLoading } = useUserAccountInfo();
  const { data: userSummaryData, isLoading: isUserSummaryLoading } = useUserSummary();
  const { data: showList = [], isLoading: isShowListLoading } = useShowList();
  const { data: settlementBanners } = useSettlementBanners();

  const { imagePath, email, nickname = '' } = userSummaryData ?? {};
  const { bankAccount } = userAccountInfoData ?? {};
  const { bankName, bankAccountNumber, bankAccountHolder } = bankAccount ?? {};

  const isLoading = isUserAccountInfoLoading || isUserSummaryLoading || isShowListLoading;

  return (
    <Layout
      header={
        <Header
          left={
            <Styled.Logo to={PATH.INDEX}>
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
      banner={
        settlementBanners &&
        settlementBanners.length > 0 &&
        settlementBanners?.map((banner) => (
          <Styled.Banner key={banner.showId}>
            <Styled.BannerDescription>
              <Styled.BannerShowTitle>‘{banner.showName}’</Styled.BannerShowTitle>{' '}
              {bannerDescription[banner.bannerType]}
            </Styled.BannerDescription>
            <Styled.BannerLink to={HREF.SHOW_SETTLEMENT(banner.showId)}>
              정산 내역서 보러 가기 <ChevronRightIcon />
            </Styled.BannerLink>
          </Styled.Banner>
        ))
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
