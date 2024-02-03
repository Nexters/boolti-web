import styled from '@emotion/styled';

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  min-height: 240px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px rgba(136, 141, 157, 0.15);
  padding: 28px 32px;
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const EmptyText = styled.p`
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const Poster = styled.div<{ thumbnailPath: string }>`
  width: 130px;
  height: 184px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-image: url(${({ thumbnailPath }) => thumbnailPath});
  background-position: center;
  margin-right: 28px;
  border-radius: 6px;
`;

const TextContainer = styled.div`
  flex: 1;
  height: 184px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-right: 8px;
  ${({ theme }) => theme.typo.h2_m};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const TitleContainer = styled.div`
  display: flex;
`;

const InfoContainer = styled.div``;

const InfoColumn = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

const InfoText = styled.span<{ isLabel?: boolean }>`
  display: inline-block;
  min-width: 92px;
  margin-right: 16px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ isLabel, theme }) => (isLabel ? theme.palette.grey.g60 : theme.palette.grey.g90)};
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.palette.grey.g60};
  & > svg {
    width: 36px;
    height: 36px;
  }
`;

export default {
  Container,
  EmptyText,
  Poster,
  Button,
  TextContainer,
  Title,
  InfoContainer,
  InfoColumn,
  InfoText,
  IconContainer,
  TitleContainer,
};
