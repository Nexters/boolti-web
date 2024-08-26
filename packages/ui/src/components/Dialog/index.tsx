import { CloseIcon } from '@boolti/icon';

import Portal from '../Portal';
import Styled from './Dialog.styles';

interface DialogProps {
  open: boolean;
  children: React.ReactNode;
  isAuto?: boolean;
  width?: string;
  title?: string;
  contentPadding?: string;
  mobileType?: 'bottomSheet' | 'fullPage' | 'centerPopup';
  onClose?: () => void;
}

const Dialog = ({
  open,
  children,
  isAuto = false,
  width,
  title,
  contentPadding,
  mobileType = 'bottomSheet',
  onClose,
}: DialogProps) => {
  if (!open) return null;

  return (
    <Portal>
      <Styled.DimmedArea>
        <Styled.Dialog className="dialog" isAuto={isAuto} width={width} mobileType={mobileType}>
          {title && onClose && (
            <Styled.DialogHeader mobileType={mobileType}>
              {title && <Styled.DialogTitle>{title}</Styled.DialogTitle>}
              <Styled.DialogCloseButton aria-label="닫기" onClick={onClose} mobileType={mobileType}>
                <CloseIcon />
              </Styled.DialogCloseButton>
            </Styled.DialogHeader>
          )}
          <Styled.DialogContent className="dialog__content" padding={contentPadding}>
            {children}
          </Styled.DialogContent>
        </Styled.Dialog>
      </Styled.DimmedArea>
    </Portal>
  );
};

export default Dialog;
