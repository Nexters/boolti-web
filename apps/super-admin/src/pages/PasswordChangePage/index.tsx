import { LockOutlined } from '@ant-design/icons';
import {
  LOCAL_STORAGE,
  useAdminLogout,
  useSuperAdminChangePassword,
  useSuperAdminMe,
} from '@boolti/api';
import { useTheme } from '@emotion/react';
import { Alert, App, Button, Card, Form, Input, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';
import { getNewPasswordError, getServerErrorDetail } from '~/utils/password';

interface PasswordChangeFields {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const PASSWORD_CHANGED_STATE = { passwordChanged: true } as const;

const clearTokens = () => {
  window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
  window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
};

const PasswordChangePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm<PasswordChangeFields>();
  const { data: me } = useSuperAdminMe();
  const { mutateAsync: changePassword, isLoading } = useSuperAdminChangePassword();
  const { mutateAsync: logout } = useAdminLogout();

  const isForced = me?.passwordChangeRequired === true;

  const handleFinish = async ({ currentPassword, newPassword }: PasswordChangeFields) => {
    try {
      await changePassword({ currentPassword, newPassword });
    } catch (error) {
      const detail = await getServerErrorDetail(error);
      message.error(detail ?? '비밀번호를 바꾸지 못했어요. 현재 비밀번호를 확인해 주세요.');
      return;
    }

    // 서버가 모든 기기의 로그인을 끊으므로 로그아웃 API 없이 토큰만 지우고 다시 로그인하게 한다.
    clearTokens();
    navigate(PATH.LOGIN, { replace: true, state: PASSWORD_CHANGED_STATE });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearTokens();
      navigate(PATH.LOGIN, { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '80px 16px',
        backgroundColor: theme.palette.grey.g10,
      }}
    >
      <Card style={{ width: '100%', maxWidth: 440 }}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            <LockOutlined style={{ marginRight: 8 }} />
            비밀번호 변경
          </Typography.Title>

          {isForced && (
            <Alert
              type="warning"
              showIcon
              message="임시 비밀번호로 로그인했어요"
              description="새 비밀번호로 바꿔야 다른 기능을 쓸 수 있어요."
            />
          )}

          <Form<PasswordChangeFields>
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleFinish}
            disabled={isLoading}
          >
            <Form.Item
              name="currentPassword"
              label={isForced ? '임시 비밀번호' : '현재 비밀번호'}
              rules={[{ required: true, message: '현재 비밀번호를 입력해 주세요.' }]}
            >
              <Input.Password autoComplete="current-password" autoFocus />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="새 비밀번호"
              extra="공백 없이 입력해 주세요. 현재 비밀번호와 달라야 해요."
              dependencies={['currentPassword']}
              rules={[
                {
                  validator: async (_, value: string = '') => {
                    const error = getNewPasswordError(value);
                    if (error) throw new Error(error);
                    if (value === form.getFieldValue('currentPassword')) {
                      throw new Error('현재 비밀번호와 다른 비밀번호를 입력해 주세요.');
                    }
                  },
                },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
            <Form.Item
              name="newPasswordConfirm"
              label="새 비밀번호 확인"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '새 비밀번호를 한 번 더 입력해 주세요.' },
                {
                  validator: async (_, value: string = '') => {
                    if (value && value !== form.getFieldValue('newPassword')) {
                      throw new Error('새 비밀번호와 같지 않아요.');
                    }
                  },
                },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Typography.Paragraph type="secondary" style={{ fontSize: 13 }}>
              바꾸면 모든 기기에서 로그아웃돼요. 새 비밀번호로 다시 로그인해 주세요.
            </Typography.Paragraph>

            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              {isForced ? (
                <Button onClick={handleLogout} disabled={false}>
                  로그아웃
                </Button>
              ) : (
                <Button onClick={() => navigate(-1)}>취소</Button>
              )}
              <Button type="primary" htmlType="submit" loading={isLoading}>
                변경하기
              </Button>
            </Space>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default PasswordChangePage;
