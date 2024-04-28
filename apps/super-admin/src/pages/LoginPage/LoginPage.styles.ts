import styled from '@emotion/styled';
import { Layout } from 'antd';

const Container = styled(Layout)({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

const Content = styled(Layout.Content)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const LogoContainer = styled.div({
  marginBottom: 32,
});

export default { Container, Content, LogoContainer };
