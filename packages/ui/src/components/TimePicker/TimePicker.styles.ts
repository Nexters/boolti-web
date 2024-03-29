import styled from '@emotion/styled';

import TextField from '../TextField';

const Container = styled.div<{ open: boolean }>`
  position: relative;
`;

const Text = styled(TextField)`
  cursor: pointer;
  pointer-events: none;
`;

const Control = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(calc(100% + 4px));
  border-radius: 4px;
  padding: 16px 16px 20px 16px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 15px 0px ${({ theme }) => theme.palette.shadow};
  display: flex;
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
  width: 56px;
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
`;

export default { Container, Text, Control, List, Item };
