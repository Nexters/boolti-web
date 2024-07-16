import { UserProfile as DefaultUserProfileIcon } from '@boolti/icon';
import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 52px;
  height: 52px;

  ${mq_lg} {
    width: 68px;
    height: 68px;
  }
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

  ${mq_lg} {
    margin-bottom: 6px;
    ${({ theme }) => theme.typo.h2};
  }
`;

const Email = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};

  ${mq_lg} {
    ${({ theme }) => theme.typo.b3};
  }
`;

export default {
  Container,
  ProfileImage,
  TextContainer,
  Username,
  Email,
  DefaultProfileImage,
};
