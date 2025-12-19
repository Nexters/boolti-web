import Portal from '../Portal';
import { DialogProps } from './types';
import Styled from './Dialog.styles';

type DialogBaseProps = Pick<DialogProps, 'children' | 'mobileType' | 'isBackdropClosable' | 'onClose'>;

const DialogBase: React.FC<DialogBaseProps> = ({ mobileType, isBackdropClosable = true, children, onClose }) => {
  return (
    <Portal>
      <Styled.DimmedArea
        mobileType={mobileType}
        onClick={(event) => {
          if (event.target === event.currentTarget && isBackdropClosable) {
            onClose?.();
          }
        }}
      >
        {children}
      </Styled.DimmedArea>
    </Portal>
  );
};

export default DialogBase;
