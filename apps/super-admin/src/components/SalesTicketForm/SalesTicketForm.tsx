import { Button } from '@boolti/ui';
import { Form, Input, InputNumber } from 'antd';
import Styled from './SalesTicketForm.styles';

interface SalesTicketAddFormProps {
  onCreate: (values: { ticketName: string; price: number; quantity: number }) => void;
}

const SalesTicketAddForm = ({ onCreate }: SalesTicketAddFormProps) => {
  const onFinish = (values: { ticketName: string; price: number; quantity: number }) => {
    onCreate(values);
  };

  return (
    <Styled.Container>
      <Styled.Description>만들고 싶은 티켓 정보를 입력해 주세요.</Styled.Description>
      <Styled.SubDescription>
        * 퀵계좌이체 지원을 위해 유료 티켓은 200원 이상 입력이 필요합니다.
        <br />* 무료 티켓 생성을 원하시면 0원을 입력해 주세요.
      </Styled.SubDescription>
      <Form layout="vertical" style={{ marginTop: 20 }} onFinish={onFinish}>
        <Form.Item
          name="ticketName"
          label="티켓 이름"
          rules={[{ required: true, message: '티켓 이름을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="가격"
          rules={[{ required: true, message: '가격을 입력해주세요' }]}
        >
          <div>
            <InputNumber style={{ width: '95%' }} min={0} /> &nbsp;원
          </div>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="수량"
          rules={[{ required: true, message: '수량을 입력해주세요.' }]}
        >
          <div>
            <InputNumber style={{ width: '95%' }} min={1} /> &nbsp;매
          </div>
        </Form.Item>
        <Button colorTheme="netural" size="medium" type="submit">
          생성하기
        </Button>
      </Form>
    </Styled.Container>
  );
};

export default SalesTicketAddForm;
