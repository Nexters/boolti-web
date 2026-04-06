import styled from '@emotion/styled';
import { Button, mq_lg } from '@boolti/ui';
import { m } from 'framer-motion';

export const Container = styled(m.div)`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  background: rgba(40, 43, 51, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  gap: 8px;
  width: calc(100% - 40px);
  padding: 14px 16px;
  z-index: 998;
  align-items: center;

  ${mq_lg} {
    display: none;
  }
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d8dbe5;
`;

export const Text = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.white};
`;

export const ShareButton = styled(Button)`
  margin-left: auto;
  flex-shrink: 0;
`;
