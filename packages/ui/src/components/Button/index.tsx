import Styled, { ButtonProps } from './Button.style';

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

function Button({ children, ...rest }: Props) {
  return <Styled.Container {...rest}>{children}</Styled.Container>;
}

export default Button;
