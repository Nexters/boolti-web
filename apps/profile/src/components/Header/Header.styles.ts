import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Header = styled.div<{ hasTitle: boolean }>`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: ${({ theme }) => theme.palette.grey.g10};
  justify-content: ${({ hasTitle }) => (hasTitle ? 'space-between' : 'flex-end')};

  ${mq_lg} {
    padding: 0;
    position: relative;
    background-color: transparent;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  cursor: pointer;
`;

const HeaderTitle = styled.p`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g10};
  margin-left: 12px;
`;

export default {
  Header,
  Left,
  BackButton,
  HeaderTitle,
};
