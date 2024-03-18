import { CloseIcon } from '@boolti/icon';

import Portal from '../Portal';
import Styled from './Dialog.styles';

interface DialogProps {
  open: boolean;
  children: React.ReactNode;
  isAuto?: boolean;
  width?: string;
  title?: string;
  onClose?: () => void;
}

const Dialog = ({ open, isAuto = false, children, title, onClose, width }: DialogProps) => {
  if (!open) return null;

  return (
    <Portal>
      <Styled.DimmedArea>
        <Styled.Dialog className="dialog" isAuto={isAuto} width={width}>
          <Styled.DialogHeader>
            <Styled.DialogTitle>{title}</Styled.DialogTitle>
            <Styled.DialogCloseButton aria-label="닫기" onClick={onClose}>
              <CloseIcon />
            </Styled.DialogCloseButton>
          </Styled.DialogHeader>
          <Styled.DialogContent className="dialog__content">{children}</Styled.DialogContent>
        </Styled.Dialog>
      </Styled.DimmedArea>
    </Portal>
  );
};

export default Dialog;
