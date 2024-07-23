import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;

const Title = styled.p`
  margin-top: 16px;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const DescriptionBox = styled.div`
  margin-top: 40px;
  padding: 20px 24px;
  width: 600px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  text-align: center;

  strong {
    ${({ theme }) => theme.typo.sh0};
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

export default {
  Container,
  Title,
  DescriptionBox,
};
