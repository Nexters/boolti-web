import styled from '@emotion/styled';

const Container = styled.footer`
  padding: 60px 20px;
  width: ${({ theme }) => theme.breakpoint.desktop};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextGroup = styled.div`
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const Text = styled.span`
  display: block;
  white-space: pre-line;
  ${({ theme }) => theme.typo.b1};
`;

const BoldTtext = styled.span`
  display: block;
  white-space: pre-line;
  margin-bottom: 12px;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const LinkTextGroup = styled.div`
  margin-top: 32px;
`;

const Link = styled.a`
  cursor: pointer;
`;

const IconGroup = styled.div`
  display: flex;
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
};
