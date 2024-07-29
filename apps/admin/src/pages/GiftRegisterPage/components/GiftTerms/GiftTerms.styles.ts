import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  background-color: ${({ theme }) => theme.palette.grey.g10};
`;

const ExpansionPanel = styled.div``;

const ExpansionPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
`;

const ExpansionPanelHeaderTitle = styled.h2`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const ExpansionPanelContents = styled.div`
  padding: 0 20px 40px;
`;

const List = styled.ul`
  list-style-type: '・';
  margin: 0 8px;
`;

const ListItem = styled.li`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin-left: 8px;
`;

const BooltiChannelLink = styled(Link)`
  text-decoration: underline;
`;

export default {
  Container,
  ExpansionPanel,
  ExpansionPanelHeader,
  ExpansionPanelHeaderTitle,
  ExpansionPanelContents,
  List,
  ListItem,
  BooltiChannelLink,
};
