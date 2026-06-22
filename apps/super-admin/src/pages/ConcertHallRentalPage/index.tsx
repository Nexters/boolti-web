import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSuperAdminConcertHallRental, useSuperAdminUpdateConcertHallRental } from '@boolti/api';
import {
  SuperAdminConcertHallRentalDayType,
  SuperAdminConcertHallVatType,
} from '@boolti/api/src/types/superAdminConcertHall';
import { Button as BooltiButton, useToast } from '@boolti/ui';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  InputNumber,
  Radio,
  Select,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '~/components/PageLayout/PageLayout';

const { TextArea } = Input;

type DayOption = { value: SuperAdminConcertHallRentalDayType; label: string };

// 대관료 분류 (디자인 정책: 언제나 ~ 공휴일전 평일). value는 API enum.
const RENTAL_FEE_DAY_OPTIONS: DayOption[] = [
  { value: 'ANYTIME', label: '언제나' },
  { value: 'MON_TO_THU', label: '월~목요일' },
  { value: 'WEEKDAY', label: '월~금요일 (평일 전체)' },
  { value: 'FRIDAY', label: '금요일' },
  { value: 'SATURDAY', label: '토요일' },
  { value: 'SUNDAY', label: '일요일' },
  { value: 'HOLIDAY', label: '공휴일 (요일 무관)' },
  { value: 'PRE_HOLIDAY_WEEKDAY', label: '공휴일전 평일 (월~금요일)' },
];

// 시간당 추가 요금 분류 (대관료와 옵션이 다름). value는 API enum.
const HOURLY_FEE_DAY_OPTIONS: DayOption[] = [
  { value: 'ANYTIME', label: '언제나' },
  { value: 'MON_TO_THU', label: '월~목요일' },
  { value: 'WEEKDAY', label: '월~금요일 (평일 전체)' },
  { value: 'FRI_TO_SUN', label: '금~일요일' },
  { value: 'WEEKEND', label: '토~일요일 (주말 전체)' },
];

// 부가세 포함 여부 (디자인 정책: 옵션 라벨에 사용자 화면 노출 문구 포함, 기본은 알 수 없음)
const VAT_TYPE_OPTIONS: Array<{ value: SuperAdminConcertHallVatType; label: string }> = [
  { value: 'NONE', label: '알 수 없음 (문구 미노출)' },
  { value: 'VAT_INCLUDED', label: "VAT 포함 ('부가세 10%가 포함된 비용입니다.' 문구 노출)" },
  { value: 'VAT_EXCLUDED', label: "VAT 별도 ('부가세 10%가 포함되지 않은 비용입니다.' 문구 노출)" },
];

interface FeeRow {
  dayType?: SuperAdminConcertHallRentalDayType;
  amount?: number;
}

interface PaidOptionRow {
  name: string;
  amount?: number;
}

const formatAmount = (value?: number | string) =>
  value === undefined || value === '' ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const parseAmount = (value?: string) => Number((value ?? '0').replace(/,/g, ''));

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

const AddRowButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    type="link"
    icon={<PlusOutlined />}
    onClick={onClick}
    style={{ alignSelf: 'flex-start', paddingLeft: 0 }}
  >
    추가하기
  </Button>
);

