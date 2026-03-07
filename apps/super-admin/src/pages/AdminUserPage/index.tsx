import { LogoutOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout, useSuperAdminUserList, useSuperAdminCreateUser } from '@boolti/api';
import { useTheme } from '@emotion/react';
import {
  App,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Table,
  Tag,
  Typography,
} from 'antd';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

const { Content, Header } = Layout;

const AdminUserPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { mutateAsync: logout } = useAdminLogout();
  const { isLoading, data: users = [] } = useSuperAdminUserList();
  const { mutateAsync: createUser, isLoading: isCreating } = useSuperAdminCreateUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const headerItems: React.ComponentProps<typeof Menu>['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '홈',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      style: { marginLeft: 'auto' },
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '아이디',
      dataIndex: 'identity',
      key: 'identity',
    },
    {
      title: '상태',
      dataIndex: 'active',
      key: 'active',
      width: 100,
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'default'}>{active ? '활성' : '비활성'}</Tag>
      ),
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (createdAt: string) =>
        format(new Date(createdAt), 'yyyy.MM.dd HH:mm', { locale: ko }),
    },
  ];

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await createUser(values);
      message.success('계정이 생성되었습니다.');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        message.error('계정 생성에 실패했습니다.');
      }
    }
  };

  return (
    <Layout>
      <Header
        style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.grey.w }}
      >
        <TeamOutlined style={{ marginRight: 8 }} />
        계정 관리
        <Menu
          style={{ flex: 1, minWidth: 0, border: 'none' }}
          selectable={false}
          theme="light"
          mode="horizontal"
          items={headerItems}
          onClick={async (e) => {
            switch (e.key) {
              case 'home': {
                navigate(PATH.INDEX);
                break;
              }
              case 'logout': {
                try {
                  await logout();
                } finally {
                  window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
                  window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
                  navigate(PATH.LOGIN);
                }
                break;
              }
            }
          }}
        />
      </Header>
      <Layout>
        <Content
          style={{
            minHeight: 'calc(100vh - 64px)',
            padding: '36px 50px',
            overflow: 'initial',
            backgroundColor: theme.palette.grey.w,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              슈퍼관리자 계정 목록
            </Typography.Title>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              계정 추가
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={isLoading}
            pagination={false}
          />

          <Modal
            title="슈퍼관리자 계정 추가"
            open={isModalOpen}
            onOk={handleCreate}
            onCancel={() => {
              setIsModalOpen(false);
              form.resetFields();
            }}
            confirmLoading={isCreating}
            okText="생성"
            cancelText="취소"
          >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
              <Form.Item
                name="identity"
                label="아이디"
                rules={[{ required: true, message: '아이디를 입력해주세요' }]}
              >
                <Input placeholder="아이디 입력" />
              </Form.Item>
              <Form.Item
                name="password"
                label="비밀번호"
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              >
                <Input.Password placeholder="비밀번호 입력" />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminUserPage;
