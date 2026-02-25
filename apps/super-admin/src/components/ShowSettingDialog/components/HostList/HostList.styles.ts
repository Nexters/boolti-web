import styled from '@emotion/styled';

const HostListWrapper = styled.div``;

const HostList = styled.ul`
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 400px;
  overflow-y: scroll;
`;

export default {
  HostListWrapper,
  HostList,
};
