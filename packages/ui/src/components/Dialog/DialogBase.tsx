import Portal from '../Portal';
import { DialogProps } from './types';
import Styled from './Dialog.styles';

type DialogBaseProps = Pick<DialogProps, 'children' | 'mobileType' | 'onClose'>

const DialogBase: React.FC<DialogBaseProps> = ({ mobileType, children, onClose }) => {
  return (
    <Portal>
      <Styled.DimmedArea
        mobileType={mobileType}
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
