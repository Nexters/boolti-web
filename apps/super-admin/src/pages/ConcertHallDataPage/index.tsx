import { CheckCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { useSuperAdminConcertHallShows } from '@boolti/api';
import { Plus } from '@boolti/icon/src/components/Plus';
import { Button as BooltiButton } from '@boolti/ui';
import {
  SuperAdminConcertHallShowItem,
  SuperAdminConcertHallShowSortBy,
} from '@boolti/api/src/types/superAdminConcertHall';
import { useTheme } from '@emotion/react';
import { Button, Card, Flex, Select, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ConcertHallPageLayout from '~/components/ConcertHallPageLayout';
import AddShowDataModal from './AddShowDataModal';
import DeleteShowConfirmModal from './DeleteShowConfirmModal';

const PAGE_SIZE = 10;

const ConcertHallDataPage = () => {
  const params = useParams<{ hallId: string }>();
  const hallId = Number(params.hallId);
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState<SuperAdminConcertHallShowSortBy>('CREATED_AT');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SuperAdminConcertHallShowItem | null>(null);

  const { data, refetch } = useSuperAdminConcertHallShows(
    hallId,
    currentPage,
    PAGE_SIZE,
    sortBy,
    'DESC',
  );
  const { items = [], totalElements = 0 } = data ?? {};

  const columns: ColumnsType<SuperAdminConcertHallShowItem> = [
    {
      title: '공연일',
      dataIndex: 'showDate',
      key: 'showDate',
      width: 120,
      render: (showDate: string) => format(new Date(showDate), 'yyyy.MM.dd'),
    },
    {
      title: '공연명',
      dataIndex: 'showName',
      key: 'showName',
      ellipsis: true,
    },
    {
      title: '주최자',
      dataIndex: 'hostName',
      key: 'hostName',
      width: 120,
      render: (hostName?: string) => hostName ?? '-',
    },
    {
      title: '불티 연결',
      dataIndex: 'isLinked',
      key: 'isLinked',
      width: 100,
      align: 'center',
      render: (isLinked: boolean) =>
        isLinked ? (
          <CheckCircleFilled style={{ color: theme.palette.primary.o1, fontSize: 18 }} />
        ) : (
          '-'
        ),
    },
    {
      key: 'delete',
      width: 60,
      align: 'center',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => setDeleteTarget(record)}
          aria-label="공연 삭제"
        />
      ),
    },
  ];

  const onChanged = () => {
    // 마지막 페이지의 유일한 항목이 삭제되면 빈 페이지가 되지 않도록 이전 페이지로 이동한다.
    if (items.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      refetch();
    }
  };

  return (
    <ConcertHallPageLayout title="데이터 연결">
      <Card>
        {/* 카드 헤더 수치는 Figma node 9160:11962 기준 */}
        <Flex justify="space-between" align="flex-start" gap={12} style={{ marginBottom: 16 }}>
          <Flex vertical gap={4}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              공연
            </Typography.Title>
            <Typography.Text style={{ color: theme.palette.grey.g60 }}>
              해당 공연장에서 진행된 공연의 데이터를 관리합니다.
            </Typography.Text>
          </Flex>
          <BooltiButton
            colorTheme="netural"
            size="medium"
            icon={<Plus />}
            onClick={() => setIsAddModalOpen(true)}
          >
            추가하기
          </BooltiButton>
        </Flex>
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
          <Typography.Text strong>총 {totalElements}개</Typography.Text>
          <Select
            value={sortBy}
            style={{ width: 120 }}
            options={[
              { value: 'CREATED_AT', label: '최신 순' },
              { value: 'SHOW_DATE', label: '공연일 순' },
            ]}
            onChange={(value) => {
              setSortBy(value);
              setCurrentPage(0);
            }}
          />
        </Flex>
        <Table
          rowKey="concertHallShowId"
          columns={columns}
          dataSource={items}
          locale={{ emptyText: '아직 이 공연장과 연결된 데이터가 없어요.' }}
          pagination={{
            current: currentPage + 1,
            pageSize: PAGE_SIZE,
            total: totalElements,
            showSizeChanger: false,
            hideOnSinglePage: true,
            position: ['bottomCenter'],
            onChange: (page) => setCurrentPage(page - 1),
          }}
        />
      </Card>

      <AddShowDataModal
        open={isAddModalOpen}
        hallId={hallId}
        onClose={() => setIsAddModalOpen(false)}
        onAdded={() => refetch()}
      />
      <DeleteShowConfirmModal
        open={deleteTarget !== null}
        hallId={hallId}
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={onChanged}
      />
    </ConcertHallPageLayout>
  );
};

export default ConcertHallDataPage;
