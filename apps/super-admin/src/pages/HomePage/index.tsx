import { LogoutOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout } from '@boolti/api';
import { BooltiSmallLogo } from '@boolti/icon';
import { Card, Flex, Layout, Menu, Pagination, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

const { Content, Header } = Layout;

const items: React.ComponentProps<typeof Menu>['items'] = [
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '로그아웃',
    style: { marginLeft: 'auto' },
  },
];

const HomePage = () => {
  const { mutateAsync } = useAdminLogout();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <BooltiSmallLogo />
        <Menu
          style={{ flex: 1, minWidth: 0 }}
          selectable={false}
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={async (e) => {
            switch (e.key) {
              case 'logout': {
                try {
                  await mutateAsync();
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Flex vertical>
            <Typography.Title level={3} style={{ marginBottom: 32 }}>
              공연목록
            </Typography.Title>
            <Flex gap="small" wrap="wrap">
              <Card title="Card title" style={{ width: 'calc(50% - 8px)' }}>
                Card content
              </Card>

              <Card title="Card title" style={{ width: 'calc(50% - 8px)' }}>
                Card content
              </Card>

              <Card title="Card title" style={{ width: 'calc(50% - 8px)' }}>
                Card content
              </Card>

              <Card title="Card title" style={{ width: 'calc(50% - 8px)' }}>
                Card content
              </Card>
            </Flex>
          </Flex>

          <Pagination style={{ marginTop: 'auto' }} defaultCurrent={1} total={1} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
