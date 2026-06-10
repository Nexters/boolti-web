import { SwapOutlined } from '@ant-design/icons';
import {
  useSuperAdminAddConcertHallShowFromBoolti,
  useSuperAdminAddConcertHallShowManual,
  useSuperAdminValidateConcertHallShow,
} from '@boolti/api';
import { SuperAdminConcertHallShowValidateResponse } from '@boolti/api/src/types/superAdminConcertHall';
import { Button, useToast } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { Button as AntdButton, DatePicker, Flex, Form, Input, Modal, Typography } from 'antd';
import { format } from 'date-fns';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import { useRef, useState } from 'react';

import defaultPoster from '~/assets/default-poster.png';

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
  promotionUrl?: string;
}

interface ConcertHallShowErrorBody {
  errorTraceId?: string;
  showId?: number;
  type?: string;
  detail?: string;
}

// ky HTTPError의 response 본문에서 에러 type을 읽어 케이스별 메시지로 매핑한다.
const getValidateErrorMessage = async (error: unknown): Promise<string> => {
  try {
    const response = (error as { response?: Response }).response;
    if (response instanceof Response) {
      const body = (await response.clone().json()) as ConcertHallShowErrorBody;
      switch (body.type) {
        case 'SHOW_DATA_NOT_FOUND':
          return '불티에 존재하지 않는 공연 ID에요. 확인 후 다시 입력해 주세요.';
        case 'SHOW_ALREADY_LINKED_TO_CONCERT_HALL':
          return '이미 다른 공연장과 연결된 공연이에요.';
      }
    }
  } catch {
    // 본문 파싱에 실패하면 일반 메시지로 폴백한다.
  }
  return '공연 ID 확인 중 문제가 발생했습니다.';
};

const AddShowDataModal = ({ open, hallId, onClose, onAdded }: AddShowDataModalProps) => {
  const theme = useTheme();
  const toast = useToast();
  const [form] = Form.useForm<ManualFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<AddMode>('manual');
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [booltiShowId, setBooltiShowId] = useState('');
  const [validated, setValidated] = useState<SuperAdminConcertHallShowValidateResponse | null>(
    null,
  );
  const [validateError, setValidateError] = useState<string | null>(null);

  const validateShow = useSuperAdminValidateConcertHallShow();
  const addManual = useSuperAdminAddConcertHallShowManual();
  const addFromBoolti = useSuperAdminAddConcertHallShowFromBoolti();

  // 필수 값(공연명/공연일)이 채워져야 추가하기가 활성화된다 (디자인 Default/Filled 상태)
  const watchedShowName = Form.useWatch('showName', form);
  const watchedShowDate = Form.useWatch('showDate', form);
  const isManualFilled = !!watchedShowName?.trim() && !!watchedShowDate;

  const close = () => {
    form.resetFields();
    setMode('manual');
    setBooltiShowId('');
    setValidated(null);
    setValidateError(null);
    if (posterPreview) {
      URL.revokeObjectURL(posterPreview);
      setPosterPreview(null);
    }
    onClose();
  };

  const onChangePoster = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (posterPreview) {
      URL.revokeObjectURL(posterPreview);
    }
    setPosterPreview(URL.createObjectURL(file));
    event.target.value = '';
  };

  const onSubmitManual = async (values: ManualFormValues) => {
    try {
      // 포스터/외부 홍보 링크는 직접 입력 API가 아직 받지 않아 전송하지 않는다.
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
      setValidateError(await getValidateErrorMessage(error));
    }
  };

  const onSubmitFromBoolti = async () => {
    try {
      await addFromBoolti.mutateAsync({ hallId, showId: Number(booltiShowId) });
      toast.success('공연 데이터를 추가했어요.');
      onAdded();
      close();
    } catch (error) {
      setValidated(null);
      setValidateError(await getValidateErrorMessage(error));
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
          <Flex gap={24}>
            <div style={{ flexShrink: 0 }}>
              <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
                공연 포스터 <Typography.Text type="danger">*</Typography.Text>
              </Typography.Text>
              <img
                src={posterPreview ?? defaultPoster}
                alt="공연 포스터"
                style={{
                  width: 160,
                  height: 213,
                  objectFit: 'cover',
                  borderRadius: 8,
                  display: 'block',
                }}
              />
              {/* 디자인의 변경하기는 블루 링크 버튼 — boolti-ui에 블루 테마가 없어 antd link 버튼 사용 */}
              <Flex justify="center" style={{ marginTop: 8 }}>
                <AntdButton
                  type="link"
                  icon={<SwapOutlined />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  변경하기
                </AntdButton>
              </Flex>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                style={{ display: 'none' }}
                onChange={onChangePoster}
              />
            </div>
            <div style={{ flex: 1 }}>
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
              <Form.Item name="promotionUrl" label="외부 홍보 링크">
                <Input placeholder="URL을 입력해 주세요" size="large" />
              </Form.Item>
            </div>
          </Flex>
          <Flex justify="flex-end">
            <Button
              colorTheme="primary"
              size="medium"
              type="submit"
              disabled={!isManualFilled || addManual.isLoading}
            >
              추가하기
            </Button>
          </Flex>
        </Form>
      ) : (
        <>
          <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
            불티 공연 ID <Typography.Text type="danger">*</Typography.Text>
          </Typography.Text>
          {/* 인풋 높이를 버튼(medium, 44px)과 맞춰 행 정렬을 유지한다 */}
          <Flex gap={8} align="center">
            <Input
              size="large"
              style={{ flex: 1, height: 44 }}
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
              colorTheme="netural"
              size="medium"
              style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
              disabled={booltiShowId.length === 0 || validated !== null || validateShow.isLoading}
              onClick={onValidate}
            >
              연결하기
            </Button>
          </Flex>
          {validateError && (
            <Typography.Text type="danger" style={{ display: 'block', marginTop: 8 }}>
              {validateError}
            </Typography.Text>
          )}
          {validated && (
            <Typography.Text type="success" style={{ display: 'block', marginTop: 8 }}>
              &lsquo;{validated.showName}&rsquo; 공연과 연결이 가능해요.
            </Typography.Text>
          )}
          <Flex justify="flex-end" style={{ marginTop: 24 }}>
            <Button
              colorTheme="primary"
              size="medium"
              disabled={!validated || addFromBoolti.isLoading}
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
