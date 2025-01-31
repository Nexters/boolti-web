import Styled, { ButtonProps } from './Button.styles';

type Props = React.ComponentProps<'button'> & ButtonProps;

const Button = ({ children, colorTheme, size, icon, ...rest }: Props) => {
  const hasChildren = !!children

  return (
    <Styled.Container colorTheme={colorTheme} size={size} {...rest}>
      {icon && <Styled.Icon size={size} hasChildren={hasChildren}>{icon}</Styled.Icon>}
      {children}
    </Styled.Container>
  );
};

export default Button;
