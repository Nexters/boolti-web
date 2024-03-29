import Styled, { ButtonProps } from './TextButton.styles';

interface Props extends React.ComponentProps<'button'>, ButtonProps {
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ children, icon, ...rest }: Props) => {
  return (
    <Styled.Container {...rest}>
      {icon && <Styled.Icon>{icon}</Styled.Icon>}
      {children}
    </Styled.Container>
  );
};

export default Button;
