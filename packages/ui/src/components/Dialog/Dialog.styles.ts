import styled from '@emotion/styled';

import { mq_lg } from '../../systems';

interface DialogContentProps {
  padding?: string;
}

const DIALOG_WIDTH = '450px';

const DimmedArea = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  z-index: 999;

  ${mq_lg} {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Dialog = styled.div<{
  isAuto: boolean;
  width?: string;
  mobileType: 'bottomSheet' | 'fullPage' | 'centerPopup';
}>`
  background-color: ${({ theme }) => theme.palette.grey.w};
  width: 100%;
  border-radius: 8px;

  ${({ mobileType }) =>
    mobileType === 'bottomSheet' &&
    `
    position: fixed;
    bottom: 0;
    left: 0;
  `}

  ${({ mobileType }) =>
    mobileType === 'fullPage' &&
    `
    border-radius: 0;
    position: fixed;
    top: 0;
    left: 0;
  `}

  ${({ mobileType }) =>
    mobileType === 'centerPopup' &&
    `
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  `}

  ${mq_lg} {
    border-radius: 8px;
    width: ${({ isAuto, width }) => (isAuto ? 'auto' : width ?? DIALOG_WIDTH)};
    position: initial;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
    transform: none;
  }
`;

const DialogHeader = styled.div<{ mobileType: 'bottomSheet' | 'fullPage' | 'centerPopup' }>`
  position: relative;
  display: flex;
  align-items: center;

  ${({ mobileType }) =>
    mobileType === 'bottomSheet' &&
    `
    padding: 16px 24px 8px;
    justify-content: space-between;
  `}

  ${({ theme, mobileType }) =>
    mobileType === 'fullPage' &&
    `
    height: 64px;
    justify-content: center;
    border-bottom: 1px solid ${theme.palette.grey.g10};
  `}

  ${mq_lg} {
    padding: 16px 32px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g30};
  }
`;

const DialogTitle = styled.h2`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};

  ${mq_lg} {
    ${({ theme }) => theme.typo.sh2};
  }
`;

const DialogCloseButton = styled.button<{ mobileType: 'bottomSheet' | 'fullPage' | 'centerPopup' }>`
  position: absolute;
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.grey.g70};

  svg {
    width: 24px;
    height: 24px;
  }

  ${({ mobileType }) =>
    mobileType === 'bottomSheet' &&
    `
    top: 16px;
    right: 24px;
  `}

  ${({ mobileType }) =>
    mobileType === 'fullPage' &&
    `
    top: 20px;
    left: 20px;
  `}

  ${mq_lg} {
    top: 17px;
    right: 32px;
  }
`;

const DialogContent = styled.div<DialogContentProps>`
  padding: 0 24px;
  overflow-y: auto;

  ${mq_lg} {
    padding: ${({ padding }) => padding ?? '32px'};
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
