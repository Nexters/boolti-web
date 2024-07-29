import Styled from './HostList.styles';
import {
  HostListItem as IHostListItem,
  HostListResponse,
  HostType,
} from '@boolti/api/src/types/host';
import HostListItem from '../HostListItem';
import { useConfirm, useToast } from '@boolti/ui';
import { useDeleteHost, useEditHost } from '@boolti/api';
import { HREF, PATH } from '~/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

interface HostListProps {
  hosts: HostListResponse;
  showId: number;
  onCloseDialog: () => void;
}

const HostList = ({ hosts, showId, onCloseDialog }: HostListProps) => {
  const editHostMutation = useEditHost(showId);
  const deleteHostMutation = useDeleteHost(showId);
  const navigate = useNavigate();
  const confirm = useConfirm();
  const toast = useToast();

  useBodyScrollLock();

  const onDelete = async ({ hostName: name, self, hostId }: IHostListItem) => {
    const hostName = self ? `${name} 님(나)` : `${name} 님`;
    const result = await confirm(`${hostName}의 권한을 삭제하시겠어요?`, {
      cancel: '취소하기',
      confirm: '삭제하기',
    });
    if (!result) return;
    deleteHostMutation.mutate({
      hostId,
    });

    toast.success('권한을 삭제했습니다.');
    if (self) {
      onCloseDialog();
      navigate(PATH.HOME, { replace: true });
    }
  };

  const onEdit = async ({ hostName: name, self, hostId }: IHostListItem, type: HostType) => {
    const hostName = self ? `${name} 님(나)` : `${name} 님`;
    const confirmText =
      type === HostType.MANAGER
        ? `${hostName}의 권한을 관리자로 수정하시겠어요?${'\n'}관리자는 권한 편집이 가능하며, 정산 관리 페이지 이외의 모든 페이지 접근이 가능합니다.`
        : `${hostName}의 권한을 도우미로 수정하시겠어요?${'\n'}도우미는 권한 편집이 불가하며, 방문자/입장 관리 페이지만 접근이 가능합니다.`;
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

    if (self && type === HostType.SUPPORTER) {
      onCloseDialog();
      navigate(HREF.SHOW_RESERVATION(showId), { replace: true });
    }
  };

  return (
    <Styled.HostListWrapper>
      <Styled.HostListTitle>팀원</Styled.HostListTitle>
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
