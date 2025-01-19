import { Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface ShowInfoFormLabelProps {
  required?: boolean;
}

interface InputWrapperProps {
  isError?: boolean;
}

const Container = styled.div`
  max-width: 600px;
`;

const ShowInfoFormLabel = styled.span<ShowInfoFormLabelProps>`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;

  &::after {
    content: '*';
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.status.error1};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }

  &:first-of-type {
    padding-top: 8px;
  }
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 364px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FieldWrap = styled.div`
  flex: 1;
  margin-right: 8px;
  width: calc(50% - 36px);
  max-width: calc(50% - 36px);
`;

const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid
    ${({ theme, isError }) => (isError ? theme.palette.status.error1 : theme.palette.grey.g20)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 8px 36px 8px 12px;
  height: 48px;
  flex: auto;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  transition: border-color 0.2s ease-in-out;

  &:focus-within {
    border-color: ${({ theme, isError }) =>
      isError ? theme.palette.status.error1 : theme.palette.grey.g70};
  }
`;

const Handle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.grey.g40};
  margin-top: 12px;
  margin-right: 8px;
  cursor: grab;
  user-select: none;
  user-zoom: none;
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
  width: 100%;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  position: relative;
  z-index: 99;
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

  & > svg {
    margin-right: 8px;
  }

  ${mq_lg} {
    width: 536px;
  }
`;

const RegisterButton = styled(Button)`
  flex: 1;

  ${mq_lg} {
    margin-left: auto;
    flex: none;
  }
`;

const UserImageWrap = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
  }
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
  margin: 0 6px 0 0;
  flex: 1 1 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${mq_lg} {
    margin: 0 8px;
  }
`;

const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 12px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  ${({ theme }) => theme.typo.sh1};
  text-decoration: underline;
  margin-right: 48px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 16px;
  ${mq_lg} {
    padding-bottom: 0;
  }
`;

const ErrorMessage = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

const DraggableShowCastInfoMemberRow = styled.div`
  border-radius: 4px;
  cursor: grabbing;
  backdrop-filter: blur(1.5px);
  z-index: 100;

  & > div > div > div {
    background: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background-color: rgba(231, 234, 242, 0.5);
    border-radius: 4px;
    z-index: -1;
  }
`;

export default {
  Container,
  ShowInfoFormLabel,
  InputWrapper,
  Handle,
  HashTag,
  Input,
  Row,
  TrashCanButton,
  MemberAddButton,
  RegisterButton,
  MemberList,
  UserImage,
  UserImageWrap,
  Username,
  RemoveButton,
  TextFieldWrap,
  ButtonWrap,
  DeleteButton,
  ErrorMessage,
  FieldWrap,
  DraggableShowCastInfoMemberRow,
};
