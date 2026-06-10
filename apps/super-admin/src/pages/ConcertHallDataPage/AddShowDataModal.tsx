import {
  CustomHttpError,
  useSuperAdminAddConcertHallShowFromBoolti,
  useSuperAdminAddConcertHallShowManual,
  useSuperAdminValidateConcertHallShow,
} from '@boolti/api';
import { SuperAdminConcertHallShowValidateResponse } from '@boolti/api/src/types/superAdminConcertHall';
import { useToast } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { Button, DatePicker, Flex, Form, Input, Modal, Space, Typography } from 'antd';
import { format } from 'date-fns';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import { useState } from 'react';

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

type AddMode = 'manual' | 'boolti';

interface AddShowDataModalProps {
  open: boolean;
  hallId: number;
  onClose: () => void;
  onAdded: () => void;
}

interface ManualFormValues {
  showName: string;
  showDate: Date;
}

const getValidateErrorMessage = (error: unknown) => {
  if (error instanceof CustomHttpError) {
    if (error.detail) {
      return error.detail;
    }
    if (error.status === 404) {
      return '불티에 존재하지 않는 공연 ID에요. 확인 후 다시 입력해 주세요.';
    }
    if (error.status === 409) {
      return '이미 다른 공연장과 연결된 공연이에요.';
    }
  }
  return '공연 ID 확인 중 문제가 발생했습니다.';
};

const AddShowDataModal = ({ open, hallId, onClose, onAdded }: AddShowDataModalProps) => {
  const theme = useTheme();
  const toast = useToast();
  const [form] = Form.useForm<ManualFormValues>();
  const [mode, setMode] = useState<AddMode>('manual');
  const [booltiShowId, setBooltiShowId] = useState('');
  const [validated, setValidated] = useState<SuperAdminConcertHallShowValidateResponse | null>(
    null,
  );
  const [validateError, setValidateError] = useState<string | null>(null);

  const validateShow = useSuperAdminValidateConcertHallShow();
  const addManual = useSuperAdminAddConcertHallShowManual();
  const addFromBoolti = useSuperAdminAddConcertHallShowFromBoolti();

  const close = () => {
    form.resetFields();
    setMode('manual');
    setBooltiShowId('');
    setValidated(null);
    setValidateError(null);
    onClose();
  };

  const onSubmitManual = async (values: ManualFormValues) => {
    try {
      await addManual.mutateAsync({
        hallId,
        showName: values.showName.trim(),
        showDate: format(values.showDate, 'yyyy-MM-dd'),
      });
      toast.success('공연 데이터를 추가했어요.');
      onAdded();
      close();
    } catch {
      toast.error('공연 데이터 추가 중 문제가 발생했습니다.');
    }
  };

  const onValidate = async () => {
    setValidateError(null);
    setValidated(null);
    try {
      const result = await validateShow.mutateAsync({ hallId, showId: Number(booltiShowId) });
      setValidated(result);
    } catch (error) {
      setValidateError(getValidateErrorMessage(error));
    }
  };

  const onSubmitFromBoolti = async () => {
    try {
      await addFromBoolti.mutateAsync({ hallId, showId: Number(booltiShowId) });
      toast.success('공연 데이터를 추가했어요.');
      onAdded();
      close();
    } catch (error) {
      setValidateError(getValidateErrorMessage(error));
    }
  };

  const modeItems: Array<{ key: AddMode; title: string; description: string }> = [
    { key: 'manual', title: '직접 입력', description: '간편 공연 정보로 직접 등록 및 연결' },
    { key: 'boolti', title: '불티 공연 ID 입력', description: '불티에 등록된 공연 ID로 연결' },
  ];

  return (
    <Modal title="공연 데이터 추가하기" open={open} onCancel={close} footer={null} width={636}>
      <Typography.Text strong style={{ display: 'block', margin: '16px 0 8px' }}>
        추가 방식
      </Typography.Text>
      <Flex gap={12} style={{ marginBottom: 24 }}>
        {modeItems.map((item) => {
          const isActive = mode === item.key;
          return (
            <div
              key={item.key}
              onClick={() => setMode(item.key)}
              style={{
                flex: 1,
                padding: '14px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                border: `1px solid ${isActive ? theme.palette.primary.o1 : theme.palette.grey.g20}`,
                backgroundColor: isActive ? theme.palette.primary.o0 : theme.palette.grey.w,
              }}
            >
              <Typography.Text strong style={{ display: 'block' }}>
                {item.title}
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                {item.description}
              </Typography.Text>
            </div>
          );
        })}
      </Flex>

      {mode === 'manual' ? (
        <Form form={form} layout="vertical" onFinish={onSubmitManual}>
          <Form.Item
            name="showName"
            label="공연명"
            required
            rules={[{ required: true, message: '공연명을 입력해 주세요.' }]}
          >
            <Input
              maxLength={40}
              placeholder="공연명을 입력해 주세요 (띄어쓰기 포함 최대 40자)"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="showDate"
            label="공연일"
            required
            rules={[{ required: true, message: '공연일을 선택해 주세요.' }]}
          >
            <MyDatePicker style={{ width: '100%' }} size="large" placeholder="-" />
          </Form.Item>
          <Flex justify="flex-end">
            <Button type="primary" htmlType="submit" loading={addManual.isLoading}>
              추가하기
            </Button>
          </Flex>
        </Form>
      ) : (
        <>
          <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
            불티 공연 ID <Typography.Text type="danger">*</Typography.Text>
          </Typography.Text>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="'preview.boolti.in/show/' 뒤에 있는 숫자를 입력해 주세요"
              value={booltiShowId}
              status={validateError ? 'error' : undefined}
              onChange={(e) => {
                setBooltiShowId(e.target.value.replace(/[^0-9]/g, ''));
                setValidated(null);
                setValidateError(null);
              }}
            />
            <Button
              size="large"
              disabled={booltiShowId.length === 0}
              loading={validateShow.isLoading}
              onClick={onValidate}
            >
              연결하기
            </Button>
          </Space.Compact>
          {validateError && (
            <Typography.Text type="danger" style={{ display: 'block', marginTop: 8 }}>
              {validateError}
            </Typography.Text>
          )}
          {validated && (
            <div
              style={{
                marginTop: 16,
                padding: '14px 16px',
                borderRadius: 8,
                backgroundColor: theme.palette.grey.g00,
              }}
            >
              <Flex vertical gap={4}>
                <Space size="middle">
                  <Typography.Text type="secondary" style={{ width: 48, display: 'inline-block' }}>
                    공연명
                  </Typography.Text>
                  <Typography.Text>{validated.showName}</Typography.Text>
                </Space>
                <Space size="middle">
                  <Typography.Text type="secondary" style={{ width: 48, display: 'inline-block' }}>
                    공연일
                  </Typography.Text>
                  <Typography.Text>
                    {format(new Date(validated.showDate), 'yyyy.MM.dd')}
                  </Typography.Text>
                </Space>
                <Space size="middle">
                  <Typography.Text type="secondary" style={{ width: 48, display: 'inline-block' }}>
                    주최자
                  </Typography.Text>
                  <Typography.Text>{validated.hostName}</Typography.Text>
                </Space>
              </Flex>
            </div>
          )}
          <Flex justify="flex-end" style={{ marginTop: 24 }}>
            <Button
              type="primary"
              disabled={!validated}
              loading={addFromBoolti.isLoading}
              onClick={onSubmitFromBoolti}
            >
              추가하기
            </Button>
          </Flex>
        </>
      )}
    </Modal>
  );
};

export default AddShowDataModal;
