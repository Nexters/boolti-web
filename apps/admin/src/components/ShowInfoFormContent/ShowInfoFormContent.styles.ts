import { Button } from '@boolti/ui';
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

interface TicketGroupTitleProps {
  required?: boolean;
}

const ShowInfoFormGroup = styled.div``;

const ShowInfoFormTitle = styled.h3`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 16px;
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
  grid-template-columns: repeat(3, 1fr);
  height: 256px;
  gap: 28px;
  margin-top: 16px;
`;

const PreviewImage = styled.div`
  position: relative;
  display: block;
  max-width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  &:first-of-type::after {
    content: '대표 사진';
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    background-color: ${({ theme }) => theme.palette.primary.o1};
    color: ${({ theme }) => theme.palette.grey.w};
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const PreviewImageDeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: ${({ theme }) => theme.palette.grey.g90};
  opacity: 0.8;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.palette.grey.w};
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
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g40};
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
  gap: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};

  &:placeholder-shown {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.grey.g10};
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g40};
  }
`;

const TicketGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TicketGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TicketGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketGroupTitle = styled.h3<TicketGroupTitleProps>`
  display: flex;
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 2px;

  &::after {
    content: '*';
    ${({ theme }) => theme.typo.b1};
    color: ${({ theme }) => theme.palette.status.error};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }
`;

const TicketGroupDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};

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
  padding: 24px 28px;
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
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const TicketDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const TicketAction = styled.div`
  display: flex;
  align-items: center;
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
  padding: 16px 28px;
`;

const TicketCodeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const TicketAddButtonContainer = styled.div`
  svg {
    width: 20px;
    height: 20px;
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
  PreviewImage,
  PreviewImageDeleteButton,
  FileUploadArea,
  FileUploadAreaText,
  TextField,
  TextFieldSuffix,
  TextFieldRow,
  TextArea,
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
};
