import styled from '@emotion/styled';

const Toast = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px;
`;

const Icon = styled.div`
  display: inline-flex;
  margin-top: 1px;
`;

const Message = styled.div`
  ${({ theme }) => theme.typo.b1};

  div {
    margin: 0;
  }
`;

export default {
  Toast,
  Icon,
  Message,
};
