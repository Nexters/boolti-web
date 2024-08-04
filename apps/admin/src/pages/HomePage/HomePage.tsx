import {
  queryKeys,
  useLogout,
  useQueryClient,
  useSettlementBanners,
  useShowList,
  useUserSummary,
} from '@boolti/api';
import { BooltiLogo, ChevronRightIcon, LogoutIcon, SettingIcon } from '@boolti/icon';
import { Footer, useConfirm, useDialog } from '@boolti/ui';

import Header from '~/components/Header';
import Layout from '~/components/Layout';
import ShowList from '~/components/ShowList';
import UserProfile from '~/components/UserProfile';
import { HREF, PATH } from '~/constants/routes';

import Styled from './HomePage.styles';
import ProfileDropdown from '~/components/ProfileDropdown';
import { useAuthAtom } from '~/atoms/useAuthAtom';
import SettingDialogContent from '~/components/SettingDialogContent';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const bannerDescription = {
  REQUIRED: '공연의 정산 내역서가 도착했어요. 내역을 확인한 후 정산을 요청해 주세요.',
  DONE: '공연의 정산이 완료되었어요.',
};

const HomePage = () => {
  const { removeToken } = useAuthAtom();
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();

  const settingDialog = useDialog();
  const confirm = useConfirm();

  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { data: userSummaryData, isLoading: isUserSummaryLoading } = useUserSummary();
  const { data: showList = [], isLoading: isShowListLoading } = useShowList();
  const { data: settlementBanners } = useSettlementBanners();

  const { imagePath, nickname = '', userCode } = userSummaryData ?? {};

  const isLoading = isUserSummaryLoading || isShowListLoading;

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
            <>
              <Styled.ProfileDropdown>
                <ProfileDropdown image={userSummaryData?.imagePath} />
              </Styled.ProfileDropdown>
              <Styled.ProfileDropdownMobile>
                <ProfileDropdown
                  image={userSummaryData?.imagePath}
                  open={profileDropdownOpen}
                  disabledDropdown
                  onClick={() => {
                    setProfileDropdownOpen((prev) => !prev);
                  }}
                />
              </Styled.ProfileDropdownMobile>
            </>
          }
        />
      }
      headerMenu={
        <>
          {profileDropdownOpen && (
            <Styled.HeaderMenu>
              <Styled.HeaderMenuItemButton
                type="button"
                onClick={() => {
                  settingDialog.open({
                    title: '설정',
                    content: <SettingDialogContent />,
                    isAuto: true,
                    contentPadding: '0',
                    mobileType: 'fullPage',
                  });
                }}
              >
                <SettingIcon /> 설정
              </Styled.HeaderMenuItemButton>
              <Styled.HeaderMenuItemButton
                type="button"
                onClick={async () => {
                  const result = await confirm('로그아웃 할까요?', {
                    cancel: '취소하기',
                    confirm: '로그아웃',
                  });
                  if (result) {
                    await logoutMutation.mutateAsync();

                    removeToken();
                    queryClient.removeQueries({ ...queryKeys.user.summary });

                    navigate(PATH.INDEX, { replace: true });
                  }
                }}
              >
                <LogoutIcon /> 로그아웃
              </Styled.HeaderMenuItemButton>
            </Styled.HeaderMenu>
          )}
        </>
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
            <UserProfile profileImage={imagePath} username={nickname} userCode={userCode} />
            <ShowList shows={showList} />
          </>
        )}
      </Styled.Container>
      <Footer />
    </Layout>
  );
};

export default HomePage;
