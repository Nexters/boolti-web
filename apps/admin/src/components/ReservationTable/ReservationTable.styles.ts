import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const Header = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const HeaderRow = styled.div`
  width: 100%;
  padding-left: 8px;
`;

const HeaderItem = styled.span`
  display: inline-block;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  padding: 12px;
  &:not(:last-child) {
    margin-right: 12px;
  }
  &:nth-child(1) {
    width: 88px;
  }
  &:nth-child(2) {
    width: 80px;
  }
  &:nth-child(3) {
    width: 180px;
  }
  &:nth-child(4) {
    width: 100px;
  }
  &:nth-child(5) {
    width: 140px;
  }
  &:nth-child(6) {
    width: 96px;
  }
  &:nth-child(7) {
    text-align: right;
    width: 92px;
  }
  &:nth-child(8) {
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
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  &:not(:last-child) {
    margin-right: 12px;
  }
  &:nth-child(1) {
    width: 88px;
  }
  &:nth-child(2) {
    width: 80px;
  }
  &:nth-child(3) {
    width: 180px;
  }
  &:nth-child(4) {
    width: 100px;
  }
  &:nth-child(5) {
    width: 140px;
  }
  &:nth-child(6) {
    width: 96px;
  }
  &:nth-child(7) {
    text-align: right;
    width: 92px;
  }
  &:nth-child(8) {
    width: 92px;
  }
  &:nth-child(9) {
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
}