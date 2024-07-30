import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const HostListWrapper = styled.div`
  height: calc(100vh - 215px);

  ${mq_lg} {
    height: auto;
  }
`;

const HostListTitle = styled.h3`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 20px;
`;

const HostList = styled.ul`
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 242px;
  overflow-y: scroll;
`;

export default {
  HostListWrapper,
  HostListTitle,
  HostList,
};
