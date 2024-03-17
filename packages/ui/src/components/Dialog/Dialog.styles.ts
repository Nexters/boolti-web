import styled from '@emotion/styled';

import { mq } from '../../systems';

const DIALOG_WIDTH = '450px';

const DimmedArea = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  z-index: 999;

  ${mq} {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Dialog = styled.div<{ isAuto: boolean }>`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  position: fixed;
  bottom: 0;
  left: 0;

  ${mq} {
    width: ${({ isAuto }) => (isAuto ? 'auto' : DIALOG_WIDTH)};
    position: initial;
    bottom: auto;
    left: auto;
  }
`;

const DialogHeader = styled.div`
  padding: 16px 24px 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq} {
    padding: 16px 32px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g30};
  }
`;

const DialogTitle = styled.h2`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};

  ${mq} {
    ${({ theme }) => theme.typo.sh2};
  }
`;

const DialogCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 24px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${mq} {
    top: 17px;
    right: 32px;
  }
`;

const DialogContent = styled.div`
  padding: 0 24px;

  ${mq} {
    padding: 32px;
  }
`;

export default {
  DimmedArea,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
  DialogContent,
};
