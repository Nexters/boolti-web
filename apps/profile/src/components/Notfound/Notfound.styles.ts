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

const CoverSection = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(18, 19, 24, 0.2) 0%, rgba(18, 19, 24, 1) 100%);
  }

  ${mq_lg} {
    border-radius: 20px 20px 0 0;
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
  margin-bottom: 32px;
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

export default {
  Header,
  CoverSection,
  CoverImage,
  CoverOverlay,
  ProfileInfo,
  Nickname,
  UserName,
};
