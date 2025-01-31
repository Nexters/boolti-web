import { useDropdown } from '@boolti/ui';
import Styled from './HostListItem.styles';
import { HostListItem as IHostListItem, HostType, HostTypeInfo } from '@boolti/api/src/types/host';
import { CheckIcon, ChevronDownIcon, UserIcon } from '@boolti/icon';
import { useAtom } from 'jotai';
import { myHostInfoAtom } from '~/components/ShowDetailLayout';

interface HostListItemProps {
  host: IHostListItem;
  onDelete: (host: IHostListItem) => void;
  onEdit: (host: IHostListItem, type: HostType) => void;
}

const dropdownItems: HostTypeInfo[] = [
  {
    type: HostType.MANAGER,
    label: '관리자',
  },
  {
    type: HostType.SUPPORTER,
    label: '도우미',
  },
];

const HostListItem = ({ host, onEdit, onDelete }: HostListItemProps) => {
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown();
  const [myHostInfo] = useAtom(myHostInfoAtom);

  const getHostTypeName = (type: HostType) => {
    switch (type) {
      case HostType.MAIN:
        return '주최자';
      case HostType.MANAGER:
        return '관리자';
      case HostType.SUPPORTER:
        return '도우미';
    }
  };

  const handleEdit = async (host: IHostListItem, type: HostType) => {
    if (host.type === type) {
      return;
    }
    try {
      onEdit(host, type);
      toggleDropdown();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (host: IHostListItem) => {
    try {
      onDelete(host);
      toggleDropdown();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.HostListItem key={host.hostId}>
      <Styled.HostInfoWrapper>
        {host.imagePath ? <Styled.HostImage src={host.imagePath} alt="host image" /> : <UserIcon />}
        <Styled.HostName>{host.hostName}</Styled.HostName>
        {host.self && <Styled.HostSelfLabel>(나)</Styled.HostSelfLabel>}
      </Styled.HostInfoWrapper>
      <Styled.Dropdown ref={dropdownRef}>
        <Styled.NameButton
          onClick={() => {
            if (host.type === HostType.MAIN || myHostInfo?.type === HostType.SUPPORTER) return;
            toggleDropdown();
          }}
        >
          <Styled.Name>{getHostTypeName(host.type)}</Styled.Name>
          {host.type !== HostType.MAIN && <ChevronDownIcon />}
        </Styled.NameButton>
        {isOpen && (
          <Styled.DropdownList>
            {dropdownItems.map((item) => (
              <Styled.DropdownListItem onClick={() => handleEdit(host, item.type)} key={item.type}>
                {item.label}
                {host.type === item.type && <CheckIcon />}
              </Styled.DropdownListItem>
            ))}
            <Styled.DropdownListItem isDelete onClick={() => handleDelete(host)}>
              삭제하기
            </Styled.DropdownListItem>
          </Styled.DropdownList>
        )}
      </Styled.Dropdown>
    </Styled.HostListItem>
  );
};

export default HostListItem;
