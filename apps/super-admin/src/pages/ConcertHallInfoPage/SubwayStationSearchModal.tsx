import { useSubwayStationSearch } from '@boolti/api';
import { SubwayStationSearchItem } from '@boolti/api/src/types/superAdminConcertHall';
import { useTheme } from '@emotion/react';
import { Flex, Input, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';

import SubwayLineBadge from './SubwayLineBadge';

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

  const showEmpty = debouncedText.length > 0 && !isFetching && stations.length === 0;

  return (
    <Modal title="인근 지하철역 추가하기" open={open} onCancel={close} footer={null} width={490}>
      <Search
        size="large"
        placeholder="예) 합정"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ margin: '16px 0' }}
      />
      <div style={{ minHeight: 320, maxHeight: 440, overflowY: 'auto' }}>
        {showEmpty && (
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ paddingTop: 120, color: theme.palette.grey.g40 }}
          >
            <Typography.Text type="secondary">검색 결과가 없어요.</Typography.Text>
            <Typography.Text type="secondary">역이름을 변경해보세요.</Typography.Text>
          </Flex>
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
              padding: '14px 8px',
              cursor: 'pointer',
              borderBottom: `1px solid ${theme.palette.grey.g10}`,
            }}
          >
            <Typography.Text>{station.stationName}</Typography.Text>
            <Flex gap={4} align="center">
              {station.lines.map((line) => (
                <SubwayLineBadge key={line.lineId} line={line} />
              ))}
            </Flex>
          </Flex>
        ))}
      </div>
    </Modal>
  );
};

export default SubwayStationSearchModal;
