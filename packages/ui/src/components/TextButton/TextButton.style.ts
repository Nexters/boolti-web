import styled from '@emotion/styled';

const Container = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 44px;
  padding: 11px 18px;
  border: none;
  background-color: transparent;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.sh1};
  &:disabled {
    cursor: unset;
  }
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.palette.grey.g20};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.grey.g60};
  }
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export default {
  Container,
  Icon,
};
