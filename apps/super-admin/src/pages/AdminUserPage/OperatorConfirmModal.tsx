import {
  SuperAdminManageAction,
  SuperAdminUserResponse,
  useSuperAdminManageUser,
} from '@boolti/api';
import { App, Form, Input, Modal, Typography } from 'antd';

import { getServerErrorDetail } from '~/utils/password';

export interface OperatorTarget {
  user: SuperAdminUserResponse;
  action: SuperAdminManageAction;
}

interface OperatorConfirmModalProps {
  target: OperatorTarget | null;
  onClose: () => void;
}

const ACTION_COPY: Record<
  SuperAdminManageAction,
  { title: string; okText: string; description: (identity: string) => string; success: string }
> = {
  'password-reset': {
    title: '비밀번호 초기화',
    okText: '초기화',
    description: (identity) =>
      `${identity} 계정의 비밀번호를 임시 비밀번호로 초기화해요. 이 계정은 다음 로그인 때 새 비밀번호로 바꿔야 해요.`,
    success: '임시 비밀번호로 초기화했어요. 임시 비밀번호는 디스코드로 전달해 주세요.',
  },
  deactivate: {
    title: '계정 비활성화',
    okText: '비활성화',
    description: (identity) =>
      `${identity} 계정을 비활성화해요. 이 계정은 로그인할 수 없고, 모든 기기에서 로그아웃돼요. 나중에 다시 활성화할 수 있어요.`,
    success: '계정을 비활성화했어요.',
  },
  activate: {
    title: '계정 재활성화',
    okText: '재활성화',
    description: (identity) =>
      `${identity} 계정을 다시 활성화해요. 비활성화할 때 끊긴 로그인은 복구되지 않아 새로 로그인해야 해요.`,
    success: '계정을 다시 활성화했어요.',
  },
};

interface OperatorFields {
  requesterCurrentPassword: string;
}

/** 다른 계정 관리(초기화, 비활성화, 재활성화) 전에 요청자 본인 비밀번호를 다시 받는다. */
const OperatorConfirmModal = ({ target, onClose }: OperatorConfirmModalProps) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<OperatorFields>();
  const { mutateAsync, isLoading } = useSuperAdminManageUser();

  const copy = target ? ACTION_COPY[target.action] : null;

  const handleClose = () => {
    if (isLoading) return;
    form.resetFields();
    onClose();
  };

  const handleOk = async () => {
    if (!target || !copy || isLoading) return;

    let values: OperatorFields;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    try {
      await mutateAsync({
        userId: target.user.id,
        action: target.action,
        requesterCurrentPassword: values.requesterCurrentPassword,
      });
    } catch (error) {
      const detail = await getServerErrorDetail(error);
      message.error(detail ?? '처리하지 못했어요. 내 비밀번호를 확인하고 다시 시도해 주세요.');
      return;
    }

    message.success(copy.success);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={copy?.title}
      open={target !== null}
      onOk={handleOk}
      onCancel={handleClose}
      okText={copy?.okText}
      cancelText="취소"
      okButtonProps={{ danger: target?.action === 'deactivate' }}
      confirmLoading={isLoading}
      maskClosable={!isLoading}
      destroyOnClose
    >
      {target && copy && (
        <>
          <Typography.Paragraph style={{ marginTop: 16 }}>
            {copy.description(target.user.identity)}
          </Typography.Paragraph>
          <Form form={form} layout="vertical" requiredMark={false} onFinish={handleOk}>
            <Form.Item
              name="requesterCurrentPassword"
              label="내 비밀번호"
              extra="본인 확인을 위해 지금 로그인한 계정의 비밀번호를 입력해 주세요."
              rules={[{ required: true, message: '내 비밀번호를 입력해 주세요.' }]}
            >
              <Input.Password autoComplete="current-password" autoFocus />
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default OperatorConfirmModal;
