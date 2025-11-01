import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { to, useSpring, useTransition } from '@react-spring/web';

import Portal from '../Portal';
import Styled from './BottomSheet.styles';

const DRAG_CLOSE_THRESHOLD = 120;

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

interface BottomSheetMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
  const transition = useTransition(open, {
    from: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 100, opacity: 0 },
    config: { tension: 300, friction: 30 },
  });

  const dragStartYRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStyles, dragApi] = useSpring(() => ({ offset: 0 }));

  useEffect(() => {
    if (!open) {
      dragApi.start({ offset: 0, immediate: true });
      dragDistanceRef.current = 0;
      setIsDragging(false);
      return;
    }

    dragApi.start({ offset: 0, immediate: true });
    dragDistanceRef.current = 0;
    setIsDragging(false);
  }, [open, dragApi]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      dragStartYRef.current = event.clientY;
      dragDistanceRef.current = 0;
      setIsDragging(true);
      dragApi.start({ offset: 0, immediate: true });
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [dragApi],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const delta = Math.max(event.clientY - dragStartYRef.current, 0);
      dragDistanceRef.current = delta;
      dragApi.start({ offset: delta, immediate: true });
    },
    [dragApi, isDragging],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      event.currentTarget.releasePointerCapture(event.pointerId);
      setIsDragging(false);

      const shouldClose = dragDistanceRef.current > DRAG_CLOSE_THRESHOLD;
      if (shouldClose) {
        onClose();
      } else {
        dragApi.start({ offset: 0, immediate: false, config: { tension: 300, friction: 30 } });
      }

      dragDistanceRef.current = 0;
    },
    [dragApi, isDragging, onClose],
  );

  return (
    <Portal>
      {transition((styles, open) => {
        if (!open) return null;

        return (
          <Styled.DimmedArea onClick={onClose} style={{ opacity: styles.opacity }}>
            <Styled.BottomSheet
              style={{
                transform: to(
                  [styles.y, dragStyles.offset],
                  (value, offset) => `translateY(calc(${value}% + ${Math.max(offset, 0)}px))`,
                ),
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Styled.Handle
                role="button"
                aria-label="Bottom sheet handle"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
              />
              <Styled.BottomSheetContent>{children}</Styled.BottomSheetContent>
            </Styled.BottomSheet>
          </Styled.DimmedArea>
        );
      })}
    </Portal>
  );
};

export const MenuItem = ({ onClick, children }: BottomSheetMenuItemProps) => {
  return <Styled.MenuItem onClick={onClick}>{children}</Styled.MenuItem>;
};

BottomSheet.MenuItem = MenuItem;

export default BottomSheet;
