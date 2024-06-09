import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

import keyVisualImg from '~/assets/images/key-visual.png';

const Container = styled.div`
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

const Header = styled.header`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => `${theme.palette.grey.g50}${theme.palette.opacity[30]}`};
  background: ${({ theme }) => `${theme.palette.grey.g60}${theme.palette.opacity[40]}`};
  backdrop-filter: blur(40px);
  padding: 4px 20px;
  ${mq} {
    height: 68px;
    padding: 12px 20px;
  }
`;

const HeaderContaienr = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BooltiIcon = styled.div`
  width: 55.5px;
  height: 21px;
  ${mq} {
    width: 74px;
    height: 28px;
  }
  & > svg {
    width: 100%;
    height: 100%;
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
  Header,
  HeaderContaienr,
  KeyVisual,
  BooltiIcon,
};
