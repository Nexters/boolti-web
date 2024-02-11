import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  padding: 28px 32px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 4px;
`;

const Description = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 24px;
`;

const AccountText = styled.span`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-right: 8px;
  &:last-of-type {
    margin-right: 16px;
  }
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default {
  Container,
  Title,
  Description,
  AccountText,
  AccountContainer,
};
