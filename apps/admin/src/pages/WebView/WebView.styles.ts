import styled from '@emotion/styled';
import { Button as _Button } from '@boolti/ui';

const Container = styled.div`
  padding: 16px;
`;

const Button = styled(_Button)`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
`;

export default { Container, Button };
