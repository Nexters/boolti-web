import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOCAL_STORAGE, useAdminLogout, useAdminShowList } from '@boolti/api';
import { SuperAdminShowStatus } from '@boolti/api/src/types/adminShow';
import { useTheme } from '@emotion/react';
import {
  Button,
  Card,
  Dropdown,
  Flex,
  Input,
  Layout,
  Menu,
  Pagination,
  Space,
  Typography,
} from 'antd';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import StatusBadge from '~/components/StatusBadge/StatusBadge';

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

const HomePage = () => {
  const { Search } = Input;
  const theme = useTheme();
  const { mutateAsync } = useAdminLogout();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showNameOrHostName = searchParams.get('showNameOrHostName');
  const [selectedItem, setSelectedItem] = useState<SuperAdminShowStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const { isLoading, data } = useAdminShowList(
    currentPage - 1,
    selectedItem === 'ALL' ? undefined : selectedItem,
    showNameOrHostName ?? undefined,
  );
  const { content = [], totalElements = 0, totalPages = 0 } = data ?? {};

  const selectItems: Array<{
    key: SuperAdminShowStatus | 'ALL';
    label: string;
  }> = [
    { key: 'ALL', label: '전체' },
    {
      key: 'SALES_BEFORE',
      label: '판매 전',
    },
    {
      key: 'SALES_IN_PROGRESS',
      label: '판매 중',
    },
    {
      key: 'SALES_END',
      label: '판매 종료',
    },
    {
      key: 'SETTLEMENT_REQUIRED',
      label: '정산 필요',
    },
    {
      key: 'SETTLEMENT_IN_PROGRESS',
      label: '정산 중',
    },
    {
      key: 'SETTLEMENT_DONE',
      label: '정산 완료',
    },
  ];

  const onSearch = (value: string) => {
    navigate(`?showNameOrHostName=${value}`);
  };

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
          {!isLoading && (
            <>
              <Flex vertical>
                <Typography.Title level={3} style={{ marginBottom: 36 }}>
                  공연목록
                </Typography.Title>

                <Flex
                  justify="space-between"
                  style={{
                    marginBottom: 20,
                  }}
                >
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
                      style={{
                        width: 130,
                        height: 40,
                        textAlign: 'left',
                      }}
                    >
                      <Flex align="center" justify="space-between">
                        {selectItems.find(({ key }) => key === selectedItem)?.label}
                        <DownOutlined />
                      </Flex>
                    </Button>
                  </Dropdown>
                  <Search
                    style={{
                      width: 260,
                    }}
                    value={searchText}
                    size="large"
                    onChange={(e) => setSearchText(e.target.value)}
                    onSearch={onSearch}
                    placeholder="공연명, 주최자 이름"
                  />
                </Flex>
                <Flex gap="large" wrap="wrap" style={{ marginBottom: 20 }}>
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
                          key={id}
                          style={{ width: 'calc(50% - 12px)', cursor: 'pointer' }}
                          onClick={() => {
                            // TODO: 추후에 공연 기본 정보로 이동
                            navigate({
                              pathname: generatePath(PATH.PAYMENT, { showId: id.toString() }),
                            });
                          }}
                        >
                          <Flex>
                            <div
                              style={{
                                width: 86,
                                height: 120,
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
                              style={{ marginLeft: 16, flex: 1, overflow: 'hidden' }}
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
                                    gap: 8,
                                  }}
                                >
                                  {showName}
                                  <StatusBadge status={currentStatus?.key ?? 'SALES_BEFORE'} />
                                </Typography.Title>
                              </Flex>
                              <Flex vertical style={{ width: '100%', marginTop: 12 }}>
                                <Space size="middle">
                                  <Typography style={{ width: 60, color: theme.palette.grey.g60 }}>
                                    주최자
                                  </Typography>
                                  <Typography.Text ellipsis>{hostName}</Typography.Text>
                                </Space>
                                <Space size="middle">
                                  <Typography style={{ width: 60, color: theme.palette.grey.g60 }}>
                                    공연일시
                                  </Typography>
                                  <Typography.Text ellipsis>
                                    {format(date, 'yyyy.MM.dd (E)', { locale: ko })}
                                  </Typography.Text>
                                </Space>
                                <Space size="middle">
                                  <Typography
                                    style={{
                                      width: 60,
                                      color: theme.palette.grey.g60,
                                    }}
                                  >
                                    판매 기간
                                  </Typography>
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
