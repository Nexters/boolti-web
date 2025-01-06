import { ChevronLeftIcon, CloseIcon } from '@boolti/icon';

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
  return (
    <Styled.Dialog className="dialog" isAuto={isAuto} width={width} mobileType={mobileType}>
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
