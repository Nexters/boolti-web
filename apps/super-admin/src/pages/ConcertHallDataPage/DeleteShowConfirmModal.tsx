import { useSuperAdminDeleteConcertHallShow } from '@boolti/api';
import { SuperAdminConcertHallShowItem } from '@boolti/api/src/types/superAdminConcertHall';
import { useToast } from '@boolti/ui';
import { Button, Flex, Input, Modal, Typography } from 'antd';
import { useState } from 'react';

interface DeleteShowConfirmModalProps {
  open: boolean;
  hallId: number;
  target: SuperAdminConcertHallShowItem | null;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteShowConfirmModal = ({
  open,
  hallId,
  target,
  onClose,
  onDeleted,
}: DeleteShowConfirmModalProps) => {
  const toast = useToast();
  const [inputName, setInputName] = useState('');
  const deleteShow = useSuperAdminDeleteConcertHallShow();

  const isMatched = target !== null && inputName === target.showName;

  const close = () => {
    setInputName('');
    onClose();
  };

  const onDelete = async () => {
    if (!target) {
      return;
    }
    try {
      await deleteShow.mutateAsync({ hallId, concertHallShowId: target.concertHallShowId });
      toast.success('공연을 삭제했어요.');
      onDeleted();
      close();
    } catch {
      toast.error('공연 삭제 중 문제가 발생했습니다.');
    }
  };

  return (
    <Modal
      title="공연 삭제"
      open={open}
      onCancel={close}
      footer={
        <Button danger type="primary" disabled={!isMatched} loading={deleteShow.isLoading} onClick={onDelete}>
          삭제하기
        </Button>
      }
    >
      <Typography.Paragraph style={{ marginTop: 16 }}>
        공연을 삭제하시려면 정확한 공연명을 입력해 주세요.
        <br />* 삭제 시 작성했던 공연 정보는 전부 사라지며 복구할 수 없어요.
      </Typography.Paragraph>
      <Flex vertical gap={8} style={{ marginBottom: 8 }}>
        <Input
          size="large"
          placeholder="공연명을 입력해 주세요"
          value={inputName}
          status={inputName.length > 0 && !isMatched ? 'error' : undefined}
          onChange={(e) => setInputName(e.target.value)}
        />
        {inputName.length > 0 && !isMatched && (
          <Typography.Text type="danger">공연명이 일치하지 않아요.</Typography.Text>
        )}
      </Flex>
    </Modal>
  );
};

export default DeleteShowConfirmModal;
