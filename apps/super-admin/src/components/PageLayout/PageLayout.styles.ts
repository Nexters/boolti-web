import styled from '@emotion/styled';

const Container = styled.div`
  padding: 26px 44px 56px;
`;

const Breadcrumb = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const PageHeader = styled.header`
  margin-top: 24px;
`;

const PageTitle = styled.h2`
  ${({ theme }) => theme.typo.h2};
  margin-bottom: 6px;
`;

const PageDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  white-space: pre;
`;

export default {
  Container,
  Breadcrumb,
  PageHeader,
  PageTitle,
  PageDescription,
};
