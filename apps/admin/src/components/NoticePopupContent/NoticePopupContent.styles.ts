import styled from '@emotion/styled';
import { Button, mq_lg } from '@boolti/ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mq_lg} {
    width: 410px;
    padding: 0 20px 20px 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 0;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.grey.g70};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 24px;
`;

const Emphasized = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  color: ${({ theme }) => theme.palette.red.main};
  font-size: 15px;
  text-align: center;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.palette.grey.g60};
  font-size: 14px;
  margin-bottom: 28px;
`;

const ConfirmButton = styled(Button)`
  width: 100%;
`;

export default {
  Container,
  Header,
  CloseButton,
  Title,
  Emphasized,
  Description,
  ConfirmButton,
};
