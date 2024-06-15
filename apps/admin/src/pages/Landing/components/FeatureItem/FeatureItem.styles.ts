import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div<{ position: 'left' | 'right' }>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 80px 0 40px;
  flex-direction: column;

  ${mq} {
    padding: 110px 60px 60px;
    gap: 112px;
    flex-direction: ${({ position }) => (position === 'left' ? 'row' : 'row-reverse')};
  }
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  opacity: 0.15;
  filter: blur(10px);
  position: absolute;
  top: -125%;
  left: -75%;

  ${mq} {
    width: 120px;
    height: 120px;
    top: -150%;
  }
`;

const TextContainer = styled.div`
  text-align: center;

  ${mq} {
    flex: 0 0 auto;
    text-align: left;
  }
`;

const CategoryText = styled.span`
  display: inline-block;
  position: relative;
  ${({ theme }) => theme.typo.b1};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.o1};

  ${mq} {
    ${({ theme }) => theme.typo.h2};
  }
`;

const Title = styled.h3`
  ${({ theme }) => theme.typo.point.p4};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin: 6px 0;
  white-space: pre-wrap;

  ${mq} {
    font-size: 48px;
    margin: 12px 0 20px;
    line-height: 70px;
  }
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  white-space: pre-wrap;

  ${mq} {
    font-size: 24px;
    line-height: 36px;
  }
`;

const Image = styled.img`
  width: calc(100% - 70px);
  max-width: 360px;
  margin-top: 40px;

  ${mq} {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    flex: 1 1 auto;
    width: auto;
    max-width: 712px;
    margin-top: 0;
  }
`;

export default {
  Container,
  Circle,
  CategoryText,
  TextContainer,
  Title,
  Description,
  Image,
};
