import React from 'react';
import Styled from './Header.styles';

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, right }: HeaderProps) => {
  return (
    <Styled.Header>
      <Styled.HeaderLeft>{left}</Styled.HeaderLeft>
      <Styled.HeaderRight>{right}</Styled.HeaderRight>
    </Styled.Header>
  );
};

export default Header;
