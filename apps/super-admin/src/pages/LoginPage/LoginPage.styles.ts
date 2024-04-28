import styled from '@emotion/styled';
import { Layout } from 'antd';

const Container = styled(Layout)({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

const Content = styled(Layout.Content)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default { Container, Content };
