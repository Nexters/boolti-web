import styled from '@emotion/styled';

interface TextFieldProps {
  width?: string;
  align?: 'left' | 'right';
}

interface SelectProps {
  width?: string;
}

const SettlementStatement = styled.div`
  width: 920px;
  height: 600px;
  padding-bottom: 32px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    text-align: center;
    margin: 0 0 40px 0;
  }

  .header-section {
    margin-bottom: 40px;
  }

  .header-section h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin: 0 0 4px 0;
  }

  .header-section-row {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  .header-section-row h3 {
    width: 120px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin: 0 12px 0 0;
  }

  .header-section-row h3.top {
    align-self: flex-start;
  }

  .header-section-row span {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #6f7485;
  }

  .middle-section {
    border-top: 1px solid #d8dbe5;
    margin-bottom: 40px;
  }

  .middle-section h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin: 0 0 8px 0;
  }

  .middle-section h3 {
    font-size: 15px;
    font-weight: 600;
    line-height: 23px;
    margin: 0;
    float: left;
  }

  .middle-section span {
    font-size: 15px;
    font-weight: 600;
    line-height: 23px;
    float: right;
  }

  .middle-section .table-row {
    padding: 12px 20px;
    display: flex;
    border-bottom: 1px solid #d8dbe5;
  }

  .middle-section .table-row .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .middle-section .table-sub-row {
    padding: 12px 20px;
    display: flex;
    border-bottom: 1px solid #d8dbe5;
  }

  .middle-section .table-sub-row.column {
    flex-direction: column;
  }

  .middle-section .table-sub-row ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
  }

  .middle-section .table-sub-row li {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }

  .middle-section .table-sub-row li .dot {
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background-color: #6f7485;
    margin: 0 10px;
  }

  .middle-section .table-sub-row li .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .middle-section .table-sub-row .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .middle-section .table-sub-row h3,
  .middle-section .table-sub-row span {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #6f7485;
  }

  .middle-section span {
    display: flex;
    align-items: center;
  }

  .placeholder {
    ${({ theme }) => theme.typo.sh1};
    color: ${({ theme }) => theme.palette.grey.g50};
    margin-left: 8px;
  }

  .middle-section .table-sub-row li:last-child {
    margin-bottom: 0;
  }

  .notice-section {
    padding: 12px 20px;
    background-color: #f3f5f9;
    margin-bottom: 40px;
  }

  .notice-section h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin: 0 0 4px 0;
    color: #6f7485;
  }

  .notice-section div {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin: 0;
    color: #6f7485;
    display: flex;
  }

  .notice-section .dot {
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background-color: #6f7485;
    margin: 10px 10px 0;
  }

  .dot {
    flex-shrink: 0;
  }

  .footer-section p {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
  }
`;

const SettlementStatementForm = styled.form``;

const SettlementStatementFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 48px;
  padding-bottom: 32px;
`;

const SettlementStatementPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
`;

const PreviewMessage = styled.div`
  background-color: #facbcf;
  border-radius: 8px;
  padding: 16px 20px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 32px;
`;

const TextFieldRow = styled.div`
  display: flex;
  gap: 8px;
`;

const TextField = styled.input<TextFieldProps>`
  width: ${({ width }) => width ?? '100%'};
  height: 32px;
  padding: 0 12px;
  ${({ theme }) => theme.typo.b1};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.grey.g90};
  text-align: ${({ align }) => align ?? 'left'};

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &::-webkit-inner-spin-button {
    appearance: none;
  }
`;

const Select = styled.select<SelectProps>`
  width: ${({ width }) => width ?? '100%'};
  height: 32px;
  padding: 0 12px;
  ${({ theme }) => theme.typo.b1};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.grey.g90};
  display: inline-flex;
  align-items: center;
`;

export default {
  SettlementStatement,
  SettlementStatementForm,
  SettlementStatementFooter,
  SettlementStatementPreviewContainer,
  PreviewMessage,
  TextFieldRow,
  TextField,
  Select,
};
