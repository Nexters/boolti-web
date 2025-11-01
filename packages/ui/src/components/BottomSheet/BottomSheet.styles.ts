import styled from '@emotion/styled';
import { animated } from '@react-spring/web';

const DimmedArea = styled(animated.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: flex-end;
`;

const BottomSheet = styled(animated.div)`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.palette.grey.g60};
  border-radius: 2px;
  margin: 12px auto 8px;
  cursor: grab;
  touch-action: none;
  user-select: none;
`;

const BottomSheetContent = styled.div`
  padding: 16px 20px 32px;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 20px 0;
  background: none;
  border: none;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  text-align: left;
  cursor: pointer;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.7;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g80};
  }
`;

export default {
  DimmedArea,
  BottomSheet,
  Handle,
  BottomSheetContent,
  MenuItem,
};
