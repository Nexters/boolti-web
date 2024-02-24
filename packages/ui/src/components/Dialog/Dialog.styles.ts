import styled from '@emotion/styled';

import { mq } from '../../systems';

const DIALOG_WIDTH = '450px';

const DimmedArea = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  ${mq} {
    padding: 0 20px;
  }
`;

const Dialog = styled.div<{ isAuto: boolean }>`
  width: ${({ isAuto }) => (isAuto ? 'auto' : DIALOG_WIDTH)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
`;

const DialogHeader = styled.div`
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g30};
  position: relative;
`;

const DialogTitle = styled.h2`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const DialogCloseButton = styled.button`
  position: absolute;
  top: 17px;
  right: 32px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DialogContent = styled.div`
  padding: 32px;
`;

export default {
  DimmedArea,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
  DialogContent,
};
