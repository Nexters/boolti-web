import styled from '@emotion/styled';

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 20px 24px 36px;
  background: ${({ theme }) => theme.palette.mobile.grey.g85};
`;

const Title = styled.h1`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  margin-bottom: 12px;
`;

const Table = styled.table`
  width: 100%;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};

  td {
    color: ${({ theme }) => theme.palette.mobile.grey.g30};
  }

  th,
  td {
    vertical-align: middle;
    white-space: pre-wrap;
    padding: 4px 8px;
    border: 1px solid ${({ theme }) => theme.palette.mobile.grey.g70};
  }
`;

const TableHead = styled.thead``;

const Tablebody = styled.tbody``;

const Description = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  &:first-of-type {
    margin-top: 16px;
  }
  &:not(:first-of-type) {
    margin-top: 4px;
  }
`;

export default {
  Container,
  Title,
  Table,
  TableHead,
  Tablebody,
  Description,
};
