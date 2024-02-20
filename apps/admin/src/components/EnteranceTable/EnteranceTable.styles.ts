import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 16px 0;
  height: 547px;
`;

const Header = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: 8px;
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
    width: 108px;
  }
  &:nth-of-type(2) {
    width: 80px;
  }
  &:nth-of-type(3) {
    width: 180px;
  }
  &:nth-of-type(4) {
    width: 100px;
  }
  &:nth-of-type(5) {
    width: 140px;
  }
  &:nth-of-type(6) {
    width: 80px;
  }
  &:nth-of-type(7) {
    width: 148px;
  }
`;

const Body = styled.div`
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
  &:not(:last-of-type) {
    margin-right: 12px;
  }
  &:nth-of-type(1) {
    width: 108px;
  }
  &:nth-of-type(2) {
    width: 80px;
  }
  &:nth-of-type(3) {
    width: 180px;
  }
  &:nth-of-type(4) {
    width: 100px;
  }
  &:nth-of-type(5) {
    width: 140px;
  }
  &:nth-of-type(6) {
    width: 80px;
  }
  &:nth-of-type(7) {
    width: 148px;
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

export default {
  Container,
  Header,
  HeaderItem,
  HeaderRow,
  Body,
  Row,
  Item,
  Empty,
  ResetButton,
};
