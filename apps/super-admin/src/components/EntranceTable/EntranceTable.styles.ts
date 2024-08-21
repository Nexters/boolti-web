import styled from '@emotion/styled';

interface TableItemProps {
  align?: 'left' | 'center' | 'right';
  minWidth?: number;
}

interface EntranceStateTextProps {
  complete: boolean;
}

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 16px;
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

const EntranceStateText = styled.p<EntranceStateTextProps>`
  color: ${({ complete, theme }) =>
    complete ? theme.palette.status.success : theme.palette.status.error};
`;

const ConfirmText = styled.p`
  ${({ theme }) => theme.typo.b3};
`;

const ConfirmTextTitle = styled.strong`
  ${({ theme }) => theme.typo.sh1};
`;

export default {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableHeaderItem,
  TableRow,
  TableItem,
  EntranceStateText,
  ConfirmText,
  ConfirmTextTitle,
};
