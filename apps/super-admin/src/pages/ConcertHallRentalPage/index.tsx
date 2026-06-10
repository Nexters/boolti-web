import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSuperAdminConcertHallDetail } from '@boolti/api';
import { SuperAdminConcertHallVatType } from '@boolti/api/src/types/superAdminConcertHall';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLayout from '~/components/PageLayout/PageLayout';

const { TextArea } = Input;

// 대관료 분류 (디자인 정책: 언제나 ~ 공휴일전 평일)
const RENTAL_FEE_DAY_OPTIONS = [
  '언제나',
  '월~목요일',
  '월~금요일 (평일 전체)',
  '금요일',
  '토요일',
  '일요일',
  '공휴일 (요일 무관)',
  '공휴일전 평일 (월~금요일)',
].map((label) => ({ value: label, label }));

// 시간당 추가 요금 분류 (대관료와 옵션이 다름)
const HOURLY_FEE_DAY_OPTIONS = [
  '언제나',
  '월~목요일',
  '월~금요일 (평일 전체)',
  '금~일요일',
  '토~일요일 (주말 전체)',
].map((label) => ({ value: label, label }));

interface FeeRow {
  dayType?: string;
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
  const { data: detail } = useSuperAdminConcertHallDetail(hallId);

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
    if (!detail) {
      return;
    }
    setRentalMethod(detail.rentalMethod ?? '');
    setRentalTimeHours(detail.rentalTime?.rentalTimeHours ?? 0);
    setIsEngineerBreakIncluded(detail.rentalTime?.isEngineerBreakIncluded ?? false);
    setVatType(detail.vatType ?? 'NONE');
    setSeatedCapacity(detail.capacity?.seatedCapacity ?? 0);
    setStandingCapacity(detail.capacity?.standingCapacity ?? 0);
    setInstrumentsText(detail.instrumentsText ?? '');
    setSpecialNotes(detail.specialNotes?.length ? detail.specialNotes : ['']);
    // 대관료/시간당 추가 요금/유료 옵션은 구조화 응답 필드가 아직 없어 빈 행으로 시작한다.
  }, [detail]);

  // VAT 포함/별도는 체크박스 2개가 상호배타로 동작하고, 해제하면 미선택(NONE) 상태가 된다.
  const toggleVatType = (type: Exclude<SuperAdminConcertHallVatType, 'NONE'>) => {
    setVatType((prev) => (prev === type ? 'NONE' : type));
  };

  return (
    <PageLayout
      breadscrumb="공연장 관리 / 대관 정보"
      title="대관 정보"
      description="공연장 대관 탭에 노출되는 정보를 관리합니다."
      action={
        <Tooltip title="대관 정보 저장 API가 준비 중이에요.">
          <Button type="primary" size="large" disabled>
            저장하기
          </Button>
        </Tooltip>
      }
    >
      <Alert
        type="info"
        showIcon
        message="대관 정보 저장 API가 준비 중이에요. 입력한 내용은 아직 저장되지 않아요."
        style={{ marginBottom: 20 }}
      />

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
              <Flex gap={16}>
                <Checkbox
                  checked={vatType === 'VAT_INCLUDED'}
                  onChange={() => toggleVatType('VAT_INCLUDED')}
                >
                  VAT 포함
                </Checkbox>
                <Checkbox
                  checked={vatType === 'VAT_EXCLUDED'}
                  onChange={() => toggleVatType('VAT_EXCLUDED')}
                >
                  VAT 별도
                </Checkbox>
              </Flex>
              <Typography.Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                {vatType === 'VAT_INCLUDED' &&
                  '사용자 화면에 ‘부가세 10%가 포함된 비용입니다.’ 문구가 노출돼요.'}
                {vatType === 'VAT_EXCLUDED' &&
                  '사용자 화면에 ‘부가세 10%가 포함되지 않은 비용입니다.’ 문구가 노출돼요.'}
                {vatType === 'NONE' && '미선택 시 사용자 화면에 노출되지 않아요.'}
              </Typography.Text>
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
