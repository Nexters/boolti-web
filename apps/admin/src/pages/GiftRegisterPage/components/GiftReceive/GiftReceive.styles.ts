import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LetterImg = styled.img`
  cursor: pointer;
  margin-bottom: 36px;
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b4}
  color: ${({ theme }) => theme.palette.grey.g20};
  text-align: center;
  margin-bottom: 20px;
`;

export default {
  Container,
  LetterImg,
  Description,
};
