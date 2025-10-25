import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Header = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: ${({ theme }) => theme.palette.grey.g10};

  ${mq_lg} {
    padding: 0;
  }
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
  BackButton,
  HeaderTitle,
};
