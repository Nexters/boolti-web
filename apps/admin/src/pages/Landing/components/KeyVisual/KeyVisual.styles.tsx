import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

import keyVisualImg from '~/assets/images/key-visual.png';

const Container = styled.section`
  position: relative;
  text-align: center;
  width: 100%;
  margin-top: -49px;
  padding-top: 49px;
  height: 740px;
  background: #070708 url('${keyVisualImg}');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  ${mq_lg} {
    margin-top: -69px;
    padding-top: 69px;
    height: 1200px;
  }
  &::before,
  &::after {
    z-index: 0;
    content: '';
    position: absolute;
    top: 0;
    width: 20%;
    height: 100%;
    background: linear-gradient(
      90deg,
      #020205 45.03%,
      rgba(2, 2, 5, 0.81) 81.17%,
      rgba(2, 2, 5, 0) 100%
    );
    filter: blur(27.700000762939453px);
  }
  &::before {
    left: 0;
    margin-left: -5%;
  }
  &::after {
    right: 0;
    margin-right: -5%;
    transform: rotate(180deg);
  }
`;

const Title = styled.h1`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.g00};
  margin-top: 100px;

  & svg {
    margin-top: 16px;
    width: 104px;
    height: 37px;
    display: inline-block;
    color: ${({ theme }) => theme.palette.grey.g00};

    path {
      fill: ${({ theme }) => theme.palette.grey.g00};
    }
  }

  ${mq_lg} {
    font-size: 48px;
    line-height: normal;
    margin-top: 246px;

    & svg {
      margin-top: 40px;
      width: 259px;
      height: 98px;
    }
  }
`;

const Description = styled(m.span)`
  z-index: 1;
  display: inline-block;
  position: relative;
  white-space: pre-wrap;
  word-break: keep-all;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g00};
  margin-top: 170px;
  padding: 0 60px;

  & > b {
    font-weight: bold;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% - 60px);
    max-width: 456px;
    height: 48px;
    border-radius: 100%;
    border: 0.2px solid rgba(255, 255, 255, 0.4);
  }
  &::before {
    transform: translate3d(-50%, -50%, 0) rotate(1.6deg);
  }
  &::after {
    transform: translate3d(-50%, -50%, 0) rotate(6.4deg);
  }

  ${mq_lg} {
    width: calc(100% - 80px);
    max-width: 1010px;
    margin-top: 400px;
    ${({ theme }) => theme.typo.b4};
    font-size: 28px;
    line-height: 48px;
    letter-spacing: -0.64px;

    &::before,
    &::after {
      height: 128px;
      max-width: 1010px;
      border-width: 1px;
    }
  }
`;

const FloatingUnion = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case 'left': {
        return `
          top: -30px;
          left: 10px;
          width: 40px;
          height: 40px;
          transform: roate(24deg);

          ${mq_lg} {
            top: -30%;
            left: -36px;
            width: 96px;
            height: 96px;
          }
        `;
      }
      case 'right': {
        return `
            top: 20%;
            right: 10px;
            width: 42px;
            height: 42px;
            transform: rotate(-50deg);

            ${mq_lg} {
              top: 30%;
              right: -46px;
              width: 114px;
              height: 114px;
            }
          `;
      }
    }
  }}
`;

export const MobileBreak = styled.br`
  ${mq_lg} {
    display: none;
  }
`;

export const Hidden = styled.div`
  height: 0;
  opacity: 0;
`;

export default {
  Container,
  Title,
  Description,
  MobileBreak,
  Hidden,
  FloatingUnion,
};
