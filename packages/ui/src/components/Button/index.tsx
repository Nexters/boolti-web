import Styled, { ButtonProps } from './Button.style';

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

function Button({ children, colorTheme, size, ...rest }: Props) {
  return (
    <Styled.Container colorTheme={colorTheme} size={size} {...rest}>
      {children}
    </Styled.Container>
  );
}

export default Button;
