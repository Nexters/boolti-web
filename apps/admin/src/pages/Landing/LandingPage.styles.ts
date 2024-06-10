import { mq } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

import keyVisualImg from '~/assets/images/key-visual.png';

const Container = styled(m.div)`
  width: 100vw;
  min-height: 100vh;
  padding-top: 48px;
  &::-webkit-scrollbar {
    display: none;
  }
  ${mq} {
    padding-top: 68px;
  }
`;

const KeyVisual = styled.section`
  position: relative;
  width: 100%;
  margin-top: -49px;
  height: 740px;
  background-image: url('${keyVisualImg}');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  ${mq} {
    margin-top: -69px;
    height: 1300px;
  }
  &::before,
  &::after {
    content: "''";
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

export default {
  Container,
  KeyVisual,
};
