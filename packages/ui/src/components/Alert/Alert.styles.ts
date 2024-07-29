import styled from '@emotion/styled';

import { mq_lg } from '../../systems';

const ALERT_WIDTH = '450px';
const ALERT_MOBILE_WIDTH = '264px';

interface ConfirmButtonProps {
  colorTheme?: 'primary' | 'neutral';
}

const DimmedArea = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.palette.dim.dialog};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Alert = styled.div`
  width: ${ALERT_MOBILE_WIDTH};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 20px;

  ${mq_lg} {
    width: ${ALERT_WIDTH};
    padding: 32px;
  }
`;

const AlertMessage = styled.div`
  word-break: keep-all;
  text-align: center;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 24px;

  ${mq_lg} {
    word-break: break-all;
    text-align: left;
    ${({ theme }) => theme.typo.b3};
    margin-bottom: 32px;
  }
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  ${mq_lg} {
    justify-content: flex-end;
  }
`;

const ConfirmButton = styled.button<ConfirmButtonProps>`
  flex: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  border-radius: 4px;
  background-color: ${({ theme, colorTheme }) => {
    if (colorTheme === 'neutral') return theme.palette.grey.g90;

    return theme.palette.primary.o1;
  }};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;

  ${mq_lg} {
    flex: initial;
  }
`;

export default {
  DimmedArea,
  Alert,
  AlertMessage,
  ConfirmButtonContainer,
  ConfirmButton,
};
