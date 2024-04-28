import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout } from '@boolti/api';
import { BooltiSmallLogo } from '@boolti/icon';
import { Button, Card, Dropdown, Flex, Layout, Menu, Pagination, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

const { Content, Header } = Layout;

const headerItems: React.ComponentProps<typeof Menu>['items'] = [
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '로그아웃',
    style: { marginLeft: 'auto' },
  },
];

const selectItems = [
  { key: '1', label: '전체' },
  { key: '2', label: '판매 전' },
  { key: '3', label: '판매 중' },
  { key: '4', label: '판매 종료' },
  { key: '5', label: '정산 필요' },
  { key: '6', label: '정산 중' },
  { key: '7', label: '정산 완료' },
];

const HomePage = () => {
  const { mutateAsync } = useAdminLogout();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('1');
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <BooltiSmallLogo />
        <Menu
          style={{ flex: 1, minWidth: 0 }}
          selectable={false}
          theme="dark"
          mode="horizontal"
          items={headerItems}
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
            <Typography.Title level={3} style={{ marginBottom: 36 }}>
              공연목록
            </Typography.Title>

            <Dropdown
              trigger={['click']}
              menu={{
                items: selectItems,
                selectable: true,
                defaultSelectedKeys: ['1'],
                onClick: (e) => {
                  setSelectedItem(e.key);
                },
              }}
            >
              <Button
                style={{ marginBottom: 24, width: 130, textAlign: 'left', marginLeft: 'auto' }}
              >
                <Flex align="center" justify="space-between">
                  {selectItems.find(({ key }) => key === selectedItem)?.label}
                  <DownOutlined />
                </Flex>
              </Button>
            </Dropdown>

            <Flex gap="small" wrap="wrap">
              <Card title="Card title" style={{ width: 'calc(50% - 4px)' }}>
                Card content
              </Card>

              <Card title="Card title" style={{ width: 'calc(50% - 4px)' }}>
                Card content
              </Card>

              <Card title="Card title" style={{ width: 'calc(50% - 4px)' }}>
                Card content
              </Card>

              <Card title="Card title" style={{ width: 'calc(50% - 4px)' }}>
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
