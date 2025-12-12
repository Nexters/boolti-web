import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;
`;

const LogoWrapper = styled.div`
  margin-bottom: 32px;

  svg {
    width: 120px;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  line-height: 1.5;
`;

const Styled = {
  Container,
  LogoWrapper,
  Title,
  Description,
};

export default Styled;
