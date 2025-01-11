import { useDeleteShow, useShowDetail } from '@boolti/api';
import ShowDeleteForm from '../ShowDeleteForm';
import { useToast } from '@boolti/ui';

interface ShowDeleteDialogContentProps {
  showId: number;
}

const ShowDeleteDialogContent: React.FC<ShowDeleteDialogContentProps> = ({ showId }) => {
  const { data: show } = useShowDetail(showId);
  const deleteShowMutation = useDeleteShow();

  const toast = useToast();

  if (!show) return;

  return (
    <ShowDeleteForm
      showName={show.name}
      onSubmit={async () => {
        try {
          await deleteShowMutation.mutateAsync(showId);
          toast.success('공연을 삭제했습니다.');
        } catch (_) {
          toast.error('공연을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.');
        }
      }}
    />
  );
};

export default ShowDeleteDialogContent;
