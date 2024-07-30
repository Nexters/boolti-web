import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const AccountDeleteForm = styled.form`
  padding: 24px 0;

  ${mq_lg} {
    padding: 0;
  }
`;

const AccountDeleteFormDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 12px;
  line-height: 24px;
`;

const AccountDeleteFormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};

  &:placeholder-shown {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.grey.g10};
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g40};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const AccountDeleteFormButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 32px;
`;

export default {
  AccountDeleteForm,
  AccountDeleteFormDescription,
  AccountDeleteFormTextArea,
  AccountDeleteFormButtonWrapper,
};
