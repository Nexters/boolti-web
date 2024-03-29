import styled from '@emotion/styled';

import { mq } from '../../systems/breakpoint';
import TextField from '../TextField';

const Container = styled.div<{ open: boolean }>`
  position: relative;
`;

const TextContainer = styled.div``;

const Text = styled(TextField)`
  cursor: pointer;
  pointer-events: none;
`;

const Control = styled.div`
  position: fixed;
  width: 100vw !important;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 12px 12px 0px 0px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 15px 0px ${({ theme }) => theme.palette.shadow};
  display: flex;
  flex-direction: column;
  ${mq} {
    width: auto !important;
    position: absolute;
    border-radius: 4px;
    transform: translateY(calc(100% + 4px));
  }
`;

const ListContainer = styled.div`
  display: flex;
  padding: 22px 20px 24px;
  ${mq} {
    padding: 16px 16px 20px 16px;
  }
`;

const List = styled.div<{ hasPadding?: boolean }>`
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
  ${mq} {
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
  ${mq} {
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
};
