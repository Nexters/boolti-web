import Styled from './UserProfile.styles';

interface Props {
  profileImage: string;
  username: string;
  email: string;
}

const UserProfile = ({ profileImage, username, email }: Props) => {
  return (
    <Styled.Container>
      <Styled.ProfileImage width={68} height={68} alt="" src={profileImage} />
      <Styled.TextContainer>
        <Styled.Username>{username}</Styled.Username>
        <Styled.Email>{email}</Styled.Email>
      </Styled.TextContainer>
    </Styled.Container>
  );
};

export default UserProfile;
