import Styled from './UserProfile.styles';

interface Props {
  profileImage?: string;
  username: string;
  email?: string;
}

const UserProfile = ({ profileImage, username, email }: Props) => {
  return (
    <Styled.Container>
      {profileImage ? (
        <Styled.ProfileImage width={68} height={68} alt="" src={profileImage} />
      ) : (
        <Styled.DefaultProfileImage />
      )}
      <Styled.TextContainer>
        <Styled.Username>{username}</Styled.Username>
        <Styled.Email>{email ?? '이메일 정보를 알 수 없습니다.'}</Styled.Email>
      </Styled.TextContainer>
    </Styled.Container>
  );
};

export default UserProfile;
