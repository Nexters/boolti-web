import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useSuperAdminConcertHallDetail,
  useSuperAdminConcertHallSubwayStations,
  useSuperAdminSaveConcertHallSubwayStations,
} from '@boolti/api';
import {
  SubwayStationSearchItem,
  SuperAdminSubwayLine,
} from '@boolti/api/src/types/superAdminConcertHall';
import { Button as BooltiButton, useToast } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  InputNumber,
  Typography,
} from 'antd';
import type { InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '~/components/PageLayout/PageLayout';
import alcoholIcon from '~/assets/amenities/alcohol.svg';
import cabinetIcon from '~/assets/amenities/cabinet.svg';
import parkingIcon from '~/assets/amenities/parking.svg';
import restroomIcon from '~/assets/amenities/restroom.svg';
import secondFloorIcon from '~/assets/amenities/second-floor.svg';
import waitingRoomIcon from '~/assets/amenities/waiting-room.svg';
import AddressSearchModal from './AddressSearchModal';
import ImageUploadBox from './ImageUploadBox';
import SubwayLineBadge from './SubwayLineBadge';
import SubwayStationSearchModal from './SubwayStationSearchModal';

const { TextArea } = Input;

const MAX_PHOTO_COUNT = 20;

const PHONE_NUMBER_REGEX = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AmenityIcon = ({ src, label }: { src: string; label: string }) => (
  <img src={src} alt={label} style={{ width: 18, height: 18, verticalAlign: 'middle' }} />
);

interface SelectedStation {
  stationId: number;
  stationName: string;
  lines: SuperAdminSubwayLine[];
}

interface AmenitiesState {
  hasWaitingRoom: boolean;
  waitingRoomCount?: number;
  hasParking: boolean;
  parkingCount?: number;
  hasCabinet: boolean;
  cabinetCount?: number;
  hasSecondFloorSeating: boolean;
  hasIndoorRestroom: boolean;
  hasAlcoholSales: boolean;
}

const INITIAL_AMENITIES: AmenitiesState = {
  hasWaitingRoom: false,
  hasParking: false,
  hasCabinet: false,
  hasSecondFloorSeating: false,
  hasIndoorRestroom: false,
  hasAlcoholSales: false,
};

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

// 이미지 우상단 모서리에 걸치는 다크 원형 삭제 버튼
const RemoveImageButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    style={{
      position: 'absolute',
      top: -8,
      right: -8,
      width: 24,
      height: 24,
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'rgba(18, 18, 21, 0.7)',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    <CloseOutlined style={{ fontSize: 12 }} />
  </button>
);

const ConcertHallInfoPage = () => {
  const params = useParams<{ hallId: string }>();
  const hallId = Number(params.hallId);
  const theme = useTheme();
  const toast = useToast();
  const detailAddressRef = useRef<InputRef>(null);

  const { data: detail } = useSuperAdminConcertHallDetail(hallId);
  const { data: savedStations } = useSuperAdminConcertHallSubwayStations(hallId);
  const saveSubwayStations = useSuperAdminSaveConcertHallSubwayStations();

  // 기본 정보
  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [stations, setStations] = useState<SelectedStation[]>([]);
  const [representativeImage, setRepresentativeImage] = useState<string | null>(null);

  // 문의처 / 소개 및 사진
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  // 편의시설 및 서비스
  const [amenities, setAmenities] = useState<AmenitiesState>(INITIAL_AMENITIES);

  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    if (!detail) {
      return;
    }
    setName(detail.name ?? '');
    setStreetAddress(detail.location?.streetAddress ?? '');
    setDetailAddress(detail.floor ?? detail.location?.detailAddress ?? '');
    setRepresentativeImage(detail.representativeImageUrl ?? null);
    setWebsiteUrl(detail.contact?.websiteUrl ?? '');
    setPhoneNumber(detail.contact?.phoneNumber ?? '');
    setEmail(detail.contact?.email ?? '');
    setIntroduction(detail.introduction ?? '');
    setAmenities({
      hasWaitingRoom: detail.amenities?.hasWaitingRoom ?? false,
      waitingRoomCount: detail.amenities?.waitingRoomCount,
      hasParking: detail.amenities?.hasParking ?? false,
      parkingCount: detail.amenities?.parkingCount,
      hasCabinet: detail.amenities?.hasCabinet ?? false,
      cabinetCount: detail.amenities?.cabinetCount,
      hasSecondFloorSeating: detail.amenities?.hasSecondFloorSeating ?? false,
      hasIndoorRestroom: detail.amenities?.hasIndoorRestroom ?? false,
      hasAlcoholSales: detail.amenities?.hasAlcoholSales ?? false,
    });
  }, [detail]);

  useEffect(() => {
    if (savedStations) {
      setStations(
        [...savedStations]
          .sort((a, b) => a.sequence - b.sequence)
          .map(({ stationId, stationName, lines }) => ({ stationId, stationName, lines })),
      );
    }
  }, [savedStations]);

  // 디자인 정책: 최신 등록역이 맨 왼쪽에 노출 (prepend)
  const onAddStation = (station: SubwayStationSearchItem) => {
    setStations((prev) => {
      if (prev.some(({ stationId }) => stationId === station.stationId)) {
        return prev;
      }
      return [
        { stationId: station.stationId, stationName: station.stationName, lines: station.lines },
        ...prev,
      ];
    });
  };

  // 주소 선택으로 닫힌 경우에만 닫힘 애니메이션 완료 후 상세주소에 포커스한다 (디자인 정책)
  const shouldFocusDetailAddressRef = useRef(false);

  const onCompleteAddress = (roadAddress: string) => {
    setStreetAddress(roadAddress);
    shouldFocusDetailAddressRef.current = true;
    setIsAddressModalOpen(false);
  };

  const onAddressModalAfterClose = () => {
    if (shouldFocusDetailAddressRef.current) {
      shouldFocusDetailAddressRef.current = false;
      detailAddressRef.current?.focus();
    }
  };

  const onSelectPhotos = (files: File[]) => {
    setPhotos((prev) => {
      const remaining = MAX_PHOTO_COUNT - prev.length;
      if (remaining <= 0) {
        return prev;
      }
      // 디자인 정책: 최신 등록이 맨 왼쪽(업로드 박스 다음)에 노출
      const newPhotos = files.slice(0, remaining).map((file) => URL.createObjectURL(file));
      return [...newPhotos, ...prev];
    });
  };

  const hasPhoneNumberError = phoneNumber.length > 0 && !PHONE_NUMBER_REGEX.test(phoneNumber);
  const hasEmailError = email.length > 0 && !EMAIL_REGEX.test(email);

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

  const countAmenityItems: Array<{
    key: 'hasWaitingRoom' | 'hasParking' | 'hasCabinet';
    countKey: 'waitingRoomCount' | 'parkingCount' | 'cabinetCount';
    label: string;
    icon: string;
  }> = [
    { key: 'hasWaitingRoom', countKey: 'waitingRoomCount', label: '대기실', icon: waitingRoomIcon },
    { key: 'hasParking', countKey: 'parkingCount', label: '주차', icon: parkingIcon },
    { key: 'hasCabinet', countKey: 'cabinetCount', label: '캐비넷', icon: cabinetIcon },
  ];

  const booleanAmenityItems: Array<{
    key: 'hasSecondFloorSeating' | 'hasIndoorRestroom' | 'hasAlcoholSales';
    label: string;
    icon: string;
  }> = [
    { key: 'hasSecondFloorSeating', label: '2층 관객석', icon: secondFloorIcon },
    { key: 'hasIndoorRestroom', label: '내부 화장실', icon: restroomIcon },
    { key: 'hasAlcoholSales', label: '주류 판매', icon: alcoholIcon },
  ];

  return (
    <PageLayout
      breadscrumb="공연장 관리 / 공연장 정보"
      title="공연장 정보"
      description="공연장 프로필에 노출되는 기본 정보를 관리합니다."
      action={
        <BooltiButton
          colorTheme="primary"
          size="medium"
          disabled={saveSubwayStations.isLoading}
          onClick={onSave}
        >
          저장하기
        </BooltiButton>
      }
    >
      <Alert
        type="info"
        showIcon
        message="공연장 정보 저장 API가 준비 중이에요. 현재는 인근 지하철역만 저장돼요."
        style={{ marginBottom: 20 }}
      />

      <Flex vertical gap={20}>
        <Card>
          <SectionTitle>기본 정보</SectionTitle>
          <Flex vertical gap={20} style={{ maxWidth: 600 }}>
            <div>
              <FieldLabel>대표 이미지</FieldLabel>
              {representativeImage ? (
                <div style={{ position: 'relative', width: 160 }}>
                  <img
                    src={representativeImage}
                    alt="대표 이미지"
                    style={{
                      width: 160,
                      height: 160,
                      objectFit: 'cover',
                      borderRadius: '8px 8px 0 0',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: theme.palette.primary.o1,
                      color: theme.palette.grey.w,
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '4px 0',
                      borderRadius: '0 0 8px 8px',
                    }}
                  >
                    대표 사진
                  </div>
                  <RemoveImageButton
                    label="대표 이미지 삭제"
                    onClick={() => setRepresentativeImage(null)}
                  />
                </div>
              ) : (
                <ImageUploadBox
                  width={160}
                  height={160}
                  onSelect={(files) => setRepresentativeImage(URL.createObjectURL(files[0]))}
                />
              )}
            </div>
            <div>
              <FieldLabel>공연장명</FieldLabel>
              <Input size="large" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <FieldLabel>공연장 주소</FieldLabel>
              <Flex vertical gap={8}>
                <Flex gap={8} align="center">
                  {/* 도로명주소는 주소 찾기로만 입력 가능 (직접 입력 불가) */}
                  <Input
                    size="large"
                    style={{ flex: 1, height: 44 }}
                    value={streetAddress}
                    placeholder="주소 찾기로 도로명주소를 입력해 주세요"
                    readOnly
                  />
                  <BooltiButton
                    colorTheme="netural"
                    size="medium"
                    style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                    onClick={() => setIsAddressModalOpen(true)}
                  >
                    주소 찾기
                  </BooltiButton>
                </Flex>
                <Input
                  ref={detailAddressRef}
                  size="large"
                  value={detailAddress}
                  placeholder="상세주소를 입력해 주세요 (필수)"
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
              </Flex>
            </div>
            <div>
              <FieldLabel>인근 지하철역</FieldLabel>
              <Flex vertical gap={8} align="flex-start">
                {stations.length > 0 && (
                  <Flex gap={8} wrap="wrap" align="center">
                    {stations.map((station) => (
                      <Flex
                        key={station.stationId}
                        align="center"
                        gap={6}
                        style={{
                          padding: '6px 10px',
                          borderRadius: 20,
                          backgroundColor: theme.palette.grey.g00,
                        }}
                      >
                        {station.lines.map((line) => (
                          <SubwayLineBadge key={line.lineId} line={line} />
                        ))}
                        <Typography.Text>{station.stationName}</Typography.Text>
                        <CloseOutlined
                          style={{ fontSize: 11, color: theme.palette.grey.g50, cursor: 'pointer' }}
                          onClick={() => {
                            setStations((prev) =>
                              prev.filter(({ stationId }) => stationId !== station.stationId),
                            );
                          }}
                        />
                      </Flex>
                    ))}
                  </Flex>
                )}
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={{ paddingLeft: 0 }}
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
              <Input
                size="large"
                value={websiteUrl}
                placeholder="URL을 입력해 주세요"
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
            <Flex gap={16}>
              <div style={{ flex: 1 }}>
                <FieldLabel>전화번호</FieldLabel>
                <Input
                  size="large"
                  value={phoneNumber}
                  placeholder="전화번호를 입력해 주세요"
                  status={hasPhoneNumberError ? 'error' : undefined}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {hasPhoneNumberError && (
                  <Typography.Text type="danger" style={{ display: 'block', marginTop: 4 }}>
                    올바른 전화번호 형식이 아니에요.
                  </Typography.Text>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>이메일</FieldLabel>
                <Input
                  size="large"
                  value={email}
                  placeholder="이메일을 입력해 주세요"
                  status={hasEmailError ? 'error' : undefined}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {hasEmailError && (
                  <Typography.Text type="danger" style={{ display: 'block', marginTop: 4 }}>
                    올바른 이메일 형식이 아니에요.
                  </Typography.Text>
                )}
              </div>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>소개 및 사진</SectionTitle>
          <Flex vertical gap={20} style={{ maxWidth: 600 }}>
            <div>
              <FieldLabel>소개</FieldLabel>
              <TextArea
                rows={5}
                value={introduction}
                placeholder="공연장 소개를 입력해 주세요"
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>사진 (최대 {MAX_PHOTO_COUNT}장 등록 가능)</FieldLabel>
              {/* 최대 너비 초과 시 가로 스크롤. 모서리에 걸친 X 버튼이 잘리지 않도록 상단 여백 확보 */}
              <Flex gap={12} style={{ overflowX: 'auto', padding: '10px 10px 4px 0' }}>
                {/* 20장 도달 시 업로드 박스 미노출 (디자인 정책) */}
                {photos.length < MAX_PHOTO_COUNT && (
                  <ImageUploadBox width={120} height={120} multiple onSelect={onSelectPhotos} />
                )}
                {photos.map((photo, index) => (
                  <div
                    key={photo}
                    style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}
                  >
                    <img
                      src={photo}
                      alt={`공연장 사진 ${index + 1}`}
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 8,
                        display: 'block',
                      }}
                    />
                    <RemoveImageButton
                      label="사진 삭제"
                      onClick={() => {
                        URL.revokeObjectURL(photo);
                        setPhotos((prev) => prev.filter((p) => p !== photo));
                      }}
                    />
                  </div>
                ))}
              </Flex>
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>편의시설 및 서비스</SectionTitle>
          <Flex gap={48} style={{ maxWidth: 720 }}>
            <Flex vertical gap={16} style={{ flex: 1 }}>
              {countAmenityItems.map(({ key, countKey, label, icon }) => (
                <Flex key={key} align="center" justify="space-between" gap={12}>
                  <Checkbox
                    checked={amenities[key]}
                    onChange={(e) =>
                      setAmenities((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                  >
                    <Flex align="center" gap={6} component="span">
                      <AmenityIcon src={icon} label={label} />
                      {label}
                    </Flex>
                  </Checkbox>
                  <InputNumber
                    min={0}
                    placeholder="0"
                    style={{ width: 100 }}
                    disabled={!amenities[key]}
                    value={amenities[countKey]}
                    onChange={(value) =>
                      setAmenities((prev) => ({ ...prev, [countKey]: value ?? undefined }))
                    }
                  />
                </Flex>
              ))}
            </Flex>
            <Flex vertical gap={16} style={{ flex: 1 }}>
              {booleanAmenityItems.map(({ key, label, icon }) => (
                <Flex key={key} align="center" style={{ height: 32 }}>
                  <Checkbox
                    checked={amenities[key]}
                    onChange={(e) =>
                      setAmenities((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                  >
                    <Flex align="center" gap={6} component="span">
                      <AmenityIcon src={icon} label={label} />
                      {label}
                    </Flex>
                  </Checkbox>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <SubwayStationSearchModal
        open={isStationModalOpen}
        onClose={() => setIsStationModalOpen(false)}
        onSelect={onAddStation}
      />
      <AddressSearchModal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onComplete={onCompleteAddress}
        afterClose={onAddressModalAfterClose}
      />
    </PageLayout>
  );
};

export default ConcertHallInfoPage;
