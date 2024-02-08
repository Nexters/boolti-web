import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

interface ProcessIndicatorItemProps {
  active?: boolean;
  currentStep?: boolean;
}

interface ShowAddFormLabelProps {
  required?: boolean;
}

interface TextFieldProps {
  flex?: string | number;
}

interface ShowAddFormButtonProps {
  width?: string;
}

interface FileUploadAreaProps {
  imageCount: number;
}

interface TicketGroupTitleProps {
  required?: boolean;
}

const ShowAddPage = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const HeaderContainer = styled.div``;

const Header = styled.header`
  display: flex;
  align-items: center;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  height: 68px;
  padding: 0 20px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-left: 8px;
`;

const CardContainer = styled.div`
  padding: 40px 20px 68px;
`;

const Card = styled.div`
  max-width: 760px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 0px 20px 0px ${({ theme }) => theme.palette.shadow};
  border-radius: 8px;
`;

const CardHeader = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const CardHeaderText = styled.h2`
  ${({ theme }) => theme.typo.h2_m};
  color: ${({ theme }) => theme.palette.grey.g70};
  text-align: center;
`;

const CardContent = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProcessIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 46px;
  margin-bottom: 40px;
`;

const ProcessIndicatorItem = styled.div<ProcessIndicatorItemProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;

  &::before {
    content: '';
    width: 72px;
    height: 1px;
    background-color: ${({ theme, active }) =>
      active ? theme.palette.primary.o1 : theme.palette.grey.g20};
    position: absolute;
    left: -59px;
    top: 5px;
  }

  &:first-of-type::before {
    content: none;
  }
`;

const ProcessIndicatorDot = styled.div<ProcessIndicatorItemProps>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ theme, active, currentStep }) =>
    active && currentStep ? theme.palette.primary.o1 : 'none'};
  border: 2px solid
    ${({ theme, active }) => (active ? theme.palette.primary.o1 : theme.palette.grey.g20)};
`;

const ProcessIndicatorText = styled.span<ProcessIndicatorItemProps>`
  ${({ theme }) => theme.typo.c1};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ theme, active }) => (active ? theme.palette.primary.o1 : theme.palette.grey.g30)};
`;

const CardDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-align: center;
  margin-bottom: 40px;
`;

const ShowAddForm = styled.form`
  width: 600px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 68px;
`;

const ShowAddFormGroup = styled.div``;

const ShowAddFormTitle = styled.h3`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 16px;
`;

const ShowAddFormRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  gap: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ShowAddFormContent = styled.div`
  flex: 1;
`;

const ShowAddFormLabel = styled.label<ShowAddFormLabelProps>`
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

const ShowAddFormDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin-top: 2px;

  strong {
    font-weight: 600;
  }
`;

const ShowAddFormButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ShowAddFormButton = styled(Button)<ShowAddFormButtonProps>`
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
  margin-top: 16px;
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
`;

const TicketGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 68px;
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
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  border-radius: 8px;
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
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

const TicketAddButtonContainer = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default {
  ShowAddPage,
  HeaderContainer,
  Header,
  BackButton,
  HeaderText,
  CardContainer,
  Card,
  CardHeader,
  CardHeaderText,
  CardContent,
  ProcessIndicator,
  ProcessIndicatorItem,
  ProcessIndicatorDot,
  ProcessIndicatorText,
  CardDescription,
  ShowAddForm,
  ShowAddFormGroup,
  ShowAddFormTitle,
  ShowAddFormRow,
  ShowAddFormContent,
  ShowAddFormLabel,
  ShowAddFormDescription,
  ShowAddFormButtonContainer,
  ShowAddFormButton,
  PreviewImageContainer,
  PreviewImage,
  PreviewImageDeleteButton,
  FileUploadArea,
  FileUploadAreaText,
  TextField,
  TextFieldSuffix,
  TextFieldRow,
  TextArea,
  TicketGroupContainer,
  TicketGroup,
  TicketGroupHeader,
  TicketGroupInfo,
  TicketGroupTitle,
  TicketGroupDescription,
  TicketList,
  Ticket,
  TicketInfo,
  TicketTitle,
  TicketTitleText,
  TicketDescription,
  TicketAction,
  TicketAddButtonContainer,
};
