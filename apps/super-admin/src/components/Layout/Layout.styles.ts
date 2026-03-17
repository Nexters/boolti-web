import styled from '@emotion/styled';

interface LayoutContainerProps {
  hasNavigation: boolean;
}

const Container = styled.main<LayoutContainerProps>`
  padding-left: ${({ hasNavigation }) => (hasNavigation ? '220px' : 0)};
  width: 100%;
`;

export default {
  Container,
};
