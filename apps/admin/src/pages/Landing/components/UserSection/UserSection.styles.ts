import { Button as _Button, mq } from '@boolti/ui';
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

  ${mq} {
    padding-top: 130px;
  }
`;

const Title = styled.h2`
  text-align: center;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.point.p4};

  ${mq} {
    white-space: normal;
    font-size: 48px;
    line-height: 60px;
  }
`;

const Description = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.palette.grey.g30};
  ${({ theme }) => theme.typo.b1};
  white-space: pre-wrap;
  margin-top: 6px;

  ${mq} {
    white-space: normal;
    margin-top: 8px;
    font-size: 24px;
    line-height: 36px;
  }
`;

const Button = styled(_Button)`
  cursor: pointer;
  margin-top: 12px;

  ${mq} {
    margin-top: 24px;
  }
`;

const TicketPreviewImage = styled.img`
  width: calc(100% - 60px);
  max-width: 1030px;
  margin-top: 32px;
  ${mq} {
    width: calc(100% - 160px);
    margin-top: 60px;
  }
`;

export default {
  Section,
  Container,
  Title,
  Description,
  Button,
  TicketPreviewImage,
};