const ConcertHallRentalPage = () => {
  const params = useParams<{ hallId: string }>();
  const hallId = Number(params.hallId);
  const toast = useToast();
  const { data: rental } = useSuperAdminConcertHallRental(hallId);
  const updateRental = useSuperAdminUpdateConcertHallRental();

  // 대관 방법
  const [rentalMethod, setRentalMethod] = useState('');

  // 대관 정책
  const [rentalTimeHours, setRentalTimeHours] = useState<number>(0);
  const [isEngineerBreakIncluded, setIsEngineerBreakIncluded] = useState(false);
  const [vatType, setVatType] = useState<SuperAdminConcertHallVatType>('NONE');
  const [rentalFees, setRentalFees] = useState<FeeRow[]>([{}]);
  const [defaultFeeIndex, setDefaultFeeIndex] = useState(0);
  const [hourlyFees, setHourlyFees] = useState<FeeRow[]>([{}]);

  // 공간 스펙
  const [seatedCapacity, setSeatedCapacity] = useState<number>(0);
  const [standingCapacity, setStandingCapacity] = useState<number>(0);
  const [instrumentsText, setInstrumentsText] = useState('');

  // 유료 옵션 / 특이사항
  const [paidOptions, setPaidOptions] = useState<PaidOptionRow[]>([{ name: '' }]);
  const [specialNotes, setSpecialNotes] = useState<string[]>(['']);

  useEffect(() => {
    if (!rental) {
      return;
    }
    setRentalMethod(rental.rentalMethod ?? '');
    setRentalTimeHours(rental.rentalTime?.rentalTimeHours ?? 0);
    setIsEngineerBreakIncluded(rental.rentalTime?.isEngineerBreakIncluded ?? false);
    setVatType(rental.vatType ?? 'NONE');
    setSeatedCapacity(rental.capacity?.seatedCapacity ?? 0);
    setStandingCapacity(rental.capacity?.standingCapacity ?? 0);
    setInstrumentsText(rental.instrumentsText ?? '');
    setSpecialNotes(rental.specialNotes?.length ? rental.specialNotes : ['']);

    // 대관료: 응답값으로 채우고, isDefault 행을 기본 대관료 인덱스로 설정
    if (rental.rentalFees?.length) {
      setRentalFees(rental.rentalFees.map(({ dayType, fee }) => ({ dayType, amount: fee })));
      const defaultIdx = rental.rentalFees.findIndex((row) => row.isDefault);
      setDefaultFeeIndex(defaultIdx >= 0 ? defaultIdx : 0);
    }
    if (rental.additionalFees?.length) {
      setHourlyFees(rental.additionalFees.map(({ dayType, fee }) => ({ dayType, amount: fee })));
    }
    if (rental.paidOptions?.length) {
      setPaidOptions(rental.paidOptions.map(({ name, price }) => ({ name, amount: price })));
    }
  }, [rental]);

  const onSave = async () => {
    // dayType과 금액이 모두 있는 행만 전송한다.
    const validRentalFees = rentalFees
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => row.dayType && row.amount !== undefined);
    // 기본 대관료 행이 비어 제외되면 첫 유효행을 기본으로 (정확히 1개만 true 보장)
    const defaultExists = validRentalFees.some(({ index }) => index === defaultFeeIndex);
    const resolvedDefaultIndex = defaultExists ? defaultFeeIndex : validRentalFees[0]?.index;
    const additionalFees = hourlyFees
      .filter((row) => row.dayType && row.amount !== undefined)
      .map((row) => ({ dayType: row.dayType!, fee: row.amount! }));
    const paidOptionsBody = paidOptions
      .filter((row) => row.name.trim() && row.amount !== undefined)
      .map((row) => ({ name: row.name.trim(), price: row.amount! }));

    try {
      await updateRental.mutateAsync({
        hallId,
        body: {
          rentalMethod: rentalMethod.trim() || undefined,
          rentalTimeHours,
          isEngineerBreakIncluded,
          vatType,
          capacity: { seatedCapacity, standingCapacity },
          instrumentsText: instrumentsText.trim() || undefined,
          rentalFees: validRentalFees.map(({ row, index }) => ({
            dayType: row.dayType!,
            fee: row.amount!,
            isDefault: index === resolvedDefaultIndex,
          })),
          additionalFees,
          paidOptions: paidOptionsBody,
          specialNotes: specialNotes.map((note) => note.trim()).filter(Boolean),
        },
      });
      toast.success('대관 정보를 저장했어요.');
    } catch {
      toast.error('대관 정보 저장 중 문제가 발생했습니다.');
    }
  };

  return (
    <PageLayout
      breadscrumb="공연장 관리 / 대관 정보"
      title="대관 정보"
      description="공연장 대관 탭에 노출되는 정보를 관리합니다."
      action={
        <BooltiButton
          colorTheme="primary"
          size="medium"
          disabled={updateRental.isLoading}
          onClick={onSave}
        >
          저장하기
        </BooltiButton>
      }
    >
      <Flex vertical gap={20}>
        <Card>
          <SectionTitle>대관 방법</SectionTitle>
          <TextArea
            rows={5}
            value={rentalMethod}
            onChange={(e) => setRentalMethod(e.target.value)}
            placeholder="대관 방법을 입력해 주세요"
            style={{ maxWidth: 600 }}
          />
        </Card>

        <Card>
          <SectionTitle>대관 정책</SectionTitle>
          <Flex vertical gap={24} style={{ maxWidth: 720 }}>
            <div>
              <FieldLabel>대관 시간</FieldLabel>
              <Flex align="center" gap={12}>
                <InputNumber
                  size="large"
                  min={0}
                  style={{ width: 200 }}
                  value={rentalTimeHours}
                  onChange={(value) => setRentalTimeHours(value ?? 0)}
                />
                <Typography.Text>시간</Typography.Text>
                <Checkbox
                  checked={isEngineerBreakIncluded}
                  onChange={(e) => setIsEngineerBreakIncluded(e.target.checked)}
                >
                  엔지니어 휴식 시간 포함
                </Checkbox>
              </Flex>
              <Typography.Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                1시간 이상 입력 시 사용자 화면에 노출돼요. <br />
                휴식 시간 포함 선택 시 &lsquo;엔지니어 휴식 1시간이 포함된 시간입니다.&rsquo; 문구가
                함께 노출돼요.
              </Typography.Text>
            </div>

            <div>
              <FieldLabel>부가세 포함 여부</FieldLabel>
              {/* 옵션 라벨에 노출 문구를 포함한 단일 드롭다운 (기본: 알 수 없음) */}
              <Select<SuperAdminConcertHallVatType>
                size="large"
                style={{ width: 480, maxWidth: '100%' }}
                value={vatType}
                options={VAT_TYPE_OPTIONS}
                onChange={(value) => setVatType(value)}
              />
            </div>

            <div>
              <FieldLabel>대관료</FieldLabel>
              <Flex vertical gap={12}>
                {rentalFees.map((row, index) => (
                  <Flex key={index} align="center" gap={12}>
                    <Select
                      size="large"
                      placeholder="미선택"
                      style={{ width: 220 }}
                      options={RENTAL_FEE_DAY_OPTIONS}
                      value={row.dayType}
                      onChange={(value) => {
                        setRentalFees((prev) =>
                          prev.map((r, i) => (i === index ? { ...r, dayType: value } : r)),
                        );
                      }}
                    />
                    <InputNumber
                      size="large"
                      min={0}
                      controls={false}
                      style={{ width: 160 }}
                      placeholder="0"
                      formatter={formatAmount}
                      parser={parseAmount}
                      value={row.amount}
                      onChange={(value) => {
                        setRentalFees((prev) =>
                          prev.map((r, i) =>
                            i === index ? { ...r, amount: value ?? undefined } : r,
                          ),
                        );
                      }}
                    />
                    <Typography.Text type="secondary">원</Typography.Text>
                    <Radio
                      checked={defaultFeeIndex === index}
                      onChange={() => setDefaultFeeIndex(index)}
                    >
                      기본 대관료로 노출
                    </Radio>
                  </Flex>
                ))}
                <AddRowButton onClick={() => setRentalFees((prev) => [...prev, {}])} />
              </Flex>
            </div>

            <div>
              <FieldLabel>시간당 추가 요금</FieldLabel>
              <Flex vertical gap={12}>
                {hourlyFees.map((row, index) => (
                  <Flex key={index} align="center" gap={12}>
                    <Select
                      size="large"
                      placeholder="미선택"
                      style={{ width: 220 }}
                      options={HOURLY_FEE_DAY_OPTIONS}
                      value={row.dayType}
                      onChange={(value) => {
                        setHourlyFees((prev) =>
                          prev.map((r, i) => (i === index ? { ...r, dayType: value } : r)),
                        );
                      }}
                    />
                    <InputNumber
                      size="large"
                      min={0}
                      controls={false}
                      style={{ width: 280 }}
                      placeholder="0"
                      formatter={formatAmount}
                      parser={parseAmount}
                      value={row.amount}
                      onChange={(value) => {
                        setHourlyFees((prev) =>
                          prev.map((r, i) =>
                            i === index ? { ...r, amount: value ?? undefined } : r,
                          ),
                        );
                      }}
                    />
                    <Typography.Text type="secondary">원</Typography.Text>
                  </Flex>
                ))}
                <AddRowButton onClick={() => setHourlyFees((prev) => [...prev, {}])} />
              </Flex>
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>공간 스펙</SectionTitle>
          <Flex vertical gap={24} style={{ maxWidth: 720 }}>
            <Flex gap={24}>
              <div style={{ flex: 1 }}>
                <FieldLabel>좌석 이용 시 수용 인원</FieldLabel>
                <Flex align="center" gap={8}>
                  <InputNumber
                    size="large"
                    min={0}
                    style={{ width: '100%' }}
                    value={seatedCapacity}
                    onChange={(value) => setSeatedCapacity(value ?? 0)}
                  />
                  <Typography.Text>명</Typography.Text>
                </Flex>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>스탠딩 시 수용 인원</FieldLabel>
                <Flex align="center" gap={8}>
                  <InputNumber
                    size="large"
                    min={0}
                    style={{ width: '100%' }}
                    value={standingCapacity}
                    onChange={(value) => setStandingCapacity(value ?? 0)}
                  />
                  <Typography.Text>명</Typography.Text>
                </Flex>
              </div>
            </Flex>
            <Typography.Text type="secondary" style={{ marginTop: -16 }}>
              1명 이상 입력 시 사용자 화면에 노출돼요.
            </Typography.Text>
            <div>
              <FieldLabel>보유 악기</FieldLabel>
              <TextArea
                rows={5}
                value={instrumentsText}
                onChange={(e) => setInstrumentsText(e.target.value)}
                placeholder="보유 악기를 입력해 주세요"
              />
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>유료 옵션</SectionTitle>
          <Flex vertical gap={12} style={{ maxWidth: 720 }}>
            {paidOptions.map((row, index) => (
              <Flex key={index} align="center" gap={12}>
                <Input
                  size="large"
                  placeholder="옵션명을 입력해 주세요."
                  style={{ width: 280 }}
                  value={row.name}
                  onChange={(e) => {
                    setPaidOptions((prev) =>
                      prev.map((r, i) => (i === index ? { ...r, name: e.target.value } : r)),
                    );
                  }}
                />
                <InputNumber
                  size="large"
                  min={0}
                  controls={false}
                  style={{ width: 200 }}
                  placeholder="0"
                  formatter={formatAmount}
                  parser={parseAmount}
                  value={row.amount}
                  onChange={(value) => {
                    setPaidOptions((prev) =>
                      prev.map((r, i) => (i === index ? { ...r, amount: value ?? undefined } : r)),
                    );
                  }}
                />
                <Typography.Text type="secondary">원</Typography.Text>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  aria-label="유료 옵션 삭제"
                  onClick={() => {
                    setPaidOptions((prev) =>
                      prev.length === 1 ? [{ name: '' }] : prev.filter((_, i) => i !== index),
                    );
                  }}
                />
              </Flex>
            ))}
            <Typography.Text type="secondary">
              옵션명과 금액 모두 입력 시 사용자 화면에 노출돼요.
            </Typography.Text>
            <AddRowButton onClick={() => setPaidOptions((prev) => [...prev, { name: '' }])} />
          </Flex>
        </Card>

        <Card>
          <SectionTitle>특이사항</SectionTitle>
          <Flex vertical gap={12} style={{ maxWidth: 720 }}>
            {specialNotes.map((note, index) => (
              <Flex key={index} align="center" gap={12}>
                <Input
                  size="large"
                  placeholder="특이사항을 입력해 주세요"
                  style={{ width: 492 }}
                  value={note}
                  onChange={(e) => {
                    setSpecialNotes((prev) =>
                      prev.map((n, i) => (i === index ? e.target.value : n)),
                    );
                  }}
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  aria-label="특이사항 삭제"
                  onClick={() => {
                    setSpecialNotes((prev) =>
                      prev.length === 1 ? [''] : prev.filter((_, i) => i !== index),
                    );
                  }}
                />
              </Flex>
            ))}
            <AddRowButton onClick={() => setSpecialNotes((prev) => [...prev, ''])} />
          </Flex>
        </Card>
      </Flex>
    </PageLayout>
  );
};

export default ConcertHallRentalPage;
