import { useQueryClient, useSuperAdminCreateConcertHall, queryKeys } from '@boolti/api';
import { useToast } from '@boolti/ui';
import { Button, Input, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HREF } from '~/constants/routes';

interface ConcertHallCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConcertHallCreateDialog = ({ open, onClose }: ConcertHallCreateDialogProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const createConcertHall = useSuperAdminCreateConcertHall();

  const close = () => {
    setName('');
    onClose();
  };

  const onCreate = async () => {
    try {
      const { id } = await createConcertHall.mutateAsync(name.trim());
      await queryClient.invalidateQueries(queryKeys.superAdminConcertHall._def);
      toast.success('공연장을 생성했어요.');
      close();
      navigate(HREF.CONCERT_HALL_INFO(id));
    } catch {
      toast.error('공연장 생성 중 문제가 발생했습니다.');
    }
  };

  return (
    <Modal
      title="공연장 생성하기"
      open={open}
      onCancel={close}
      footer={
        <Button
          type="primary"
          disabled={name.trim().length === 0}
          loading={createConcertHall.isLoading}
          onClick={onCreate}
        >
          생성하기
        </Button>
      }
    >
      <Typography.Paragraph style={{ marginTop: 16, marginBottom: 16 }}>
        공연장명으로 공연장 프로필을 생성합니다.
        <br />* 공연장명은 국문으로 작성해주세요. (ex. ALIVE HALL → 얼라이브홀)
      </Typography.Paragraph>
      <Input
        size="large"
        placeholder="공연장명을 입력해 주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={() => {
          if (name.trim().length > 0 && !createConcertHall.isLoading) {
            onCreate();
          }
        }}
        style={{ marginBottom: 8 }}
      />
    </Modal>
  );
};

export default ConcertHallCreateDialog;
