import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.li`
  display: flex;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px rgba(136, 141, 157, 0.15);
  padding: 16px 20px;
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  ${mq_lg} {
    padding: 28px 32px;
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
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
  margin: 108px auto;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g40};

  ${mq_lg} {
    ${({ theme }) => theme.typo.b4};
  }
`;

const Poster = styled.div<{ thumbnailPath: string }>`
  display: none;

  ${mq_lg} {
    display: block;
    width: 130px;
    height: 184px;
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    background-image: url(${({ thumbnailPath }) => thumbnailPath});
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 28px;
    border-radius: 6px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  ${({ theme }) => theme.typo.point.p4};
  color: ${({ theme }) => theme.palette.grey.g90};

  ${mq_lg} {
    max-width: auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  ${mq_lg} {
    margin-bottom: 70px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

const InfoText = styled.span<{ isLabel?: boolean }>`
  display: inline-block;
  min-width: 60px;
  margin-right: 16px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ isLabel, theme }) => (isLabel ? theme.palette.grey.g60 : theme.palette.grey.g90)};

  ${mq_lg} {
    ${({ theme }) => theme.typo.b3};
  }
`;

const DateTextContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`;

const DateText = styled(InfoText)`
  white-space: pre-wrap;
  min-width: auto;
  margin-right: 0;
`;

const IconContainer = styled.div`
  display: none;
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.palette.grey.g60};
  & > svg {
    width: 36px;
    height: 36px;
  }
  ${mq_lg} {
    display: block;
  }
`;

export default {
  Container,
  EmptyText,
  Poster,
  Button,
  TextContainer,
  Title,
  DateText,
  DateTextContainer,
  InfoColumn,
  InfoText,
  IconContainer,
  TitleContainer,
};
