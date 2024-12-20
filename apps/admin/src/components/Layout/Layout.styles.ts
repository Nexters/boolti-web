import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
`;

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g30};
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.palette.grey.w};
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  margin: 0 auto;

  ${mq_lg} {
    padding: 0 20px;
  }
`;

const BannerContainer = styled.div`
  background-color: #eff5ff;
`;

const Banner = styled.div`
  min-height: 56px;
`;

const ContentContainer = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  min-width: 320px;
  margin: 0 auto;
`;

export default {
  Layout,
  HeaderContainer,
  Header,
  BannerContainer,
  Banner,
  ContentContainer,
  Content,
};
