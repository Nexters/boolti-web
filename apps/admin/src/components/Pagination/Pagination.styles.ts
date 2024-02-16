import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin: 16px 0;
  height: 547px;
`;

const Button = styled.button<{ isCurrent?: boolean }>`
  cursor: ${({ isCurrent }) => (isCurrent ? 'unset' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  ${({ theme }) => theme.typo.c1};
  background-color: ${({ isCurrent, theme }) => (isCurrent ? theme.palette.grey.g90 : 'none')};
  color: ${({ isCurrent, theme }) => (isCurrent ? theme.palette.grey.w : theme.palette.grey.g90)};
  &:not(:last-of-type) {
    margin-right: 8px;
  }
  &:disabled {
    cursor: unset;
    color: ${({ theme }) => theme.palette.grey.g20};
  }
`;

export default {
  Container,
  Button,
};
