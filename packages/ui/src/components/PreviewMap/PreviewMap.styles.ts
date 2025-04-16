import styled from '@emotion/styled';

const Button = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g80};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

export default {
  Button,
};
