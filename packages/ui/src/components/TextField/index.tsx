import { CalendarIcon } from '@boolti/icon';
import Button from '../Button';
import Styled, { TextFieldProps } from './TextField.styles';

type Props = React.ComponentProps<'input'> & TextFieldProps;

const TextField = ({ disabled, size, type, buttonProps, placeholder, ...rest }: Props) => {
  return (
    <Styled.Container disabled={disabled} size={size} type={type}>
      <Styled.InputContainer>
        <Styled.Input
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
