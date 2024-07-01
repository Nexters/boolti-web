import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.footer`
  padding: 48px 20px 28px 20px;
  max-width: ${({ theme }) => theme.breakpoint.desktop};

  ${mq_lg} {
    padding: 60px 20px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${mq_lg} {
    flex-direction: row;
  }
`;

const TextGroup = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
  }
`;

const MobileTextGroup = styled(TextGroup)`
  display: block;
  ${mq_lg} {
    display: none;
  }
`;

const Text = styled.span`
  display: block;
  white-space: pre-line;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const BoldTtext = styled.span`
  display: block;
  white-space: pre-line;
  margin-bottom: 8px;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const LinkTextGroup = styled.div`
  margin-top: 24px;

  ${mq_lg} {
    margin-top: 32px;
  }
`;

const Link = styled.a`
  cursor: pointer;
`;

const IconGroup = styled.div`
  display: flex;
  margin-top: 32px;

  ${mq_lg} {
    margin-top: 0;
  }
`;

const IconLink = styled.a`
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.grey.g70};
  color: ${({ theme }) => theme.palette.grey.g00};
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

export default {
  Container,
  Content,
  Text,
  Link,
  BoldTtext,
  TextGroup,
  IconGroup,
  LinkTextGroup,
  IconLink,
  MobileTextGroup,
};
