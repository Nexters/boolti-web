import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0px;
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.grey.g40};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const LinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};
`;

export default {
  Container,
  LinkItem,
  IconWrapper,
  LinkInfo,
  Title,
};
