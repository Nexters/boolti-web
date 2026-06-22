import { PlusOutlined } from '@ant-design/icons';
import { useSuperAdminConcertHallList } from '@boolti/api';
import { useTheme } from '@emotion/react';
import { Button, Card, Empty, Flex, Input, Pagination, Space, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConcertHallCreateDialog from '~/components/ConcertHallCreateDialog/ConcertHallCreateDialog';
import { HREF } from '~/constants/routes';

const { Search } = Input;

const PAGE_SIZE = 20;

const ConcertHallListTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { isLoading, data } = useSuperAdminConcertHallList(
    currentPage - 1,
    PAGE_SIZE,
    keyword || undefined,
  );
  const { items = [], totalElements = 0, totalPages = 0 } = data ?? {};

  const onSearch = (value: string) => {
    setKeyword(value.trim());
    setCurrentPage(1);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Flex vertical>
        <Flex justify="space-between" style={{ marginBottom: 20 }}>
          <Search
            style={{ width: 260 }}
            value={searchText}
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={onSearch}
            placeholder="공연장명"
          />
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            생성하기
          </Button>
        </Flex>
        {items.length === 0 ? (
          <Empty description="등록된 공연장이 없어요." style={{ marginTop: 80 }} />
        ) : (
          <Flex gap="large" wrap="wrap" style={{ marginBottom: 20 }}>
            {items.map(({ id, name, address, isVisible }) => (
              <Card
                key={id}
                style={{ width: 'calc(50% - 12px)', cursor: 'pointer' }}
                onClick={() => {
                  navigate(HREF.CONCERT_HALL_INFO(id));
                }}
              >
                <Flex>
                  <div
                    style={{
                      width: 86,
                      height: 86,
                      flexShrink: 0,
                      borderRadius: 8,
                      backgroundColor: theme.palette.grey.g20,
                    }}
                  />
                  <Flex
                    vertical
                    justify="space-between"
                    style={{ marginLeft: 16, flex: 1, overflow: 'hidden' }}
                  >
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
                      {name}
                      {!isVisible && <Tag>미노출</Tag>}
                    </Typography.Title>
                    <Space size="middle" style={{ marginTop: 12 }}>
                      <Typography style={{ width: 60, color: theme.palette.grey.g60 }}>
                        주소
                      </Typography>
                      <Typography.Text ellipsis>{address ?? '-'}</Typography.Text>
                    </Space>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
      </Flex>

      {totalPages > 0 && (
        <Pagination
          style={{ marginTop: 'auto' }}
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={totalElements}
          showSizeChanger={false}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      )}

      <ConcertHallCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </>
  );
};

export default ConcertHallListTab;
