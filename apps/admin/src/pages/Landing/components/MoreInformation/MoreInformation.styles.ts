import { Button as _Button, mq } from '@boolti/ui';
import styled from '@emotion/styled';

import lightImg from '~/assets/images/more-information-light.png';

export const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 80px 0;
  background-color: ${({ theme }) => theme.palette.grey.b};
  ${mq} {
    height: 400px;
  }
`;

const BackgroundLight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('${lightImg}');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Text = styled.p`
  z-index: 1;

  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.w};

  ${mq} {
    font-size: 32px;
    font-weight: bold;
    line-height: 60px;
  }
`;

const Button = styled(_Button)`
  z-index: 1;
  cursor: pointer;
  margin-top: 16px;

  ${mq} {
    margin-top: 28px;
  }
`;

export default {
  Container,
  BackgroundLight,
  Text,
  Button,
};
