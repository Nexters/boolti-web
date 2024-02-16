import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 16px 0;
`;

const Header = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding-left: 8px;
`;

const HeaderItem = styled.span`
  display: block;
  flex: 0 0 auto;
  text-align: center;
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
    width: 180px;
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

const Body = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding-left: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const Item = styled.span`
  display: block;
  overflow: hidden;
  flex: 0 0 auto;
  padding: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
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
    width: 180px;
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

export default {
  Container,
  Header,
  HeaderItem,
  HeaderRow,
  Body,
  Row,
  Item,
};
