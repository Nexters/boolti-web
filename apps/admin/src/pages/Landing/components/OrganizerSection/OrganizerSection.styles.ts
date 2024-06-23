import { mq } from '@boolti/ui';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import lightImg from '~/assets/images/light.png';

const Section = styled.section`
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ff5b15;
  padding-top: 80px;

  &::after {
    position: absolute;
    bottom: 0;
    width: calc(100% - 80px);
    height: 40px;
    content: '';
    opacity: 0.25;
    background: linear-gradient(180deg, rgba(255, 92, 22, 0) 9.57%, #ff5d17 90.96%);
  }

  ${mq} {
    padding-top: 128px;

    &::after {
      width: calc(100% - 160px);
      height: 160px;
    }
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

const Title = styled.h2`
  text-align: center;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.point.p4};

  ${mq} {
    white-space: normal;
    font-size: 32px;
    line-height: 38px;
  }
`;

const Description = styled.p`
  text-align: center;
  color: #ffc7ae;
  ${({ theme }) => theme.typo.b1};
  white-space: pre-wrap;
  margin-top: 6px;

  ${mq} {
    white-space: normal;
    margin-top: 8px;
    font-size: 20px;
    line-height: 32px;
  }
`;

const Button = styled(Link)`
  z-index: 1;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: 4px;
  margin-top: 12px;
  background-color: #ffe9e0;
  color: ${({ theme }) => theme.palette.primary.o1};
  ${({ theme }) => theme.typo.sh1};

  ${mq} {
    padding: 13px 20px;
    margin-top: 24px;
  }
`;

const PcAdminPreviewImage = styled.img`
  display: none;
  ${mq} {
    display: block;
    width: calc(100% - 160px);
    max-width: 1080px;
    height: auto;
    border-radius: 32px 32px 0px 0px;
    margin-top: 80px;
  }
`;

const MobileAdminPrevieImage = styled.img`
  margin-top: 32px;
  max-width: 320px;
  height: auto;
  width: calc(100% - 80px);
  border-radius: 12px 12px 0px 0px;
  ${mq} {
    display: none;
  }
`;

export default {
  Section,
  BackgroundLight,
  Container,
  Title,
  Description,
  Button,
  PcAdminPreviewImage,
  MobileAdminPrevieImage,
};
