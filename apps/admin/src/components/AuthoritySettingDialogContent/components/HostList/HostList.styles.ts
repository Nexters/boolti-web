import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface DropdownListItemProps {
  isDelete?: boolean;
}

const HostListWrapper = styled.div`
  height: calc(100vh - 144px);

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
  max-height: 242px;
  overflow-y: scroll;
`;

const HostListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.typo.b3};
  position: relative;

  & + & {
    margin-top: 20px;
  }
`;

const HostInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HostImage = styled.img`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;

const HostName = styled.p`
  margin-left: 6px;
  margin-right: 4px;
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const HostSelfLabel = styled.span`
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const HostType = styled.span`
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const Dropdown = styled.div`
  position: relative;
`;

const NameButton = styled.button`
  max-width: 68px;
`;

const Name = styled.span`
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const DropdownList = styled.ul`
  position: fixed;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  margin-top: 4px;
  margin-left: -64px;
  z-index: 1;
`;

const DropdownListItem = styled.li<DropdownListItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 112px;
  padding: 7px 12px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ isDelete, theme }) =>
    isDelete ? theme.palette.status.error : theme.palette.grey.g70};
  background-color: ${({ theme }) => theme.palette.grey.w};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g10};
  }

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export default {
  HostListWrapper,
  HostListTitle,
  HostList,
  HostListItem,
  HostInfoWrapper,
  HostImage,
  HostName,
  HostSelfLabel,
  HostType,
  Dropdown,
  NameButton,
  Name,
  DropdownList,
  DropdownListItem,
};
