import styled from '@emotion/styled';

const Button = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g80};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const ConfirmText = styled.span`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const ConfirmDescription = styled.span`
  display: block;
  margin-top: 8px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export default {
  Button,
  ConfirmText,
  ConfirmDescription,
};
