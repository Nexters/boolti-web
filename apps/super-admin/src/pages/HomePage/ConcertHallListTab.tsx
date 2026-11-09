import { PlusOutlined } from '@ant-design/icons';
import { useSuperAdminConcertHallList } from '@boolti/api';
import { useTheme } from '@emotion/react';
import { Button, Card, Empty, Flex, Input, Pagination, Space, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import ConcertHallCreateDialog from '~/components/ConcertHallCreateDialog/ConcertHallCreateDialog';
import { HREF } from '~/constants/routes';

const { Search } = Input;

const PAGE_SIZE = 20;

/** informationUpdatedAt은 미수정 공연장이면 null로 내려온다. */
const formatUpdatedAt = (iso?: string | null) => {
  if (!iso) {
    return '-';
  }

  const date = new Date(iso);

  return Number.isNaN(date.getTime()) ? '-' : format(date, 'yyyy.MM.dd');
};

const ConcertHallListTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  // 검색어와 페이지를 URL에 두어 공연장 페이지에서 돌아올 때 위치가 유지되도록 한다.
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const [searchText, setSearchText] = useState(keyword);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { isLoading, data } = useSuperAdminConcertHallList(
    currentPage - 1,
    PAGE_SIZE,
    keyword || undefined,
  );
  const { items = [], totalElements = 0, totalPages = 0 } = data ?? {};

  const updateSearchParams = (next: { keyword?: string; page?: number }) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'concert-halls');

    if (next.keyword !== undefined) {
      if (next.keyword) {
        params.set('keyword', next.keyword);
      } else {
        params.delete('keyword');
      }
    }

    if (next.page !== undefined) {
      if (next.page > 1) {
        params.set('page', String(next.page));
      } else {
        params.delete('page');
      }
    }

    setSearchParams(params);
  };

  const onSearch = (value: string) => {
    updateSearchParams({ keyword: value.trim(), page: 1 });
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
            {items.map(({ id, name, address, isVisible, thumbnailUrl, informationUpdatedAt }) => (
              <Card
                key={id}
                style={{ width: 'calc(50% - 12px)', cursor: 'pointer' }}
                onClick={() => {
                  navigate(HREF.CONCERT_HALL_INFO(id), {
                    state: { from: `${location.pathname}${location.search}` },
                  });
                }}
              >
                <Flex>
                  <div
                    style={{
                      width: 86,
                      height: 86,
                      flexShrink: 0,
                      borderRadius: 8,
                      overflow: 'hidden',
                      backgroundColor: theme.palette.grey.g20,
                    }}
                  >
                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
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
                    <Flex vertical gap={4} style={{ marginTop: 12 }}>
                      <Space size="middle">
                        <Typography style={{ width: 60, color: theme.palette.grey.g60 }}>
                          주소
                        </Typography>
                        <Typography.Text ellipsis>{address || '-'}</Typography.Text>
                      </Space>
                      <Space size="middle">
                        <Typography style={{ width: 60, color: theme.palette.grey.g60 }}>
                          업데이트
                        </Typography>
                        <Typography.Text>{formatUpdatedAt(informationUpdatedAt)}</Typography.Text>
                      </Space>
                    </Flex>
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
            updateSearchParams({ page });
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
