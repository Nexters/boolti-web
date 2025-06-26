import styled from '@emotion/styled';
import { ChevronRightIcon as _ChevronRightIcon } from '@boolti/icon';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.p`
  margin: 0 0 24px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.grey.g60};

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }

  &:not(:first-of-type) {
    margin-top: 12px;
  }
`;

const ButtonText = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ButtonTitle = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const ButtonDescription = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin-top: 4px;
`;

const ChevronRightIcon = styled(_ChevronRightIcon)``;

export default {
  Container,
  Title,
  Button,
  ButtonText,
  ButtonTitle,
  ButtonDescription,
  ChevronRightIcon,
};
