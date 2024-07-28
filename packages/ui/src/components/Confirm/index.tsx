import Portal from '../Portal';
import Styled from './Confirm.styles';

interface ConfirmProps {
  children: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColorTheme?: 'primary' | 'neutral';
  onCancel?: () => void;
  onConfirm?: () => void;
  type?: 'confirm' | 'alert';
}

const Confirm = ({
  children,
  cancelText,
  confirmText,
  confirmButtonColorTheme,
  onCancel,
  onConfirm,
  type = 'confirm',
}: ConfirmProps) => {
  return (
    <Portal>
      <Styled.DimmedArea>
        <Styled.Confirm>
          <Styled.ConfirmMessage>{children}</Styled.ConfirmMessage>
          <Styled.ConfirmButtonContainer>
            {type === 'confirm' && (
              <Styled.CancelButton type="button" onClick={onCancel}>
                {cancelText ?? '취소'}
              </Styled.CancelButton>
            )}
            <Styled.ConfirmButton
              type="button"
              colorTheme={confirmButtonColorTheme}
              onClick={onConfirm}
            >
              {confirmText ?? '확인'}
            </Styled.ConfirmButton>
          </Styled.ConfirmButtonContainer>
        </Styled.Confirm>
      </Styled.DimmedArea>
    </Portal>
  );
};

export default Confirm;
