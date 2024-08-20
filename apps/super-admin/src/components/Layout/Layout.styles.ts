import styled from '@emotion/styled';
import { PATH } from '~/constants/routes';

interface LayoutContainerProps {
  path: string;
}

const Container = styled.main<LayoutContainerProps>`
  padding-left: ${({ path }) => (path === PATH.INDEX ? 0 : '220px')};
  width: 100%;
`;

export default {
  Container,
};
