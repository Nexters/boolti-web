import { ChevronLeftIcon, CloseIcon } from '@boolti/icon';
import { useState, useRef, useCallback } from 'react';

import { DialogContentProps } from './types';
import Styled from './Dialog.styles';

const DialogContent: React.FC<DialogContentProps> = ({
  title,
  isAuto = false,
  width,
  mobileType = 'bottomSheet',
  contentPadding,
  children,
  onClose,
  onClickBackButton
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (mobileType !== 'darkBottomSheet') return;
    setDragStartY(event.touches[0].clientY);
    setIsDragging(true);
  }, [mobileType]);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (dragStartY === null || !dialogRef.current || mobileType !== 'darkBottomSheet') return;

    const currentY = event.touches[0].clientY;
    const diff = currentY - dragStartY;

    // 아래로 드래그할 때만 움직임 허용
    if (diff >= 0) {
      setCurrentTranslate(diff);
      dialogRef.current.style.transform = `translateY(${diff}px)`;
    }
  }, [dragStartY, mobileType]);

  const handleTouchEnd = useCallback(() => {
    if (!dialogRef.current || mobileType !== 'darkBottomSheet') return;

    setIsDragging(false);

    // 100px 이상 드래그하면 닫기
    if (currentTranslate > 100 && onClose) {
      onClose();
    } else {
      // 위치 복원
      dialogRef.current.style.transform = 'translateY(0)';
      setCurrentTranslate(0);
    }

    setDragStartY(null);
  }, [currentTranslate, mobileType, onClose]);

  return (
    <Styled.Dialog
      ref={dialogRef}
      className="dialog"
      isAuto={isAuto}
      width={width}
      mobileType={mobileType}
      style={{ transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
    >
      {mobileType === 'darkBottomSheet' && (
        <Styled.DialogHandleContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Styled.DialogHandle />
        </Styled.DialogHandleContainer>
      )}
      {title && onClose && (
        <Styled.DialogHeader mobileType={mobileType}>
          <Styled.DialogTitleContainer>
            {onClickBackButton && (
              <Styled.DialogBackButton aria-label="뒤로 가기" type="button" mobileType={mobileType} onClick={onClickBackButton}>
                <ChevronLeftIcon />
              </Styled.DialogBackButton>
            )}
            {title && <Styled.DialogTitle>{title}</Styled.DialogTitle>}
          </Styled.DialogTitleContainer>
          <Styled.DialogCloseButton aria-label="닫기" onClick={onClose} mobileType={mobileType}>
            <CloseIcon />
          </Styled.DialogCloseButton>
        </Styled.DialogHeader>
      )}
      <Styled.DialogContent className="dialog__content" padding={contentPadding}>
        {children}
      </Styled.DialogContent>
    </Styled.Dialog>
  )
}

export default DialogContent;
