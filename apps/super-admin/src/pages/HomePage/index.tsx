import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout, useAdminShowList } from '@boolti/api';
import { SuperAdminShowStatus } from '@boolti/api/src/types/adminShow';
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

const selectItems: Array<{ key: SuperAdminShowStatus | 'ALL'; label: string }> = [
  { key: 'ALL', label: '전체' },
  { key: 'SALES_BEFORE', label: '판매 전' },
  { key: 'SALES_IN_PROGRESS', label: '판매 중' },
  { key: 'SALES_END', label: '판매 종료' },
  { key: 'SETTLEMENT_REQUIRED', label: '정산 필요' },
  { key: 'SETTLEMENT_IN_PROGRESS', label: '정산 중' },
  { key: 'SETTLEMENT_DONE', label: '정산 완료' },
];

const HomePage = () => {
  const { mutateAsync } = useAdminLogout();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<SuperAdminShowStatus | 'ALL'>('ALL');
  const { isLoading, data } = useAdminShowList(
    0,
    selectedItem === 'ALL' ? undefined : selectedItem,
  );
  const { content = [] } = data ?? {};
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
          {!isLoading && (
            <>
              <Flex vertical>
                <Typography.Title level={3} style={{ marginBottom: 36 }}>
                  공연목록
                </Typography.Title>

                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: selectItems,
                    selectable: true,
                    defaultSelectedKeys: ['ALL'],
                    onClick: (e) => {
                      setSelectedItem(e.key as SuperAdminShowStatus | 'ALL');
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
                  {content.map(
                    ({
                      id,
                      showName,
                      thumbnailPath,
                      hostName,
                      superAdminShowStatus,
                      date,
                      salesStartTime,
                      salesEndTime,
                    }) => (
                      <Card title={showName} extra={id} style={{ width: 'calc(50% - 4px)' }}>
                        <Flex>
                          <div
                            style={{
                              width: 120,
                              height: 160,
                              borderRadius: 8,
                              backgroundImage: `url(${thumbnailPath})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                          <Flex vertical>
                            <Flex>{superAdminShowStatus}</Flex>
                            <Flex>판매자: {hostName}</Flex>
                            <Flex>공연일시: {date}</Flex>
                            <Flex>
                              판매 기간: {salesStartTime}~{salesEndTime}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Card>
                    ),
                  )}
                </Flex>
              </Flex>

              <Pagination style={{ marginTop: 'auto' }} defaultCurrent={1} total={1} />
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
