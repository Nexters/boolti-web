import Portal from '../Portal';
import Styled from './Alert.styles';

interface ConfirmProps {
  children: React.ReactNode;
  confirmText?: string;
  confirmButtonColorTheme?: 'primary' | 'neutral';
  onConfirm?: () => void;
}

const Alert = ({ children, confirmText, confirmButtonColorTheme, onConfirm }: ConfirmProps) => {
  return (
    <Portal>
      <Styled.DimmedArea>
        <Styled.Alert>
          <Styled.AlertMessage>{children}</Styled.AlertMessage>
          <Styled.ConfirmButtonContainer>
            <Styled.ConfirmButton
              type="button"
              colorTheme={confirmButtonColorTheme}
              onClick={onConfirm}
            >
              {confirmText ?? '확인'}
            </Styled.ConfirmButton>
          </Styled.ConfirmButtonContainer>
        </Styled.Alert>
      </Styled.DimmedArea>
    </Portal>
  );
};

export default Alert;
