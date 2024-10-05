import { Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface ShowInfoFormLabelProps {
  required?: boolean;
}

interface InputWrapperProps {
  text: string;
}

const ShowInfoFormLabel = styled.label<ShowInfoFormLabelProps>`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;

  &::after {
    content: '*';
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.status.error};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid ${({ text, theme }) => (text ? theme.palette.grey.g90 : theme.palette.grey.g20)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 12px;
  margin-right: 8px;
  flex: auto;
  position: relative;
  display: flex;
  align-items: center;
`;

const HashTag = styled.span`
  color: ${({ theme }) => theme.palette.grey.g90};
  line-height: 24px;
  padding-right: 4px;
`;

const Input = styled.input`
  width: ${({ value }) => (value ? 'calc(100% - 80px)' : '100%')};
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TrashCanButton = styled.button`
  cursor: pointer;
  height: 100%;
`;

const MemberAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  padding: 11px 0;
  border: 1px dashed var(--W-G20, #d8dbe5);
  background: var(--W-White, #fff);
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g40};

  & > svg {
    margin-right: 8px;
  }
`;

const RegisterButton = styled(Button)`
  margin: 32px 0 0 auto;
`;

export default {
  ShowInfoFormLabel,
  InputWrapper,
  HashTag,
  Input,
  Row,
  TrashCanButton,
  MemberAddButton,
  RegisterButton,
};
