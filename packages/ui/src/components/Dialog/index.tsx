import Portal from '../Portal';
import { CloseIcon } from '@boolti/icon';
import Styled from './Dialog.styles';

interface DialogProps {
  open: boolean;
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

const Dialog = ({ open, children, title, onClose }: DialogProps) => {
  if (!open) return null;

  return (
    <Portal>
      <Styled.DimmedArea>
        <Styled.Dialog>
          <Styled.DialogHeader>
            <Styled.DialogTitle>{title}</Styled.DialogTitle>
            <Styled.DialogCloseButton aria-label="닫기" onClick={onClose}>
              <CloseIcon />
            </Styled.DialogCloseButton>
          </Styled.DialogHeader>
          <Styled.DialogContent>{children}</Styled.DialogContent>
        </Styled.Dialog>
      </Styled.DimmedArea>
    </Portal>
  );
};

export default Dialog;
