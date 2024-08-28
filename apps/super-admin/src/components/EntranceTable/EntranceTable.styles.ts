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

const Table = styled.div`
  border-collapse: collapse;
  min-width: 972px;
  width: 100%;
  max-height: 567px;
`;

const TableHead = styled.div``;

const TableBody = styled.div``;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const TableHeaderItem = styled.div<TableItemProps>`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  padding: 12px 20px;
  text-align: ${({ align }) => align ?? 'left'};
  white-space: nowrap;
  min-width: ${({ minWidth }) => minWidth ?? 0}px;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const TableItem = styled.div<TableItemProps>`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  padding: 14px 20px;
  text-align: ${({ align }) => align ?? 'left'};
  white-space: nowrap;
  min-width: ${({ minWidth }) => minWidth ?? 0}px;
`;

const EntranceStateText = styled.p<EntranceStateTextProps>`
  color: ${({ complete, theme }) =>
    complete ? theme.palette.status.success : theme.palette.status.error};
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  padding: 100px 0;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
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
  Empty,
};
