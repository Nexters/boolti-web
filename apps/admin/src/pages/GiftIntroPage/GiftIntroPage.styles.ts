import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0 24px;
  height: 100vh;
  padding-top: 184px;
  text-align: center;
  background: linear-gradient(#121215, #434753);
`;

const LetterImg = styled.img``;

const Description = styled.p`
  ${({ theme }) => theme.typo.b4}
  color: ${({ theme }) => theme.palette.grey.g20};
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: 20px;

  & > strong {
    ${({ theme }) => theme.typo.sh2};
  }
`;

export default {
  Container,
  LetterImg,
  Description,
};
