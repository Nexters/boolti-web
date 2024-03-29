import Styled, { BadgeProps } from './Badge.styles';

const Badge = ({ colorTheme, children }: React.PropsWithChildren<BadgeProps>) => {
  return <Styled.Container colorTheme={colorTheme}>{children}</Styled.Container>;
};

export default Badge;
