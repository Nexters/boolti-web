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

const TextContainer = styled.div``;

const InfoButton = styled.button`
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
`;

export default {
  Container,
  List,
  Header,
  HeaderText,
  TextContainer,
  InfoButton,
};
