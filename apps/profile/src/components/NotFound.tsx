import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { EXTERNAL_DOMAIN } from '~/constants/external';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 - 불티</title>
      </Helmet>

      <Container>
        <Content>
          <ErrorCode>404</ErrorCode>
          <Title>페이지를 찾을 수 없습니다</Title>
          <Description>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
            <br />
            URL을 다시 확인해 주세요.
          </Description>
          <HomeLink href={EXTERNAL_DOMAIN.SHOW_MANAGER}>불티 홈으로 가기</HomeLink>
        </Content>
      </Container>
    </>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 480px;
`;

const ErrorCode = styled.div`
  font-size: 72px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const HomeLink = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background-color: #667eea;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5568d3;
  }
`;
