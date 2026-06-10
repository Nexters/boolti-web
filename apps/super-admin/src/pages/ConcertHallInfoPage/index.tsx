import { PlusOutlined } from '@ant-design/icons';
import {
  useSuperAdminConcertHallDetail,
  useSuperAdminConcertHallSubwayStations,
  useSuperAdminSaveConcertHallSubwayStations,
} from '@boolti/api';
import { SubwayStationSearchItem } from '@boolti/api/src/types/superAdminConcertHall';
import { useToast } from '@boolti/ui';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '~/components/PageLayout/PageLayout';
import SubwayStationSearchModal from './SubwayStationSearchModal';

const { TextArea } = Input;

interface SelectedStation {
  stationId: number;
  stationName: string;
  region: string;
}

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
    {children}
  </Typography.Text>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 20 }}>
    {children}
  </Typography.Title>
);

const ConcertHallInfoPage = () => {
  const params = useParams<{ hallId: string }>();
  const hallId = Number(params.hallId);
  const toast = useToast();

  const { data: detail } = useSuperAdminConcertHallDetail(hallId);
  const { data: savedStations } = useSuperAdminConcertHallSubwayStations(hallId);
  const saveSubwayStations = useSuperAdminSaveConcertHallSubwayStations();

  const [stations, setStations] = useState<SelectedStation[]>([]);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);

  useEffect(() => {
    if (savedStations) {
      setStations(
        [...savedStations]
          .sort((a, b) => a.sequence - b.sequence)
          .map(({ stationId, stationName, region }) => ({ stationId, stationName, region })),
      );
    }
  }, [savedStations]);

  const onAddStation = (station: SubwayStationSearchItem) => {
    setStations((prev) => {
      if (prev.some(({ stationId }) => stationId === station.stationId)) {
        return prev;
      }
      return [
        ...prev,
        { stationId: station.stationId, stationName: station.stationName, region: station.region },
      ];
    });
  };

  const onSave = async () => {
    try {
      await saveSubwayStations.mutateAsync({
        hallId,
        stationIds: stations.map(({ stationId }) => stationId),
      });
      toast.success('인근 지하철역 정보를 저장했어요.');
    } catch {
      toast.error('저장 중 문제가 발생했습니다.');
    }
  };

  const amenities = detail?.amenities;
  const amenityItems: Array<{ label: string; checked: boolean; count?: number; unit?: string }> = [
    {
      label: '대기실',
      checked: amenities?.hasWaitingRoom ?? false,
      count: amenities?.waitingRoomCount,
      unit: '개',
    },
    {
      label: '주차',
      checked: amenities?.hasParking ?? false,
      count: amenities?.parkingCount,
      unit: '대',
    },
    {
      label: '캐비넷',
      checked: amenities?.hasCabinet ?? false,
      count: amenities?.cabinetCount,
      unit: '개',
    },
    { label: '2층 관객석', checked: amenities?.hasSecondFloorSeating ?? false },
    { label: '내부 화장실', checked: amenities?.hasIndoorRestroom ?? false },
    { label: '주류 판매', checked: amenities?.hasAlcoholSales ?? false },
  ];

  return (
    <PageLayout
      breadscrumb="공연장 관리 / 공연장 정보"
      title="공연장 정보"
      description="공연장 프로필에 노출되는 기본 정보를 관리합니다."
      action={
        <Button type="primary" size="large" loading={saveSubwayStations.isLoading} onClick={onSave}>
          저장하기
        </Button>
      }
    >
      <Alert
        type="info"
        showIcon
        message="공연장 정보 저장 API가 준비 중이에요. 현재는 인근 지하철역만 저장할 수 있어요."
        style={{ marginBottom: 20 }}
      />

      <Flex vertical gap={20}>
        <Card>
          <SectionTitle>기본 정보</SectionTitle>
          <Flex vertical gap={20} style={{ maxWidth: 600 }}>
            <div>
              <FieldLabel>공연장명</FieldLabel>
              <Input size="large" value={detail?.name ?? ''} disabled />
            </div>
            <div>
              <FieldLabel>공연장 주소</FieldLabel>
              <Flex vertical gap={8}>
                <Flex gap={8}>
                  <Input
                    size="large"
                    value={detail?.location?.streetAddress ?? ''}
                    placeholder="주소"
                    disabled
                  />
                  <Button size="large" disabled>
                    주소 찾기
                  </Button>
                </Flex>
                <Input
                  size="large"
                  value={detail?.floor ?? detail?.location?.detailAddress ?? ''}
                  placeholder="상세주소"
                  disabled
                />
              </Flex>
            </div>
            <div>
              <FieldLabel>인근 지하철역</FieldLabel>
              <Flex gap={8} wrap="wrap" align="center">
                {stations.map((station) => (
                  <Tag
                    key={station.stationId}
                    closable
                    onClose={(e) => {
                      e.preventDefault();
                      setStations((prev) =>
                        prev.filter(({ stationId }) => stationId !== station.stationId),
                      );
                    }}
                    style={{ marginInlineEnd: 0, padding: '4px 10px', fontSize: 14 }}
                  >
                    {station.stationName}
                  </Tag>
                ))}
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => setIsStationModalOpen(true)}
                >
                  추가하기
                </Button>
              </Flex>
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>문의처</SectionTitle>
          <Flex vertical gap={20} style={{ maxWidth: 600 }}>
            <div>
              <FieldLabel>웹사이트 URL</FieldLabel>
              <Input size="large" value={detail?.contact?.websiteUrl ?? ''} disabled />
            </div>
            <Flex gap={16}>
              <div style={{ flex: 1 }}>
                <FieldLabel>전화번호</FieldLabel>
                <Input size="large" value={detail?.contact?.phoneNumber ?? ''} disabled />
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>이메일</FieldLabel>
                <Input size="large" value={detail?.contact?.email ?? ''} disabled />
              </div>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>소개 및 사진</SectionTitle>
          <Flex vertical gap={20}>
            <div>
              <FieldLabel>소개</FieldLabel>
              <TextArea rows={5} value={detail?.introduction ?? ''} disabled />
            </div>
            <div>
              <FieldLabel>사진 (최대 20장 등록 가능)</FieldLabel>
              <Typography.Text type="secondary">
                이미지 업로드 API 준비 중이에요.
              </Typography.Text>
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>편의시설 및 서비스</SectionTitle>
          <Flex gap={24} wrap="wrap">
            {amenityItems.map(({ label, checked, count, unit }) => (
              <Flex key={label} align="center" gap={8} style={{ width: 200 }}>
                <Checkbox checked={checked} disabled>
                  {label}
                </Checkbox>
                {count !== undefined && (
                  <Typography.Text type="secondary">
                    {count}
                    {unit}
                  </Typography.Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Card>
      </Flex>

      <SubwayStationSearchModal
        open={isStationModalOpen}
        onClose={() => setIsStationModalOpen(false)}
        onSelect={onAddStation}
      />
    </PageLayout>
  );
};

export default ConcertHallInfoPage;
