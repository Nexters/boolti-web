import { queryKeys, useLogout, useQueryClient } from '@boolti/api';
import { ChevronDownIcon, ChevronUpIcon, LogoutIcon, SettingIcon, UserIcon } from '@boolti/icon';
import { useConfirm, useDialog, useDropdown } from '@boolti/ui/src/hooks';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

import Styled from './ProfileDropdown.styles';
import { useAuthAtom } from '~/atoms/useAuthAtom';
import SettingDialogContent from '../SettingDialogContent';

interface ProfileDropdownProps {
  image?: string;
  open?: boolean;
  disabledDropdown?: boolean;
  onClick?: () => void;
}

const ProfileDropdown = ({ image, open, disabledDropdown, onClick }: ProfileDropdownProps) => {
  const { isOpen, toggleDropdown } = useDropdown();
  const { removeToken } = useAuthAtom();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const settingDialog = useDialog();

  const dropdownOpen = open ?? isOpen;

  return (
    <Styled.DropdownContainer
      onClick={() => {
        onClick?.();

        if (disabledDropdown) return;

        toggleDropdown();
      }}
    >
      <Styled.UserProfileImageWrapper>
        {image ? <Styled.UserProfileImage src={image} alt="유저 프로필 이미지" /> : <UserIcon />}
      </Styled.UserProfileImageWrapper>
      <Styled.UserProfileIconWrapper className="icon-wrapper">
        {dropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Styled.UserProfileIconWrapper>
      {dropdownOpen && !disabledDropdown && (
        <Styled.DropdownMenuWrapper>
          <Styled.DropdownMenuItemButton
            type="button"
            onClick={() => {
              settingDialog.open({
                title: '설정',
                content: <SettingDialogContent onDeleteAccount={settingDialog.close} />,
                isAuto: true,
                contentPadding: '0',
                mobileType: 'fullPage',
              });
            }}
          >
            <SettingIcon /> 설정
          </Styled.DropdownMenuItemButton>
          <Styled.DropdownMenuItemButton
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
          </Styled.DropdownMenuItemButton>
        </Styled.DropdownMenuWrapper>
      )}
    </Styled.DropdownContainer>
  );
};

export default ProfileDropdown;
