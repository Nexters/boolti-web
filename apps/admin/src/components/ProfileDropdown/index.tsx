import { useLogout } from '@boolti/api';
import { ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { TextButton } from '@boolti/ui';
import { useDropdown } from '@boolti/ui/src/hooks';

import Styled from './ProfileDropdown.styles';

interface ProfileDropdownProps {
  image?: string;
}

// TODO: UserProfile svg 공통화
const ProfileSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#E7EAF2" />
    <mask id="mask0_7956_29535" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
      <circle cx="18" cy="18" r="18" fill="#2E303A" />
    </mask>
    <g mask="url(#mask0_7956_29535)">
      <path
        d="M31.9496 36.9V32.85C31.9496 30.7017 31.0962 28.6415 29.5772 27.1224C28.0581 25.6034 25.9979 24.75 23.8496 24.75H11.6996C9.55136 24.75 7.49109 25.6034 5.97204 27.1224C4.453 28.6415 3.59961 30.7017 3.59961 32.85V36.9"
        fill="#C8CCDC"
      />
      <path
        d="M17.9992 22.05C21.4786 22.05 24.2992 19.2294 24.2992 15.75C24.2992 12.2706 21.4786 9.45001 17.9992 9.45001C14.5198 9.45001 11.6992 12.2706 11.6992 15.75C11.6992 19.2294 14.5198 22.05 17.9992 22.05Z"
        fill="#C8CCDC"
      />
    </g>
  </svg>
);

const ProfileDropdown = ({ image }: ProfileDropdownProps) => {
  const { isOpen, toggleDropdown } = useDropdown();
  const logoutMutation = useLogout();

  return (
    <Styled.DropdownContainer onClick={() => toggleDropdown()}>
      <Styled.UserProfileImageWrapper>
        {image ? <Styled.UserProfileImage src={image} alt="유저 프로필 이미지" /> : <ProfileSVG />}
      </Styled.UserProfileImageWrapper>
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      {isOpen && (
        <Styled.DropdownMenuWrapper>
          <TextButton
            type="button"
            size="regular"
            colorTheme="netural"
            onClick={async () => {
              await logoutMutation.mutateAsync();
            }}
          >
            로그아웃
          </TextButton>
        </Styled.DropdownMenuWrapper>
      )}
    </Styled.DropdownContainer>
  );
};

export default ProfileDropdown;
