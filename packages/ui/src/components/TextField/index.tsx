import { CalendarIcon } from '@boolti/icon';
import { nanoid } from 'nanoid';
import Button from '../Button';
import Styled, { TextFieldProps } from './TextField.styles';
import { useRef } from 'react';

type Props = React.ComponentProps<'input'> & TextFieldProps;

const TextField = ({ disabled, size, type, buttonProps, placeholder, id, ...rest }: Props) => {
  const uuid = useRef<string>(id ?? nanoid(6));
  return (
    <Styled.Container disabled={disabled} size={size} type={type}>
      <Styled.InputContainer>
        {type === 'file' && (
          <Styled.FileInputLabel for={uuid}>{rest.value ?? placeholder}</Styled.FileInputLabel>
        )}
        <Styled.Input
          id={uuid}
          data-placeholder={placeholder}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          {...rest}
        />
        {type === 'date' && <CalendarIcon size={20} />}
      </Styled.InputContainer>
      {buttonProps && (
        <Styled.ButtonContainer>
          <Button disabled={disabled} size="bold" colorTheme="netural">
            {buttonProps.children}
          </Button>
        </Styled.ButtonContainer>
      )}
    </Styled.Container>
  );
};

export default TextField;
