import Portal from '../Portal';
import { DialogProps } from './types';
import Styled from './Dialog.styles';

type DialogBaseProps = Pick<DialogProps, 'onClose' | 'children'>

const DialogBase: React.FC<DialogBaseProps> = ({ children, onClose }) => {
  return (
    <Portal>
      <Styled.DimmedArea
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose?.();
          }
        }}
      >
        {children}
      </Styled.DimmedArea>
    </Portal>
  )
}

export default DialogBase
