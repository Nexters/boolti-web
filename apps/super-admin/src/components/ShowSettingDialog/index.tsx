import { StepDialog, useToast } from '@boolti/ui';
import { useDeleteShow } from '@boolti/api';
import ShowSettingDialogContent from './ShowSettingDialogContent';
import HostList from './components/HostList';
import DeleteShowConfirm from './components/DeleteShowConfirm';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

interface ShowSettingDialogProps {
  open: boolean;
  showId: number;
  showName: string;
  onClose: () => void;
}

const STEP = {
  MAIN: 'main',
  HOST_LIST: 'hostList',
  DELETE_SHOW: 'deleteShow',
} as const;

const ShowSettingDialog = ({ open, showId, showName, onClose }: ShowSettingDialogProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const deleteShowMutation = useDeleteShow();

  const handleHideShow = () => {
    // TODO: 공연 미노출 API 연동
    toast.success('공연 미노출 처리되었습니다.');
  };

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
              onClickHostList={() => push(STEP.HOST_LIST)}
              onClickHideShow={handleHideShow}
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
            <DeleteShowConfirm showName={showName} onConfirm={handleDeleteShow} />
          ),
        },
      }}
    />
  );
};

export default ShowSettingDialog;
