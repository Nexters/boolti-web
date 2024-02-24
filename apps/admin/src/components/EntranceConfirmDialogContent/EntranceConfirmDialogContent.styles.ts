import styled from '@emotion/styled';

const Container = styled.div`
  height: 60vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 2px;
`;

const Description = styled.h2`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-block-size: unset;
`;

const Seperator = styled.hr`
  padding: 34px 0;
`;

export default { Container, Description, Title, Image, Seperator };
