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
  margin-bottom: 20px;
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
  margin: 0 0 52px;
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
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  box-shadow: 0 8px 14px 0 ${({ theme }) => theme.palette.shadow};
  padding: 0 20px;

  ${mq_lg} {
    height: auto;
    padding: 0;
  }
`;

const DocumentMobileText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g40};
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

const SummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  ${mq_lg} {
    gap: 12px;
    margin-bottom: 40px;
  }
`;

const Summary = styled.div<{ colorTheme: 'grey' | 'primary' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  flex: 1 0 auto;
  height: 50px;
  width: 100%;
  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'grey':
        return `
          border: 1px solid ${theme.palette.grey.g00};
          background-color: ${theme.palette.grey.g00};
          color: ${theme.palette.grey.g60};
          & > b {
            color: ${theme.palette.grey.g90};
          }
        `;
      case 'primary':
        return `
          border: 1px solid ${theme.palette.primary.o0};
          background-color: ${theme.palette.primary.o0};
          color: ${theme.palette.primary.o2};
        `;
    }
  }}
  ${mq_lg} {
    flex: 1 0 30%;
    height: 58px;
    padding: 16px 20px;
    min-width: 230px;
    align-items: center;
  }
`;

const SumamryLabel = styled.span<{ bold?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.b1};
  white-space: nowrap;

  & > svg {
    margin-left: 4px;
  }

  ${mq_lg} {
    ${({ theme }) => theme.typo.b2};
  }
`;

const SumamryValue = styled.b`
  white-space: nowrap;
  margin-left: 4px;
  ${({ theme }) => theme.typo.sh2};
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
  SummaryContainer,
  Summary,
  SumamryLabel,
  SumamryValue,
  DocumentMobileText,
};
