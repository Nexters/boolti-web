import styled from '@emotion/styled';

const CONFIRM_WIDTH = '450px';

const DimmedArea = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Confirm = styled.div`
  width: ${CONFIRM_WIDTH};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 32px;
`;

const ConfirmMessage = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 32px;
`;

const ConfirmButtonContainer = styled.div`
  text-align: right;
`;

const CancelButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  background-color: ${({ theme }) => theme.palette.grey.w};
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.sh1};
  margin-right: 8px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;
`;

export default {
  DimmedArea,
  Confirm,
  ConfirmMessage,
  ConfirmButtonContainer,
  CancelButton,
  ConfirmButton,
};
