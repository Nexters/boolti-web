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
  display: inline-block;
  flex: 0 0 auto;
  padding: 12px;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  &:not(:last-of-type) {
    margin-right: 12px;
  }
  &:nth-of-type(1) {
    width: 88px;
  }
  &:nth-of-type(2) {
    width: 80px;
  }
  &:nth-of-type(3) {
    min-width: 100px;
  }
  &:nth-of-type(4) {
    width: 100px;
  }
  &:nth-of-type(5) {
    width: 140px;
  }
  &:nth-of-type(6) {
    width: 96px;
  }
  &:nth-of-type(7) {
    text-align: right;
    width: 92px;
  }
  &:nth-of-type(8) {
    width: 92px;
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
  white-space: nowrap;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  & strong {
    background-color: ${({ theme }) => theme.palette.primary.o0};
  }
  &:not(:last-of-type) {
    margin-right: 12px;
  }
  &:nth-of-type(1) {
    width: 88px;
  }
  &:nth-of-type(2) {
    width: 80px;
  }
  &:nth-of-type(3) {
    min-width: 100px;
  }
  &:nth-of-type(4) {
    width: 100px;
  }
  &:nth-of-type(5) {
    width: 140px;
  }
  &:nth-of-type(6) {
    width: 96px;
  }
  &:nth-of-type(7) {
    text-align: right;
    width: 92px;
  }
  &:nth-of-type(8) {
    width: 92px;
  }
  &:nth-of-type(9) {
    width: 100px;
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
  HeaderItem,
  HeaderRow,
  Row,
  Item,
  Empty,
  ResetButton,
};
