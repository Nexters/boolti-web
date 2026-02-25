import { ReactNode } from 'react';
import Styled, { NewBadgeProps } from './NewBadge.styles';

interface Props extends NewBadgeProps {
  children: ReactNode;
}

const NewBadge = ({ colorTheme, children }: Props) => {
  return <Styled.Container colorTheme={colorTheme}>{children}</Styled.Container>;
};

export default NewBadge;
