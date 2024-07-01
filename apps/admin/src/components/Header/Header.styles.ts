import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Header = styled.div`
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  ${mq_lg} {
    padding: 0;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderRight = styled.div``;

export default {
  Header,
  HeaderLeft,
  HeaderRight,
};
