import { CalendarIcon } from '@boolti/icon';
import { nanoid } from 'nanoid';
import Button from '../Button';
import Styled, { TextFieldProps } from './TextField.styles';
import { useRef } from 'react';

type Props = Omit<React.ComponentProps<'input'>, 'size' | 'type'> & TextFieldProps;

const TextField = ({
  disabled,
  size,
  inputType,
  buttonProps,
  placeholder,
  id,
  errorMessage,
  ...rest
}: Props) => {
  const uuid = useRef<string>(id ?? nanoid(6));
  return (
    <Styled.Container disabled={disabled} size={size} inputType={inputType}>
      <Styled.InputContainer>
        {inputType === 'date' && (
          <Styled.InputLabel hasError={!!errorMessage} htmlFor={uuid.current}>
            {rest.value ? rest.value : placeholder}
          </Styled.InputLabel>
        )}
        {inputType === 'file' && (
          <Styled.InputLabel hasError={!!errorMessage} htmlFor={uuid.current}>
            {rest.fileName ? rest.fileName : placeholder}
          </Styled.InputLabel>
        )}
        <Styled.Input
          hasError={!!errorMessage}
          id={uuid.current}
          data-placeholder={placeholder}
          placeholder={placeholder}
          disabled={disabled}
          type={inputType}
          {...rest}
        />
        {inputType === 'date' && <CalendarIcon size={20} />}
      </Styled.InputContainer>
      {buttonProps && (
        <Styled.ButtonContainer>
          <Button {...buttonProps} disabled={disabled} size="bold" colorTheme="netural">
            {buttonProps.children}
          </Button>
        </Styled.ButtonContainer>
      )}
      {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
    </Styled.Container>
  );
};

export default TextField;
