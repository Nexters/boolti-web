import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const Warning = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const Input = styled.input<{ hasError?: boolean }>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.palette.status.error1 : theme.palette.grey.g20)};
  border-radius: 4px;
  padding: 12px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    border-color: ${({ hasError, theme }) =>
      hasError ? theme.palette.status.error1 : theme.palette.grey.g90};
    outline: none;
  }
`;

const ErrorText = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
  margin-top: -8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

export default {
  Container,
  Description,
  Warning,
  Input,
  ErrorText,
  ButtonContainer,
};
