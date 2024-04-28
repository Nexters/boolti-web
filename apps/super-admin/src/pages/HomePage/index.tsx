import { LogoutOutlined } from '@ant-design/icons';
import { useAdminLogout } from '@boolti/api';
import { BooltiSmallLogo } from '@boolti/icon';
import { App, Layout, Menu } from 'antd';

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
  const { message } = App.useApp();
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
                } catch {
                  message.error('로그아웃에 실패했습니다.');
                }
                break;
              }
            }
          }}
        />
      </Header>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ minHeight: '100vh', padding: '24px', overflow: 'initial' }}></Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
