import { Button, mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 48px;
  ${mq} {
    margin-bottom: 80px;
  }
`;

const List = styled.ol`
  list-style: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  ${mq} {
    margin-bottom: 24px;
  }
`;

const HeaderText = styled.h2`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  ${mq} {
    ${({ theme }) => theme.typo.h2};
  }
`;

const MobileButton = styled(Button)`
  display: flex;
  ${mq} {
    display: none;
  }
`;

const DesktopButton = styled(Button)`
  display: none;
  ${mq} {
    display: flex;
  }
`;

const TextContainer = styled.div``;

const InfoButton = styled.button`
  display: none;

  ${mq} {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 4px;
    ${({ theme }) => theme.typo.b1};
    color: ${({ theme }) => theme.palette.grey.g50};
    & > svg {
      margin-left: 4px;
    }
  }
`;

export default {
  Container,
  List,
  Header,
  HeaderText,
  MobileButton,
  DesktopButton,
  TextContainer,
  InfoButton,
};
