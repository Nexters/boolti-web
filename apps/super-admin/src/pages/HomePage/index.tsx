import { LogoutOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout } from '@boolti/api';
import { BooltiSmallLogo } from '@boolti/icon';
import { Layout, Menu } from 'antd';
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
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ minHeight: '100vh', padding: '24px', overflow: 'initial' }}></Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
