import styled from '@emotion/styled';

interface ProgressItemProps {
  active?: boolean;
}

interface TableItemProps {
  align?: 'left' | 'center' | 'right';
  minWidth?: number;
}

const SettlementPage = styled.div`
  padding: 26px 44px 56px;
`;

const Breadcrumb = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const PageHeader = styled.header`
  margin-top: 24px;
`;

const PageTitle = styled.h2`
  ${({ theme }) => theme.typo.h2};
  margin-bottom: 6px;
`;

const PageDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const SectionDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 52px 0;
`;

const Section = styled.section`
  margin: 52px 0;

  button {
    gap: 8px;
  }
`;

const SectionTitle = styled.h3`
  ${({ theme }) => theme.typo.h1};
  margin-bottom: 16px;
`;

const Progress = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const ProgressItem = styled.li<ProgressItemProps>`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -36px;
    left: 12px;
    background-color: ${({ theme, active }) =>
      active ? theme.palette.primary.o1 : theme.palette.grey.g20};
    width: 1px;
    height: 30px;
  }

  &:last-of-type::before {
    display: none;
  }
`;

const ProgressItemNumber = styled.span<ProgressItemProps>`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme, active }) => (active ? theme.palette.grey.w : theme.palette.grey.g40)};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.primary.o1 : theme.palette.grey.g20};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressItemTitle = styled.span<ProgressItemProps>`
  ${({ theme, active }) => (active ? theme.typo.sh1 : theme.typo.b2)};
  color: ${({ theme, active }) => (active ? theme.palette.grey.b : theme.palette.grey.g40)};
`;

const ProgressItemDescription = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const UserInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserInfoTitle = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const UserInfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserInfoLink = styled.a`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.grey.g90};
    font-weight: 600;
    text-decoration: underline;
  }
`;

const UserInfoText = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableHeader = styled.tr`
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const TableHeaderItem = styled.th<TableItemProps>`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  padding: 12px 20px;
  text-align: ${({ align }) => align ?? 'left'};
  white-space: nowrap;
  min-width: ${({ minWidth }) => minWidth ?? 0}px;

  &:last-of-type {
    width: 100%;
    padding: 0;
  }
`;

const TableRow = styled.tr``;

const TableItem = styled.td<TableItemProps>`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  padding: 14px 20px;
  text-align: ${({ align }) => align ?? 'left'};
  white-space: nowrap;
  min-width: ${({ minWidth }) => minWidth ?? 0}px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};

  &:last-of-type {
    width: 100%;
    padding: 0;
  }
`;

const SettlementStatement = styled.div`
  width: 920px;
  height: 600px;
  overflow-y: auto;
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
    margin-bottom: 4px;
  }

  .header-section-row h3 {
    width: 120px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin: 0 12px 0 0;
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
  }

  .middle-section .table-sub-row .row {
    width: 100%;
  }

  .middle-section .table-sub-row h3,
  .middle-section .table-sub-row span {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #6f7485;
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

const SettlementStatementFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`;

export default {
  SettlementPage,
  Breadcrumb,
  PageHeader,
  PageTitle,
  PageDescription,
  SectionDivider,
  Section,
  SectionTitle,
  Progress,
  ProgressItem,
  ProgressItemNumber,
  ProgressItemTitle,
  ProgressItemDescription,
  UserInfo,
  UserInfoItem,
  UserInfoTitle,
  UserInfoContent,
  UserInfoLink,
  UserInfoText,
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableHeaderItem,
  TableRow,
  TableItem,
  SettlementStatement,
  SettlementStatementFooter,
};
