import Styled, { ButtonProps } from './Button.style';

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

const Button = ({ children, colorTheme, size, icon, ...rest }: Props) => {
  return (
    <Styled.Container colorTheme={colorTheme} size={size} {...rest}>
      {icon && <Styled.Icon>{icon}</Styled.Icon>}
      {children}
    </Styled.Container>
  );
};

export default Button;
