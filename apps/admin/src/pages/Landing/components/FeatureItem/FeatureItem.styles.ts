import { mq_lg, mq_md } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div<{ position: 'left' | 'right' }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 80px 0 40px;
  flex-direction: column;

  ${mq_lg} {
    max-width: ${({ theme }) => theme.breakpoint.desktop};
    margin: 0 auto;
    padding: 110px 20px 0;
    justify-content: space-between;
    flex-direction: ${({ position }) => (position === 'left' ? 'row' : 'row-reverse')};
  }
  ${mq_md} {
    flex-direction: column;
    align-items: ${({ position }) => (position === 'left' ? 'flex-start' : 'flex-end')};
    max-width: ${({ theme }) => theme.breakpoint.tablet};
  }
`;

const Circle = styled.div`
  z-index: 0;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  opacity: 0.15;
  filter: blur(10px);
  position: absolute;
  top: -125%;
  left: -75%;

  ${mq_lg} {
    width: 120px;
    height: 120px;
    top: -150%;
  }
`;

const TextContainer = styled.div`
  text-align: center;

  ${mq_lg} {
    flex: 0 0 auto;
    text-align: left;
  }
`;

const CategoryText = styled.span`
  z-index: 1;
  display: inline-block;
  position: relative;
  ${({ theme }) => theme.typo.b1};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.o1};

  ${mq_lg} {
    ${({ theme }) => theme.typo.h2};
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h3`
  position: relative;
  z-index: 1;
  ${({ theme }) => theme.typo.point.p4};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin: 6px 0;
  white-space: pre-wrap;

  ${mq_lg} {
    font-size: 32px;
    margin: 12px 0 20px;
    line-height: 52px;
  }

  ${mq_md} {
    margin: 12px 0 6px;
  }
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  white-space: pre-wrap;

  ${mq_lg} {
    font-size: 20px;
    line-height: 32px;
  }
`;

const Image = styled.img<{
  maxWidth: [number, number, number];
  padding: [number, number];
  position: 'left' | 'right';
}>`
  width: calc(100% - 40px);
  max-width: ${({ maxWidth }) => maxWidth[0]}px;
  margin-top: 40px;
  padding: ${({ padding }) => padding[0]}px ${({ padding }) => padding[1]}px;

  ${mq_md} {
    margin-top: 40px !important;
    margin-${({ position }) => position}: auto;
    max-width: ${({ maxWidth }) => maxWidth[1]}px !important;
  }

  ${mq_lg} {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    flex: 1 1 auto;
    width: auto;
    max-width: ${({ maxWidth }) => maxWidth[2]}px;
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
