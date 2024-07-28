import Styled from './UserProfile.styles';

interface Props {
  profileImage?: string;
  username: string;
  userCode?: string;
}

const UserProfile = ({ profileImage, username, userCode }: Props) => {
  return (
    <Styled.Container>
      {profileImage ? (
        <Styled.ProfileImage alt="" src={profileImage} />
      ) : (
        <Styled.DefaultProfileImage />
      )}
      <Styled.TextContainer>
        <Styled.Username>{username}</Styled.Username>
        <Styled.UserCode>
          {userCode ? `#${userCode}` : '사용자 코드를 알 수 없습니다.'}
        </Styled.UserCode>
      </Styled.TextContainer>
    </Styled.Container>
  );
};

export default UserProfile;
