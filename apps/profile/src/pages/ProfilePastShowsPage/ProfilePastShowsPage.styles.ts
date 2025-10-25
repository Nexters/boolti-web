import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0px;
`;

const ShowCard = styled.article`
  display: flex;
  gap: 16px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-radius: 12px;
  padding: 16px;
`;

const Poster = styled.img`
  width: 70px;
  height: 98px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  margin: 0;
  line-height: 1.3;
`;

const Meta = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g40};
  margin: 0;
`;

export default {
  Container,
  ShowCard,
  Poster,
  ShowInfo,
  Title,
  Meta,
};
