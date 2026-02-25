import Styled from './HostList.styles';
import { HostListItem as IHostListItem, HostType } from '@boolti/api/src/types/host';
import HostListItem from '../HostListItem';
import { useConfirm, useToast } from '@boolti/ui';
import { useDeleteHost, useEditHost, useHostList } from '@boolti/api';

interface HostListProps {
  showId: number;
}

const HostList = ({ showId }: HostListProps) => {
  const { data: hosts } = useHostList(showId);
  const editHostMutation = useEditHost(showId);
  const deleteHostMutation = useDeleteHost(showId);
  const confirm = useConfirm();
  const toast = useToast();

  const onDelete = async ({ hostName: name, hostId }: IHostListItem) => {
    const result = await confirm(`${name} 님의 권한을 삭제하시겠어요?`, {
      cancel: '취소하기',
      confirm: '삭제하기',
    });
    if (!result) return;
    deleteHostMutation.mutate({
      hostId,
      self: false,
    });

    toast.success('권한을 삭제했습니다.');
  };

  const onEdit = async ({ hostName: name, hostId }: IHostListItem, type: HostType) => {
    const confirmText =
      type === HostType.MANAGER
        ? `${name} 님의 권한을 관리자로 수정하시겠어요?`
        : `${name} 님의 권한을 도우미로 수정하시겠어요?`;
    const result = await confirm(confirmText, {
      cancel: '취소하기',
      confirm: '수정하기',
    });
    if (!result) return;
    editHostMutation.mutate({
      hostId,
      body: {
        type,
      },
    });
    toast.success('권한을 수정했습니다.');
  };

  return (
    <Styled.HostListWrapper>
      <Styled.HostList>
        {hosts &&
          hosts.map((host) => (
            <HostListItem host={host} key={host.hostId} onDelete={onDelete} onEdit={onEdit} />
          ))}
      </Styled.HostList>
    </Styled.HostListWrapper>
  );
};

export default HostList;
