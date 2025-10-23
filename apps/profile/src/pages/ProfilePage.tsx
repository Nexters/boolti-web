import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <>
      <Helmet>
        <title>{username} - 불티 프로필</title>
        <meta name="description" content={`${username}의 불티 프로필 페이지입니다.`} />
        <meta property="og:title" content={`${username} - 불티 프로필`} />
        <meta property="og:description" content={`${username}의 불티 프로필 페이지입니다.`} />
      </Helmet>

      <Container>
        <ProfileHeader>
          <ProfileImage>
            <Placeholder>{username?.[0]?.toUpperCase()}</Placeholder>
          </ProfileImage>
          <Username>@{username}</Username>
        </ProfileHeader>
      </Container>
    </>
  );
};

export default ProfilePage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const ProfileHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const Placeholder = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
`;

const Username = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #212529;
  margin: 0;
`;

const Content = styled.main`
  max-width: 768px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #495057;
  line-height: 1.6;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #868e96;
  font-size: 14px;
`;
