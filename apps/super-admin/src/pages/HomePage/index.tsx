import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout, useAdminShowList } from '@boolti/api';
import { SuperAdminShowStatus } from '@boolti/api/src/types/adminShow';
import { BooltiSmallLogo } from '@boolti/icon';
import {
  Badge,
  Button,
  Card,
  Divider,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Pagination,
  Space,
  Typography,
} from 'antd';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

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

const selectItems: Array<{ key: SuperAdminShowStatus | 'ALL'; label: string; color: string }> = [
  { key: 'ALL', label: '전체', color: 'blue' },
  { key: 'SALES_BEFORE', label: '판매 전', color: 'purple' },
  { key: 'SALES_IN_PROGRESS', label: '판매 중', color: 'cyan' },
  { key: 'SALES_END', label: '판매 종료', color: 'green' },
  { key: 'SETTLEMENT_REQUIRED', label: '정산 필요', color: 'yellow' },
  { key: 'SETTLEMENT_IN_PROGRESS', label: '정산 중', color: 'red' },
  { key: 'SETTLEMENT_DONE', label: '정산 완료', color: 'gold' },
];

const HomePage = () => {
  const { mutateAsync } = useAdminLogout();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<SuperAdminShowStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data } = useAdminShowList(
    currentPage - 1,
    selectedItem === 'ALL' ? undefined : selectedItem,
  );
  const { content = [], totalElements = 0, totalPages = 0 } = data ?? {};
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
                <Flex gap="middle" wrap="wrap" style={{ marginBottom: 20 }}>
                  {content.map(
                    ({
                      id,
                      showName,
                      thumbnailPath,
                      hostName,
                      superAdminShowStatus,
                      date,
                      salesStartTime = '',
                      salesEndTime = '',
                    }) => {
                      const currentStatus = selectItems.find(
                        ({ key }) => key === superAdminShowStatus,
                      );
                      return (
                        <Card
                          style={{ width: 'calc(50% - 8px)', cursor: 'pointer' }}
                          onClick={() => {
                            navigate({ pathname: generatePath(PATH.SETTLEMENT, { showId: id.toString() }) })
                          }}
                        >
                          <Flex>
                            <div
                              style={{
                                width: 120,
                                height: 160,
                                flexShrink: 0,
                                borderRadius: 8,
                                backgroundImage: `url(${thumbnailPath})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                              }}
                            />
                            <Flex
                              vertical
                              justify="space-between"
                              style={{ marginLeft: 12, flex: 1, overflow: 'hidden' }}
                            >
                              <Flex vertical>
                                <Typography>{id}</Typography>
                                <Typography.Title
                                  level={5}
                                  style={{
                                    margin: 0,
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                  }}
                                >
                                  {showName}
                                  <Badge
                                    style={{ marginLeft: 8 }}
                                    count={currentStatus?.label}
                                    color={currentStatus?.color}
                                  />
                                </Typography.Title>
                              </Flex>
                              <Flex vertical style={{ width: '100%' }}>
                                <Space split={<Divider type="vertical" />}>
                                  <Typography style={{ width: 60 }}>주최자</Typography>
                                  <Typography.Text ellipsis>{hostName}</Typography.Text>
                                </Space>
                                <Space split={<Divider type="vertical" />}>
                                  <Typography style={{ width: 60 }}>공연일시</Typography>
                                  <Typography.Text ellipsis>
                                    {format(date, 'yyyy.MM.dd (E)', { locale: ko })}
                                  </Typography.Text>
                                </Space>
                                <Space split={<Divider type="vertical" />}>
                                  <Typography style={{ width: 60 }}>판매 기간</Typography>
                                  <Typography.Text ellipsis>
                                    {format(salesStartTime, 'yyyy.MM.dd (E)', { locale: ko })}~
                                    {format(salesEndTime, 'yyyy.MM.dd (E)', { locale: ko })}
                                  </Typography.Text>
                                </Space>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Card>
                      );
                    },
                  )}
                </Flex>
              </Flex>

              {totalPages > 0 && (
                <Pagination
                  style={{ marginTop: 'auto' }}
                  current={currentPage}
                  total={totalElements}
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}
                />
              )}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
