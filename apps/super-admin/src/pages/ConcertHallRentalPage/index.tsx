import { useSuperAdminConcertHallDetail } from '@boolti/api';
import { Alert, Card, Checkbox, Flex, Input, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import PageLayout from '~/components/PageLayout/PageLayout';

const { TextArea } = Input;

const VAT_TYPE_LABEL: Record<string, string> = {
  NONE: '-',
  VAT_INCLUDED: 'VAT 포함',
  VAT_EXCLUDED: 'VAT 별도',
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

const ConcertHallRentalPage = () => {
  const params = useParams<{ hallId: string }>();
  const hallId = Number(params.hallId);
  const { data: detail } = useSuperAdminConcertHallDetail(hallId);

  return (
    <PageLayout
      breadscrumb="공연장 관리 / 대관 정보"
      title="대관 정보"
      description="공연장 대관 탭에 노출되는 정보를 관리합니다."
    >
      <Alert
        type="info"
        showIcon
        message="대관 정보 저장 API가 준비 중이에요. 현재는 조회만 가능해요."
        style={{ marginBottom: 20 }}
      />

      <Flex vertical gap={20}>
        <Card>
          <SectionTitle>대관 방법</SectionTitle>
          <TextArea rows={5} value={detail?.rentalMethod ?? ''} disabled />
        </Card>

        <Card>
          <SectionTitle>대관 정책</SectionTitle>
          <Flex vertical gap={20} style={{ maxWidth: 600 }}>
            <div>
              <FieldLabel>대관 시간</FieldLabel>
              <Flex align="center" gap={12}>
                <Input
                  size="large"
                  style={{ width: 120 }}
                  value={detail?.rentalTime?.rentalTimeHours ?? ''}
                  disabled
                />
                <Typography.Text>시간</Typography.Text>
                <Checkbox checked={detail?.rentalTime?.isEngineerBreakIncluded ?? false} disabled>
                  엔지니어 휴식 시간 포함
                </Checkbox>
              </Flex>
            </div>
            <div>
              <FieldLabel>부가세 포함 여부</FieldLabel>
              <Input
                size="large"
                style={{ width: 200 }}
                value={VAT_TYPE_LABEL[detail?.vatType ?? 'NONE']}
                disabled
              />
            </div>
            <div>
              <FieldLabel>대관료</FieldLabel>
              <TextArea rows={4} value={detail?.rentalFeeDescription ?? ''} disabled />
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>공간 스펙</SectionTitle>
          <Flex vertical gap={20} style={{ maxWidth: 600 }}>
            <Flex gap={16}>
              <div style={{ flex: 1 }}>
                <FieldLabel>좌석 이용 시 수용 인원</FieldLabel>
                <Flex align="center" gap={8}>
                  <Input size="large" value={detail?.capacity?.seatedCapacity ?? ''} disabled />
                  <Typography.Text>명</Typography.Text>
                </Flex>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>스탠딩 시 수용 인원</FieldLabel>
                <Flex align="center" gap={8}>
                  <Input size="large" value={detail?.capacity?.standingCapacity ?? ''} disabled />
                  <Typography.Text>명</Typography.Text>
                </Flex>
              </div>
            </Flex>
            <div>
              <FieldLabel>보유 악기</FieldLabel>
              <TextArea rows={5} value={detail?.instrumentsText ?? ''} disabled />
            </div>
          </Flex>
        </Card>

        <Card>
          <SectionTitle>특이사항</SectionTitle>
          <Flex vertical gap={8} style={{ maxWidth: 600 }}>
            {(detail?.specialNotes ?? []).length === 0 ? (
              <Typography.Text type="secondary">등록된 특이사항이 없어요.</Typography.Text>
            ) : (
              (detail?.specialNotes ?? []).map((note, index) => (
                <Input key={index} size="large" value={note} disabled />
              ))
            )}
          </Flex>
        </Card>
      </Flex>
    </PageLayout>
  );
};

export default ConcertHallRentalPage;
