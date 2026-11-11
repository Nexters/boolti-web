import { LoginOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdmingLogin } from '@boolti/api';
import { BooltiLogo } from '@boolti/icon';
import { App, Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { PATH } from '~/constants/routes';

import Styled from './LoginPage.styles';

interface FieldType {
  id?: string;
  pw?: string;
}

function LoginPage() {
  const { mutateAsync, isLoading } = useAdmingLogin();
  const { message } = App.useApp();
  const location = useLocation();

  useEffect(() => {
    if ((location.state as { passwordChanged?: boolean } | null)?.passwordChanged) {
      message.success('비밀번호를 바꿨어요. 새 비밀번호로 다시 로그인해 주세요.');
    }
  }, [location.state, message]);

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.LogoContainer>
          <BooltiLogo />
        </Styled.LogoContainer>
        <Form
          name="login-form"
          labelCol={{ span: 8, style: { margin: '0 auto' } }}
          wrapperCol={{ span: 16, style: { margin: '0 auto' } }}
          style={{ maxWidth: 400, width: '100%' }}
          layout="vertical"
          onFinish={async (values) => {
            try {
              const { id, pw } = values;
              const { accessToken, refreshToken, passwordChangeRequired } = await mutateAsync({
                id,
                pw,
              });

              window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
              window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);

              // 인증 가드가 localStorage를 렌더 시점에만 읽어(비반응형) SPA 네비게이션으로는
              // 즉시 전환되지 않으므로, 하드 리다이렉트로 앱을 새로 부팅해 새 토큰을 읽게 한다.
              // 임시 비밀번호로 로그인했으면 다른 API가 막혀 있으므로 변경 화면부터 연다.
              window.location.replace(passwordChangeRequired ? PATH.PASSWORD_CHANGE : PATH.INDEX);
            } catch (e) {
              message.error('로그인에 실패했습니다.');
            }
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="PASSWORD"
            name="pw"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16, style: { margin: '0 auto' } }}>
            <Button
              icon={<LoginOutlined />}
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? '로그인 중...' : 'LOGIN'}
            </Button>
          </Form.Item>
        </Form>
      </Styled.Content>
    </Styled.Container>
  );
}

export default LoginPage;
