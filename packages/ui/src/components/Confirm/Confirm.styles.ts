import styled from '@emotion/styled';

import { mq } from '../../systems';

const CONFIRM_WIDTH = '450px';
const CONFIRM_MOBILE_WIDTH = '264px';

const DimmedArea = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Confirm = styled.div`
  width: ${CONFIRM_MOBILE_WIDTH};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 20px;

  ${mq} {
    width: ${CONFIRM_WIDTH};
    padding: 32px;
  }
`;

const ConfirmMessage = styled.p`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 24px;

  ${mq} {
    ${({ theme }) => theme.typo.b3};
    margin-bottom: 32px;
  }
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  ${mq} {
    justify-content: flex-end;
  }
`;

const CancelButton = styled.button`
  flex: 1;
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
  cursor: pointer;

  ${mq} {
    flex: initial;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
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

  ${mq} {
    flex: initial;
  }
`;

export default {
  DimmedArea,
  Confirm,
  ConfirmMessage,
  ConfirmButtonContainer,
  CancelButton,
  ConfirmButton,
};
