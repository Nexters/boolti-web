import styled from '@emotion/styled';

const Container = styled.div``;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  min-height: 240px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px rgba(136, 141, 157, 0.15);
  padding: 28px 32px;
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

const EmptyText = styled.p`
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

export default {
  Container,
  List,
  Header,
  EmptyText,
  HeaderText,
};
