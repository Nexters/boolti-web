import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.table`
  table-layout: auto;
  margin: 16px 0;
  width: ${({ theme }) => theme.breakpoint.desktop};
  height: 547px;
`;

const HeaderRow = styled.tr`
  width: 100%;
  padding-left: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const HeaderItem = styled.th`
  white-space: nowrap;
  text-align: left;
  padding: 12px;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  &:last-child {
    width: 100% !important;
  }
`;

const Row = styled.tr`
  width: 100%;
  padding-left: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const Item = styled.td`
  padding: 14px;
  text-align: left;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  & strong {
    background-color: ${({ theme }) => theme.palette.primary.o0};
  }
`;

const Empty = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const ResetButton = styled(Button)`
  display: block;
  margin-top: 18px;
`;

const DisabledText = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g30};
`;

const SearchResult = styled.span`
  white-space: nowrap;
  overflow: hidden;
`;

export default {
  Container,
  HeaderItem,
  HeaderRow,
  Row,
  Item,
  Empty,
  ResetButton,
  DisabledText,
  SearchResult,
};
