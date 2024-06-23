import styled from '@emotion/styled';

const Container = styled.section`
  padding: 28px 20px;
  background-color: ${({ theme }) => theme.palette.grey.w};
`;

const DescriptoinList = styled.ul`
  list-style: none;
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const DescriptionListItem = styled.li`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g60};
  position: relative;

  &::before {
    content: '・';
    padding-right: 4px;
    color: ${({ theme }) => theme.palette.grey.g60};
  }
`;

const RejectButton = styled.button`
  text-decoration: underline;
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g90};
  cursor: pointer;
  margin-left: 15px;
`;

const RegisterGuideContainer = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-radius: 6px;
  width: 100%;
  margin-top: 28px;
  margin-bottom: 20px;
`;

const RegisterGuideTitle = styled.h3`
  ${({ theme }) => theme.typo.sh0};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;
`;

const RegisterGuideDescription = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export default {
  Container,
  DescriptoinList,
  DescriptionListItem,
  RegisterGuideContainer,
  RejectButton,
  RegisterGuideTitle,
  RegisterGuideDescription,
};
