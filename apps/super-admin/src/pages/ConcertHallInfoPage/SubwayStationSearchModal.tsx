import { useSubwayStationSearch } from '@boolti/api';
import { SubwayStationSearchItem } from '@boolti/api/src/types/superAdminConcertHall';
import { useTheme } from '@emotion/react';
import { Empty, Flex, Input, Modal, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Search } = Input;

interface SubwayStationSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (station: SubwayStationSearchItem) => void;
}

const SubwayStationSearchModal = ({ open, onClose, onSelect }: SubwayStationSearchModalProps) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const { data: stations = [], isFetching } = useSubwayStationSearch(debouncedText);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(searchText.trim());
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchText]);

  const close = () => {
    setSearchText('');
    setDebouncedText('');
    onClose();
  };

  return (
    <Modal title="인근 지하철역 추가하기" open={open} onCancel={close} footer={null} width={490}>
      <Search
        size="large"
        placeholder="예) 합정"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ margin: '16px 0' }}
      />
      <div style={{ minHeight: 240, maxHeight: 400, overflowY: 'auto' }}>
        {debouncedText.length > 0 && !isFetching && stations.length === 0 && (
          <Empty description="검색 결과가 없어요." style={{ marginTop: 60 }} />
        )}
        {stations.map((station) => (
          <Flex
            key={station.stationId}
            align="center"
            justify="space-between"
            onClick={() => {
              onSelect(station);
              close();
            }}
            style={{
              padding: '12px 8px',
              cursor: 'pointer',
              borderBottom: `1px solid ${theme.palette.grey.g10}`,
            }}
          >
            <Flex align="center" gap={8}>
              <Typography.Text strong>{station.stationName}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {station.region}
              </Typography.Text>
            </Flex>
            <Flex gap={4}>
              {station.lines.map((line) => (
                <Tag key={line.lineId} color={line.colorHex} style={{ marginInlineEnd: 0 }}>
                  {line.lineName}
                </Tag>
              ))}
            </Flex>
          </Flex>
        ))}
      </div>
    </Modal>
  );
};

export default SubwayStationSearchModal;
