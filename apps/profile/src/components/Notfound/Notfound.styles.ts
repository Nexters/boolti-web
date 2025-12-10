import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: ${({ theme }) => theme.palette.grey.g10};

  ${mq_lg} {
    height: 60px;
    padding: 0;
    position: relative;
    background-color: transparent;
  }
`;

const CoverSection = styled.div<{ isCover: boolean }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  border-radius: ${({ isCover }) => (isCover ? '20px 20px 0 0' : '0')};
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
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 168px;
`;

const ModalText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: '#282B33';
  text-align: left;
  margin: 0;
`;

const ModalButton = styled.a`
  width: auto;
  height: 48px;
  padding: 0 24px;
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
  align-self: flex-end;
`;

export default {
  Header,
  CoverSection,
  CoverImage,
  CoverOverlay,
  ProfileInfo,
  Nickname,
  UserName,
  ModalOverlay,
  ModalContent,
  ModalText,
  ModalButton,
};
