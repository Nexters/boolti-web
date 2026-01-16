import styled from '@emotion/styled';
import { mq_lg } from '@boolti/ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 8px 20px 24px 20px;
`;

const CountText = styled.p`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g40};
  padding: 16px 0px 12px 0px;
  margin-left: 20px;
`;

const ShowCard = styled.button`
  display: flex;
  gap: 12px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-radius: 0px;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;

  ${mq_lg} {
    border-radius: 12px;
  }
`;

const Poster = styled.img`
  width: 70px;
  height: 98px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid #2e303a;
`;

const ShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: #f6f7ff;
  margin: 0;
  line-height: 1.3;
`;

const Meta = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: #6f7485;
  margin: 0;
`;

export default {
  Container,
  CountText,
  ShowCard,
  Poster,
  ShowInfo,
  Title,
  Meta,
};
