import { useDropdown } from '@boolti/ui';
import Styled from './HostListItem.styles';
import { HostListItem as IHostListItem, HostType, HostTypeInfo } from '@boolti/api/src/types/host';
import { CheckIcon, ChevronDownIcon } from '@boolti/icon';
import { useAtom } from 'jotai';
import { myHostInfoAtom } from '~/components/ShowDetailLayout';

interface HostListItemProps {
  host: IHostListItem;
  onDelete: (host: IHostListItem) => void;
  onEdit: (host: IHostListItem, type: HostType) => void;
}

const ProfileSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#E7EAF2" />
    <mask id="mask0_7956_29535" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
      <circle cx="18" cy="18" r="18" fill="#2E303A" />
    </mask>
    <g mask="url(#mask0_7956_29535)">
      <path
        d="M31.9496 36.9V32.85C31.9496 30.7017 31.0962 28.6415 29.5772 27.1224C28.0581 25.6034 25.9979 24.75 23.8496 24.75H11.6996C9.55136 24.75 7.49109 25.6034 5.97204 27.1224C4.453 28.6415 3.59961 30.7017 3.59961 32.85V36.9"
        fill="#C8CCDC"
      />
      <path
        d="M17.9992 22.05C21.4786 22.05 24.2992 19.2294 24.2992 15.75C24.2992 12.2706 21.4786 9.45001 17.9992 9.45001C14.5198 9.45001 11.6992 12.2706 11.6992 15.75C11.6992 19.2294 14.5198 22.05 17.9992 22.05Z"
        fill="#C8CCDC"
      />
    </g>
  </svg>
);

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
  const { isOpen, toggleDropdown } = useDropdown();
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
        {host.imagePath ? (
          <Styled.HostImage src={host.imagePath} alt="host image" />
        ) : (
          <ProfileSVG />
        )}
        <Styled.HostName>{host.hostName}</Styled.HostName>
        {host.self && <Styled.HostSelfLabel>(나)</Styled.HostSelfLabel>}
      </Styled.HostInfoWrapper>
      <Styled.Dropdown>
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
