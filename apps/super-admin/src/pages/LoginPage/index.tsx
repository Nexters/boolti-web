import { LOCAL_STORAGE, useAdmingLogin } from '@boolti/api';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

import Styled from './LoginPage.styles';

interface FieldType {
  id?: string;
  pw?: string;
}

function LoginPage() {
  const { mutateAsync } = useAdmingLogin();
  const navigate = useNavigate();
  const { message } = App.useApp();
  return (
    <Styled.Container>
      <Styled.Content>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={async (values) => {
            try {
              const { id, pw } = values;
              const { accessToken, refreshToken } = await mutateAsync({ id, pw });

              window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
              window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);

              navigate(PATH.INDEX, { replace: true });
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Styled.Content>
    </Styled.Container>
  );
}

export default LoginPage;
