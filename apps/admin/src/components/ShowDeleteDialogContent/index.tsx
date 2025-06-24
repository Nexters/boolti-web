import { useDeleteShow, useShowDetail } from '@boolti/api';
import ShowDeleteForm from '../ShowDeleteForm';
import { useToast } from '@boolti/ui';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

interface ShowDeleteDialogContentProps {
  showId: number;
  onDeleteShow?: () => void;
}

const ShowDeleteDialogContent: React.FC<ShowDeleteDialogContentProps> = ({
  showId,
  onDeleteShow,
}) => {
  const navigate = useNavigate();

  const { data: show } = useShowDetail(showId);
  const deleteShowMutation = useDeleteShow();

  const toast = useToast();

  useBodyScrollLock();

  if (!show) return;

  return (
    <ShowDeleteForm
      showName={show.name}
      onSubmit={async () => {
        if (deleteShowMutation.isLoading) return;

        try {
          await deleteShowMutation.mutateAsync(showId);
          toast.success('공연을 삭제했습니다.');
          navigate(PATH.HOME);
          onDeleteShow?.();
        } catch (_) {
          toast.error('공연을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.');
        }
      }}
    />
  );
};

export default ShowDeleteDialogContent;
