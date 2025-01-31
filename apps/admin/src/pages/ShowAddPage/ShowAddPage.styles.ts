import { Button, Checkbox, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface ShowAddFormLabelProps {
  required?: boolean;
}

interface TextFieldProps {
  flex?: string | number;
}

interface ShowAddFormButtonProps {
  variant: 'prev' | 'next';
}

interface FileUploadAreaProps {
  imageCount: number;
}

const ShowAddPage = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};

  ${mq_lg} {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const HeaderContainer = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
  }
`;

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
  z-index: 1;
  cursor: pointer;
`;

const HeaderText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-left: 8px;
`;

const Content = styled.div`
  display: none;
  padding: 40px 20px 68px;

  ${mq_lg} {
    display: block;
  }
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
  padding: 40px 20px 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProcessIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  ${mq_lg} {
    margin-bottom: 28px;
  }
`;

const CardDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-align: center;
  margin-bottom: 32px;

  ${mq_lg} {
    margin-bottom: 40px;
  }
`;

const ShowAddForm = styled.form`
  width: 600px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ShowInfoFormContent = styled.div``;

const ShowInfoFormDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 52px 0;
`;

const ShowInfoFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 52px;

  button:first-of-type {
    width: 128px;
  }
`;

const ShowAddFormGroup = styled.div`
  margin-bottom: 28px;
`;

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
    color: ${({ theme }) => theme.palette.status.error1};
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

const ShowAddFormButton = styled(Button) <ShowAddFormButtonProps>`
  ${({ variant }) => {
    switch (variant) {
      case 'next': {
        return `
          width: calc(100% - 100px);
        `;
      }
      case 'prev': {
        return `
          width: 100px;
        `;
      }
      default: {
        return `
          width: 100%;
        `;
      }
    }
  }};
  padding: 0 8px;

  ${mq_lg} {
    ${({ variant }) => {
    switch (variant) {
      case 'next': {
        return `
          width: calc(100% - 152px);
        `;
      }
      case 'prev': {
        return `
          width: 152px;
        `;
      }
      default: {
        return `
          width: 100%;
        `;
      }
    }
  }};
  }
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

const TicketFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TicketForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-bottom: 32px;
`;

const TicketFormTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};

  ${mq_lg} {
    ${({ theme }) => theme.typo.h1};
  }
`;

const TermGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  padding: 20px;
  border-radius: 8px;
`;

const TermGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Term = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TermLabel = styled(Checkbox.Label) <{ main?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme, main }) => (main ? theme.typo.sh1 : theme.typo.b1)};
  color: ${({ theme, main }) => (main ? theme.palette.grey.g90 : theme.palette.grey.g60)};
  font-weight: ${({ main }) => (main ? '600' : '400')};
  user-select: none;
  cursor: ${({ main }) => (main ? 'pointer' : 'default')};
`;

const TermLink = styled.a`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-decoration: underline;
`;

const MobileHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};

  ${mq_lg} {
    display: none;
  }
`;

const MobileHeaderText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const MobileContent = styled.div<{ isWebView: boolean }>`
  margin-top: ${({ isWebView }) => (isWebView ? '0' : '52px')};
  padding: 32px 20px;

  ${mq_lg} {
    display: none;
  }
`;

export default {
  ShowAddPage,
  HeaderContainer,
  Header,
  BackButton,
  HeaderText,
  Content,
  Card,
  CardHeader,
  CardHeaderText,
  CardContent,
  ProcessIndicator,
  CardDescription,
  ShowAddForm,
  ShowInfoFormContent,
  ShowInfoFormDivider,
  ShowInfoFormFooter,
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
  TicketFormContainer,
  TicketForm,
  TicketFormTitle,
  TermGroupContainer,
  TermGroup,
  Term,
  TermLabel,
  TermLink,
  MobileHeader,
  MobileHeaderText,
  MobileContent,
};
