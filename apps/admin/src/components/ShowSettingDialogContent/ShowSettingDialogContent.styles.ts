import styled from '@emotion/styled';
import { UserProfile as DefaultUserProfileIcon } from '@boolti/icon';
import { mq_lg } from '@boolti/ui';

const Container = styled.div`
  margin: 16px 0;
  height: calc(100dvh - 148px);

  ${mq_lg} {
    margin: 0;
    height: auto;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionTitle = styled.h4`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const SectionDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const SectionDivider = styled.hr`
  height: 1px;
  background-color: ${({ theme }) => theme.palette.grey.g20};
  margin: 32px 0;
`;

const HostInputFormContainer = styled.div`
  margin-top: 12px;
`;

const HostListButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;

const HostPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const HostProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  object-fit: cover;
`;

const HostDefaultProfileImage = styled(DefaultUserProfileIcon)`
  border-radius: 999px;

  svg {
    width: 36px;
    height: 36px;
  }
`;

const HostName = styled.span`
  ${({ theme }) => theme.typo.b3};
  display: inline-flex;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;

export default {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionDivider,
  HostInputFormContainer,
  HostListButton,
  HostPreview,
  HostProfileImage,
  HostDefaultProfileImage,
  HostName,
  DeleteButtonContainer,
};
