import { LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout } from '@boolti/api';
import { useTheme } from '@emotion/react';
import { Layout, Menu, Tabs } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PATH } from '~/constants/routes';
import ConcertHallListTab from './ConcertHallListTab';
import ShowListTab from './ShowListTab';

const { Content, Header } = Layout;

const headerItems: React.ComponentProps<typeof Menu>['items'] = [
  {
    key: 'admin-users',
    icon: <TeamOutlined />,
    label: '계정 관리',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '로그아웃',
    style: { marginLeft: 'auto' },
  },
];

type HomeTabKey = 'shows' | 'concert-halls';

const HomePage = () => {
  const theme = useTheme();
  const { mutateAsync } = useAdminLogout();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab: HomeTabKey = searchParams.get('tab') === 'concert-halls' ? 'concert-halls' : 'shows';

  return (
    <Layout>
      <Header
        style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.grey.w }}
      >
        홈
        <Menu
          style={{ flex: 1, minWidth: 0, border: 'none' }}
          selectable={false}
          theme="light"
          mode="horizontal"
          items={headerItems}
          onClick={async (e) => {
            switch (e.key) {
              case 'admin-users': {
                navigate(PATH.ADMIN_USERS);
                break;
              }
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
            backgroundColor: theme.palette.grey.w,
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setSearchParams(key === 'concert-halls' ? { tab: key } : {});
            }}
            items={[
              { key: 'shows', label: '공연' },
              { key: 'concert-halls', label: '공연장' },
            ]}
            style={{ marginBottom: 20 }}
          />
          {activeTab === 'shows' ? <ShowListTab /> : <ConcertHallListTab />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
