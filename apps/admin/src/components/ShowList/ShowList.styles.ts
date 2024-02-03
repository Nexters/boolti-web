import styled from '@emotion/styled';

const Container = styled.div``;

const List = styled.ol`
  list-style: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderText = styled.h2`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export default {
  Container,
  List,
  Header,
  HeaderText,
};
