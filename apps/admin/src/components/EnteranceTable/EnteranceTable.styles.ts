import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  width: ${({ theme }) => theme.breakpoint.desktop};
  height: 547px;
`;

const HeaderRow = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  padding-left: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const HeaderItem = styled.span`
  display: block;
  flex: 0 0 auto;
  text-align: left;
  padding: 12px;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  &:not(:last-of-type) {
    margin-right: 12px;
  }
  &:nth-of-type(1) {
    width: 130px;
  }
  &:nth-of-type(2) {
    width: 100px;
  }
  &:nth-of-type(3) {
    width: 140px;
  }
  &:nth-of-type(4) {
    width: 80px;
  }
  &:nth-of-type(5) {
    width: 140px;
  }
  &:nth-of-type(6) {
    width: 180px;
    flex: 1 0 auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const Item = styled.span`
  display: block;
  flex: 0 0 auto;
  padding: 14px 12px;
  text-align: left;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  & strong {
    background-color: ${({ theme }) => theme.palette.primary.o0};
  }
  &:not(:last-of-type) {
    margin-right: 12px;
  }
  &:nth-of-type(1) {
    width: 130px;
  }
  &:nth-of-type(2) {
    width: 100px;
  }
  &:nth-of-type(3) {
    width: 140px;
  }
  &:nth-of-type(4) {
    width: 80px;
  }
  &:nth-of-type(5) {
    width: 140px;
  }
  &:nth-of-type(6) {
    width: 180px;
    flex: 1 0 auto;
  }
`;

const Empty = styled.div`
  display: flex;
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
