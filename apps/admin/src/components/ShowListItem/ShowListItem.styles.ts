import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.li`
  display: flex;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px rgba(136, 141, 157, 0.15);
  padding: 16px 20px;
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }

  ${mq} {
    padding: 28px 32px;
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
  display: none;

  ${mq} {
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};

  ${mq} {
    ${({ theme }) => theme.typo.h2_m};
    max-width: auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  ${mq} {
    margin-bottom: 70px;
  }
`;

const InfoColumn = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

const InfoText = styled.span<{ isLabel?: boolean }>`
  display: inline-block;
  min-width: 60px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ isLabel, theme }) => (isLabel ? theme.palette.grey.g60 : theme.palette.grey.g90)};

  ${mq} {
    ${({ theme }) => theme.typo.b3};
  }

  &:not(:last-of-type) {
    margin-right: 16px;
  }
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
  ${mq} {
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

  InfoColumn,
  InfoText,
  IconContainer,
  TitleContainer,
};
