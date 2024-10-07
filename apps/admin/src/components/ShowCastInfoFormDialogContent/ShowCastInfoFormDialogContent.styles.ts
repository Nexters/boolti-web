import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

interface ShowInfoFormLabelProps {
  required?: boolean;
}

interface InputWrapperProps {
  text: string;
  isError?: boolean;
}

const ShowInfoFormLabel = styled.span<ShowInfoFormLabelProps>`
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
`;

const MemberList = styled.div`
  max-height: 364px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FieldWrap = styled.div`
  flex: 1;
  margin-right: 8px;
  width: calc(50% - 32px);
`;

const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid
    ${({ text, theme, isError }) =>
      isError
        ? theme.palette.status.error
        : text
          ? theme.palette.grey.g90
          : theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 8px 12px;
  height: 48px;
  flex: auto;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const TextFieldWrap = styled.div`
  margin-bottom: 28px;

  & > div {
    width: auto;
  }
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
  align-items: flex-start;
  margin-bottom: 20px;
`;

const TrashCanButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  height: 100%;
`;

const MemberAddButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  padding: 11px 0;
  border: 1px dashed ${({ theme }) => theme.palette.grey.g20};
  background: var(--W-White, #fff);
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g40};
  width: 536px;

  & > svg {
    margin-right: 8px;
  }
`;

const RegisterButton = styled(Button)`
  margin-left: auto;
`;

const UserImage = styled.div`
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: var(--imgPath);
`;

const Username = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin: 0 8px;
  flex: 1 1 auto;
`;

const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  ${({ theme }) => theme.typo.sh1};
  text-decoration: underline;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

const ErrorMessage = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error};
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
  MemberList,
  UserImage,
  Username,
  RemoveButton,
  TextFieldWrap,
  ButtonWrap,
  DeleteButton,
  ErrorMessage,
  FieldWrap,
};
