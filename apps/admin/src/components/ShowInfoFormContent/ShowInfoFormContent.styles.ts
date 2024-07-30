import { Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface ShowInfoFormLabelProps {
  required?: boolean;
}

interface TextFieldProps {
  flex?: string | number;
}

interface ShowInfoFormButtonProps {
  width?: string;
}

interface FileUploadAreaProps {
  imageCount: number;
}

interface TextAreaProps {
  hasError?: boolean;
}

interface TicketGroupTitleProps {
  required?: boolean;
}

interface MobileTicketActionProps {
  disabled?: boolean;
}

const ShowInfoFormGroup = styled.div``;

const ShowInfoFormTitle = styled.h3`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 16px;

  ${mq_lg} {
    ${({ theme }) => theme.typo.h1};
  }
`;

const ShowInfoFormRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  gap: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ShowInfoFormContent = styled.div`
  flex: 1;
`;

const ShowInfoFormLabel = styled.label<ShowInfoFormLabelProps>`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};

  &::after {
    content: '*';
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.status.error};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }
`;

const ShowInfoFormDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin-top: 2px;

  strong {
    font-weight: 600;
  }
`;

const ShowInfoFormButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ShowInfoFormButton = styled(Button)<ShowInfoFormButtonProps>`
  width: ${({ width }) => width};
`;

const PreviewImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 88px);
  gap: 8px;
  height: 124px;
  margin-top: 16px;

  ${mq_lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    height: 256px;
  }
`;

const PreviewImage = styled.div<{ isFirstImage: boolean }>`
  max-width: 100%;
  height: ${({ isFirstImage }) => (isFirstImage ? 'calc(124px - 16px)' : '124px')};
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  aspect-ratio: 182 / 256;

  ${mq_lg} {
    height: ${({ isFirstImage }) => (isFirstImage ? 'calc(256px - 32px)' : '100%')};
  }
`;

const PreviewImageWrap = styled.div<{ isFirstImage: boolean }>`
  position: relative;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const FirstImageText = styled.span`
  font-size: 8px;
  font-weight: 600;
  line-height: 8px;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;

  ${mq_lg} {
    font-size: 14px;
    line-height: 18px;
    height: 32px;
  }
`;

const PreviewImageDeleteButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: ${({ theme }) => theme.palette.grey.g90};
  opacity: 0.8;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  path {
    stroke: ${({ theme }) => theme.palette.grey.w};
  }

  ${mq_lg} {
    width: 28px;
    height: 28px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const FileUploadArea = styled.div<FileUploadAreaProps>`
  grid-column: ${({ imageCount }) => {
    switch (imageCount) {
      case 1:
        return 'span 2';
      case 2:
        return 'span 1';
      case 3:
        return 'span 0';
      default:
        return 'span 3';
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  border: 1px dashed ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.palette.grey.g40};
  }
`;

const FileUploadAreaText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g40};
  display: flex;
  flex-direction: column;

  ${mq_lg} {
    ${({ theme }) => theme.typo.sh2};
    width: auto;
    flex-direction: row;
    gap: 4px;
  }
`;

const TextField = styled.div<TextFieldProps>`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: ${({ flex }) => flex};

  div {
    width: auto;
    flex: 1;
  }
`;

const TextFieldSuffix = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g50};
  flex: 0;
`;

const TextFieldRow = styled.div`
  display: flex;
  flex-direction: column;

  ${mq_lg} {
    flex-direction: row;
    gap: 8px;
  }
`;

const TextAreaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea<TextAreaProps>`
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? `${theme.palette.status.error} !important` : theme.palette.grey.g20};
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

  ${mq_lg} {
    margin-top: 8px;
  }
`;

const TextAreaErrorMessage = styled.p`
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error};
`;

const TicketGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TicketGroupHeader = styled.div`
  display: none;
  justify-content: space-between;

  ${mq_lg} {
    display: flex;
  }
`;

const TicketGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketGroupTitle = styled.h3<TicketGroupTitleProps>`
  display: flex;
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};

  &::after {
    content: '*';
    ${({ theme }) => theme.typo.b1};
    color: ${({ theme }) => theme.palette.status.error};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }

  ${mq_lg} {
    ${({ theme }) => theme.typo.h1};
    margin-bottom: 2px;
  }
`;

const TicketGroupDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  width: 100%;

  strong {
    font-weight: 600;
  }
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
`;

const TicketContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;

  ${mq_lg} {
    padding: 24px 28px;
  }
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TicketTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TicketTitleText = styled.h4`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};

  ${mq_lg} {
    ${({ theme }) => theme.typo.sh2};
  }
`;

const TicketDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};

  ${mq_lg} {
    ${({ theme }) => theme.typo.b3};
  }
`;

const TicketAction = styled.div`
  display: none;
  align-items: center;

  ${mq_lg} {
    display: flex;
  }
`;

const TicketCodeListContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const TicketCodeList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 575px;
  overflow-y: auto;
`;

const TicketCode = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;

  ${mq_lg} {
    padding: 16px 28px;
  }
`;

const TicketCodeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${mq_lg} {
    gap: 16px;
  }
`;

const TicketCodeNumber = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const TicketCodeText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const TicketCodeStatus = styled.div`
  display: flex;
  align-items: center;
`;

const TicketCodeListButton = styled.button`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};

  ${mq_lg} {
    height: 60px;
    ${({ theme }) => theme.typo.sh1};
  }
`;

const TicketAddButtonContainer = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MobileTicketGroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  ${mq_lg} {
    display: none;
    flex-direction: row;
  }
`;

const MobileTicketGroupInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileTicketAction = styled.div<MobileTicketActionProps>`
  button {
    width: 24px;
    height: 24px;
    padding: 0;

    div {
      margin-right: 0;
      width: 24px;
      height: 24px;

      svg {
        width: 24px;
        height: 24px;
        stroke: ${({ theme, disabled }) =>
          disabled ? theme.palette.grey.g40 : theme.palette.grey.g90};
      }
    }
  }

  ${mq_lg} {
    display: none;
  }
`;

export default {
  ShowInfoFormGroup,
  ShowInfoFormTitle,
  ShowInfoFormRow,
  ShowInfoFormContent,
  ShowInfoFormLabel,
  ShowInfoFormDescription,
  ShowInfoFormButtonContainer,
  ShowInfoFormButton,
  PreviewImageContainer,
  PreviewImageWrap,
  FirstImageText,
  PreviewImage,
  PreviewImageDeleteButton,
  FileUploadArea,
  FileUploadAreaText,
  TextField,
  TextFieldSuffix,
  TextFieldRow,
  TextAreaContainer,
  TextArea,
  TextAreaErrorMessage,
  TicketGroup,
  TicketGroupHeader,
  TicketGroupInfo,
  TicketGroupTitle,
  TicketGroupDescription,
  TicketList,
  Ticket,
  TicketContent,
  TicketInfo,
  TicketTitle,
  TicketTitleText,
  TicketDescription,
  TicketAction,
  TicketCodeListContainer,
  TicketCodeList,
  TicketCode,
  TicketCodeInfo,
  TicketCodeNumber,
  TicketCodeText,
  TicketCodeStatus,
  TicketCodeListButton,
  TicketAddButtonContainer,
  MobileTicketGroupHeader,
  MobileTicketGroupInfo,
  MobileTicketAction,
};
