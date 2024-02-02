import Button from '../Button';
import Styled, { TextFieldProps } from './TextField.styles';

type Props = React.ComponentProps<'input'> & TextFieldProps;

const TextField = ({ disabled, size, type, buttonProps, ...rest }: Props) => {
  return (
    <Styled.Container disabled={disabled} size={size} type={type}>
      <Styled.Input disabled={disabled} {...rest} />
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
