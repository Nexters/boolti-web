import { queryKeys, useLogout, useQueryClient, useUserProfile } from '@boolti/api';
import { BooltiDark } from '@boolti/icon';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import ProfileDropdown from '~/components/ProfileDropdown';
import { PATH } from '~/constants/routes';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useAuthAtom } from '~/atoms/useAuthAtom';
import { openStoreLink } from '~/utils/link';

import Styled from './Header.styles';

const Header = () => {
  const { isLogin, removeToken } = useAuthAtom();
  const theme = useTheme();
  const deviceWidth = useDeviceWidth();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const { data } = useUserProfile({ enabled: isLogin() });
  const { imgPath } = data ?? {};

  const handleAppExplore = () => {
    if (isMobile) {
      openStoreLink();
      return;
    }
    navigate(PATH.QR);
  };

  const handleAuth = async () => {
    if (isLogin()) {
      await logoutMutation.mutateAsync();
      removeToken();
      queryClient.removeQueries({ ...queryKeys.user.summary });
      return;
    }
    navigate(PATH.LOGIN);
  };

  return (
    <Styled.Header>
      <Styled.HeaderContaienr>
        <Styled.BooltiIcon onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
          <BooltiDark />
        </Styled.BooltiIcon>
        <Styled.Nav>
          <Styled.TextButton type="button" onClick={handleAppExplore}>
            앱 둘러보기
          </Styled.TextButton>
          {isLogin() ? (
            <Styled.DropDownContainer>
              <ProfileDropdown image={imgPath} />
            </Styled.DropDownContainer>
          ) : (
            <Styled.AuthTextButton type="button" onClick={handleAuth}>
              로그인
            </Styled.AuthTextButton>
          )}
          <Styled.PrimaryButton to={PATH.HOME}>시작하기</Styled.PrimaryButton>
        </Styled.Nav>
      </Styled.HeaderContaienr>
    </Styled.Header>
  );
};

export default Header;
