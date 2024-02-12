import styled from '@emotion/styled';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
`;

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g30};
`;

const Header = styled.header`
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  margin: 0 auto;
  padding: 0 20px;
`;

const ContentContainer = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: ${({ theme }) => theme.breakpoint.desktop};
  margin: 0 auto;
`;

export default {
  Layout,
  HeaderContainer,
  Header,
  ContentContainer,
  Content,
};
