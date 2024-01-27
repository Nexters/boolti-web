import Styled from './Button.style';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /** */
}

function Button({ children, ...rest }: Props) {
  return <Styled.Container {...rest}>{children}</Styled.Container>;
}

export default Button;
