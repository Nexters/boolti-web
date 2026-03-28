import { StepDialog, useToast } from '@boolti/ui';
import { useSuperAdminDeleteShow, useHideShow } from '@boolti/api';
import ShowSettingDialogContent from './ShowSettingDialogContent';
import HostList from './components/HostList';
import ShowNameConfirm from './components/ShowNameConfirm';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

interface ShowSettingDialogProps {
  open: boolean;
  showId: number;
  showName: string;
  isHidden?: boolean;
  hasSoldTickets?: boolean;
  onClose: () => void;
}

const STEP = {
  MAIN: 'main',
  HOST_LIST: 'hostList',
  DELETE_SHOW: 'deleteShow',
  HIDE_SHOW: 'hideShow',
  SHOW_SHOW: 'showShow',
} as const;

const ShowSettingDialog = ({
  open,
  showId,
  showName,
  isHidden = false,
  hasSoldTickets = false,
  onClose,
}: ShowSettingDialogProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const deleteShowMutation = useSuperAdminDeleteShow();
  const hideShowMutation = useHideShow(showId);

  const handleDeleteShow = async () => {
    try {
      await deleteShowMutation.mutateAsync(showId);
      toast.success('공연이 삭제되었습니다.');
      onClose();
      navigate(PATH.INDEX, { replace: true });
    } catch {
      toast.error('공연 삭제에 실패했습니다.');
    }
  };

  const handleHideShow = async () => {
    try {
      await hideShowMutation.mutateAsync(true);
      toast.success('공연 미노출 처리되었습니다.');
      onClose();
    } catch {
      toast.error('공연 미노출 처리에 실패했습니다.');
    }
  };

  const handleShowShow = async () => {
    try {
      await hideShowMutation.mutateAsync(false);
      toast.success('공연 노출 처리되었습니다.');
      onClose();
    } catch {
      toast.error('공연 노출 처리에 실패했습니다.');
    }
  };

  return (
    <StepDialog
      open={open}
      onClose={onClose}
      initialHistory={[STEP.MAIN]}
      isBackdropClosable
      content={{
        [STEP.MAIN]: {
          title: '공연 설정',
          children: ({ push }) => (
            <ShowSettingDialogContent
              showId={showId}
              isHidden={isHidden}
              hasSoldTickets={hasSoldTickets}
              onClickHostList={() => push(STEP.HOST_LIST)}
              onClickHideShow={() => push(STEP.HIDE_SHOW)}
              onClickShowShow={() => push(STEP.SHOW_SHOW)}
              onClickDeleteShow={() => push(STEP.DELETE_SHOW)}
            />
          ),
        },
        [STEP.HOST_LIST]: {
          title: '관리 그룹',
          children: () => <HostList showId={showId} />,
        },
        [STEP.DELETE_SHOW]: {
          title: '공연 삭제',
          children: () => (
            <ShowNameConfirm
              showName={showName}
              description="공연을 삭제하시려면 정확한 공연명을 입력해 주세요."
              warning="* 삭제 시 작성했던 공연 정보는 전부 사라지며 복구할 수 없어요."
              confirmText="삭제하기"
              onConfirm={handleDeleteShow}
            />
          ),
        },
        [STEP.HIDE_SHOW]: {
          title: '공연 미노출',
          children: () => (
            <ShowNameConfirm
              showName={showName}
              description="공연 미노출 처리를 하려면 정확한 공연명을 입력해 주세요."
              warning="* 앱의 공연 목록에는 미노출되지만 웹의 주최자 화면에는 공연 정보가 노출됩니다."
              confirmText="미노출하기"
              onConfirm={handleHideShow}
            />
          ),
        },
        [STEP.SHOW_SHOW]: {
          title: '공연 노출',
          children: () => (
            <ShowNameConfirm
              showName={showName}
              description="공연 노출 처리를 하려면 정확한 공연명을 입력해 주세요."
              warning="* 앱과 웹 모두에서 공연 정보가 노출됩니다."
              confirmText="노출하기"
              onConfirm={handleShowShow}
            />
          ),
        },
      }}
    />
  );
};

export default ShowSettingDialog;
