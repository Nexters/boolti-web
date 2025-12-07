import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '~/components/Layout';
import { EXTERNAL_DOMAIN } from '~/constants/external';

const NotFound = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const [isDesktop, setIsDesktop] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 - 불티</title>
      </Helmet>

      <Layout>
        <CoverSection isCover={false} isDesktop={isDesktop}>
          <CoverImage
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgQChENDRAPDQ8QDQ0NEBANDQ8NDQ8PFBEWFhUdExMZHCggGBolGxUTITEhJSkrLi42Fx85ODMsNygtLisBCgoKDg0OFxAQFS4dICU3NSsrLS0rMC0rLSstKzctLSs1Ky03KystNS0rKy0tLS0rKysrKzc3LS03KysrKysrN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAAAAQUCBAYD/8QAMRABAAIAAwYCCQUBAQAAAAAAAAECAwQRBRIhMUFRMnEiYXKRkqGxweEzQlKB0SMU/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAHhEBAQEBAAIDAQEAAAAAAAAAAAECEQMxIUFREhP/2gAMAwEAAhEDEQA/APVgr6L5qCoKKIIoAAAAAAAAAAAAAIKAgoCCgIKAgoCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAKogCiKAAIAAAAAAAAAAAACAqiAKIAogAqAgAKAAKigACAAAAA5Uw72nSsTPlGr71yGYnpEecwlsiyWusO1Oz8x2ifK0PhiYOLXxVmP64e87DlcAFQABABQAAAAAAAQAFAAFRQABAACIno0crs+OeJ8P8Arns7KxEb9uc8vVDustb+o1zj7qVrERpEREdo4KDNqAA6eZyFLcaejPb9s/4y71tE6TGkw9A62dy0XrrHijl6/U0zv9Z6x+McBqxQAUAAAAAAAEABQABUUAAQfbJ4W/ixHTnPlD4tDZFeNreUOdXkdZna0QGD0AAAAAAMjaWFu4uscrcf76uq1Nq1/wCcT2t9YZbfN7GG5yoA6cgAAAAAAAAAAACooAAg09k+C3tR9GY72yr6XmveNfc536d49tMBg3AAAAAAdXaf6M+1VkNLa1/RrX17zNbY9MN+0AduQAAAAAAAQAFAAFRQABBywsSa3i0c4nVxBW/h3rasWjlMauTHyWamk6TxrPylr1tExrE6xPWGGs8b511QHLoAAJmIjWeEDLz+c3vQp4es9/wsnXOtcdfNY2/iTbpyjyfIG7BAFAAAAAAAAQAFAAFRQABAAB9cDMYlJ9GeHWJ5S+Qi9auFtHCnxa1n3w7FcfBnlavvhhI5uI7nkrfnGwo52r8UPhi5/AjlO9Pq/wBY6p/nC+SuxmM5iX4eGvaPu64O5OOLegCogAoAAAAAAAIACgACooAAgPtl8tiXnhwjrM8mngZPCpx03p7z9nN1I7zm1mYWUxrcq6R3nhDt4ezP5W+GPu0Bnd1pMR1a7Py8dJnzmXOMnl/4R833HPa6/mfj4/8Ajy/8I+bhbIZeekx5TLsh2n8z8Z99mR+23xQ6uLk8evONY714todTdc3EeeG1j5TCvzjSe8cJ/LMzOVxKc+Ne8fdpNSs9YsdcB05AAAAAAABAAUAAVFAdvJZOb+lbhX52/Djkctv21nwxz9c9mxEQz3rnxHeM9+aViIjSOER0gBk2AAAAAAAACYjTSeIAy89kt306eHrHb8Oi9GyNoZXdner4Z+Utca+qy1n7jpgNGYAAAAAIACgADlSk2tFY5zOji0NlYWtpvPThHmlvIsna7+Dh1rSKx0+cuYPO9AAAAAAAAAAAACuOJStqzWeUxo5Ajz+PhTS81np84cGntbC9GLx04T5dGY3zexhqcoA6QAAAEABQABt5Gm7g19cb3vYkRxehrGkRHaIhn5Gnj9qAyagAAAAAAAAAAAKAI4Y9N7DtXvE+9596N5/MV0xLR2tP1aeNn5HABqzAAABAAUABywvHX2o+r0Dz+F46+1X6vQMvI18f2AM2gAAAAAAAAAAACgCDCzv69/a+zdYee/Xv5/Z34/bjfp8AGzIAAAB//9k="
            alt="기본 프로필"
          />
          <CoverOverlay>
            <ProfileInfo>
              <Nickname>닉네임</Nickname>
              <UserName>@{userCode || 'username'}</UserName>
            </ProfileInfo>
          </CoverOverlay>
        </CoverSection>

        {showModal && (
          <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalText>존재하지 않는 프로필입니다.</ModalText>
              <ModalButton href={EXTERNAL_DOMAIN.SHOW_MANAGER}>불티 홈 바로 가기</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Layout>
    </>
  );
};

export default NotFound;

const CoverSection = styled.div<{ isCover: boolean; isDesktop: boolean }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  border-radius: ${({ isCover, isDesktop }) => (isCover && isDesktop ? '20px 20px 0 0' : '0')};
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(18, 19, 24, 0.2) 0%, rgba(18, 19, 24, 1) 100%);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const CoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.h1`
  ${({ theme }) => theme.typo.point.p3};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey.g10};
`;

const UserName = styled.h1`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 40px 24px 24px;
  max-width: 382px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalText = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: #121318;
  text-align: center;
  margin: 0;
`;

const ModalButton = styled.a`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff5623;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  ${({ theme }) => theme.typo.sh1};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e64d1f;
  }
`;
