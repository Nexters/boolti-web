import Styled from './TextButton.style';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
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
