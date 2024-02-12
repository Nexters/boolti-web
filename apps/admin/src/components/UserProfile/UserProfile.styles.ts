import { UserProfile as DefaultUserProfileIcon } from '@boolti/icon';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
`;

const DefaultProfileImage = styled(DefaultUserProfileIcon)`
  border-radius: 100%;
`;

const TextContainer = styled.div`
  margin-left: 16px;
`;

const Username = styled.p`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 6px;
`;

const Email = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

export default {
  Container,
  ProfileImage,
  TextContainer,
  Username,
  Email,
  DefaultProfileImage,
};
