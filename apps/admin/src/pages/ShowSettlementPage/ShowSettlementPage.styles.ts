import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const ShowSettlementPage = styled.div`
  padding: 0 20px;
  margin: 20px 0 32px;

  ${mq_lg} {
    margin: 40px 0 68px;
  }
`;

const Notice = styled.div`
  padding: 20px 24px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  color: ${({ theme }) => theme.palette.grey.g60};
  ${({ theme }) => theme.typo.b1};
  word-break: keep-all;
`;

const Link = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.palette.grey.g90};
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
`;

const PageSection = styled.div`
  margin: 52px 0;
`;

const PageSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PageTitle = styled.h3`
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.h1};
`;

const PageDescription = styled.p`
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
  padding: 160px 0;
  margin: 0;
  text-align: center;
`;

const DocumentContainer = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  box-shadow: 0 8px 14px 0 ${({ theme }) => theme.palette.shadow};
`;

const DocumentFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin: 52px 0;
`;

const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormGroupLabel = styled.div`
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};
  display: flex;
  flex-direction: column;

  ${mq_lg} {
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
`;

const FormGroupLabelText = styled.span`
  display: inline-block;
`;

const FormGroupLabelSubText = styled.span`
  display: inline-block;
  ${({ theme }) => theme.typo.b1};
`;

const SelectContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const AccountAddButton = styled.div`
  color: ${({ theme }) => theme.palette.primary.o1};
  ${({ theme }) => theme.typo.sh1};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageSectionDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 52px 0;
`;

const SettlementDoneDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-top: 52px;
`;

export default {
  ShowSettlementPage,
  Notice,
  Link,
  PageSection,
  PageSectionHeader,
  PageTitle,
  PageDescription,
  DocumentContainer,
  DocumentFooter,
  FormGroupContainer,
  FormGroup,
  FormGroupLabel,
  FormGroupLabelText,
  FormGroupLabelSubText,
  SelectContainer,
  AccountAddButton,
  PageSectionDivider,
  SettlementDoneDescription,
};
