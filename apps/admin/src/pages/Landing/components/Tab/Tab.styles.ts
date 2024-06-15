import { mq } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

const Container = styled(m.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  ${mq} {
    height: 64px;
  }
`;

const List = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
`;

const Button = styled.button<{ isActive?: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  padding: 12px 0;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g00};

  &:not(:first-of-type) {
    margin-left: 20px;
  }

  border-bottom: 2px solid
    ${({ isActive, theme }) => (isActive ? theme.palette.primary.o1 : 'transparent')};

  ${mq} {
    padding: 12px 0 16px 0;
  }
`;

export default { Container, Button, List };
