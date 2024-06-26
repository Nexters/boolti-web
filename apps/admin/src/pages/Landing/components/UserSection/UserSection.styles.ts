import { Button as _Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Section = styled.section`
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
  padding-top: 80px;

  ${mq_lg} {
    padding-top: 128px;
  }
`;

const Title = styled.h2`
  text-align: center;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.point.p4};

  ${mq_lg} {
    white-space: normal;
    font-size: 32px;
    line-height: 38px;
  }
`;

const Description = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.palette.grey.g30};
  ${({ theme }) => theme.typo.b1};
  white-space: pre-wrap;
  margin-top: 6px;

  ${mq_lg} {
    white-space: normal;
    margin-top: 8px;
    font-size: 20px;
    line-height: 32px;
  }
`;

const Button = styled(_Button)`
  cursor: pointer;
  margin-top: 12px;

  ${mq_lg} {
    margin-top: 24px;
  }
`;

const TicketPreviewImage = styled.img`
  display: none;
  ${mq_lg} {
    display: block;
    width: calc(100% - 160px);
    max-width: 1080px;
    margin-top: 80px;
  }
`;

const MobileTicketPreviewImage = styled.img`
  margin-top: 32px;
  width: calc(100% - 60px);
  display: block;
  ${mq_lg} {
    display: none;
  }
`;

export default {
  Section,
  Container,
  Title,
  Description,
  Button,
  TicketPreviewImage,
  MobileTicketPreviewImage,
};
