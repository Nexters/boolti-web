import styled from '@emotion/styled';

import { mq_lg } from '../../systems/breakpoint';
import TextField from '../TextField';

const Container = styled.div<{ open: boolean }>`
  position: relative;
`;

const TextContainer = styled.div``;

const Text = styled(TextField)`
  cursor: pointer;
  pointer-events: none;
`;

const Dimmed = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  ${mq_lg} {
    background-color: transparent;
    position: absolute;
  }
`;

const Control = styled.div`
  position: fixed;
  width: 100vw !important;
  left: 0;
  bottom: 0;
  border-radius: 12px 12px 0px 0px;
  background: ${({ theme }) => theme.palette.grey.w};
  display: flex;
  flex-direction: column;
  ${mq_lg} {
    position: absolute;
    width: auto !important;
    border-radius: 4px;
    transform: translateY(calc(100% + 4px));
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  }
`;

const ListContainer = styled.div`
  display: flex;
  padding: 22px 20px 24px;
  ${mq_lg} {
    padding: 16px 16px 20px 16px;
  }
`;

const List = styled.div<{ hasPadding?: boolean }>`
  flex: 1;
  height: 238px;
  overflow-y: scroll;
  &:not(:last-child) {
    margin-right: 12px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: ${({ hasPadding }) => (hasPadding ? '202px' : 0)};
`;

const Item = styled.button<{ isActive?: boolean }>`
  ${({ theme }) => theme.typo.sh1};
  display: flex;
  width: 100%;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.palette.primary.o1 : theme.palette.grey.w};
  color: ${({ isActive, theme }) => (isActive ? theme.palette.grey.w : theme.palette.grey.g40)};
  cursor: ${({ isActive }) => (isActive ? 'unset' : 'pointer')};
  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.palette.primary.o1 : theme.palette.primary.o0};
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  ${mq_lg} {
    width: 56px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 8px;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
  ${mq_lg} {
    display: none;
  }
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default {
  ListContainer,
  TextContainer,
  Container,
  Text,
  Control,
  List,
  Item,
  Title,
  CloseButton,
  Dimmed,
};
