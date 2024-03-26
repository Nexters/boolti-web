import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div<{ isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 12px;
  min-height: ${({ isEmpty }) => (isEmpty ? '240px' : 'auto')};
  text-align: center;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g40};
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  ${mq} {
    display: none;
  }
`;

export default { Container };
