import { Button } from '@boolti/ui';
import { Form, Input, InputNumber } from 'antd';
import Styled from './InvitationTicketForm.styles';

interface InvitationTicketFormProps {
  onCreate: (values: { ticketName: string; quantity: number }) => void;
}

const InvitationTicketForm = ({ onCreate }: InvitationTicketFormProps) => {
  const onFinish = (values: { ticketName: string; quantity: number }) => {
    onCreate(values);
  };

  return (
    <Styled.Container>
      <Styled.Description>
        만들고 싶은 티켓 정보를 입력해 주세요.
        <br />
        입력하신 수량만큼 초청 코드가 발행됩니다.
      </Styled.Description>
      <Form layout="vertical" style={{ marginTop: 20 }} onFinish={onFinish}>
        <Form.Item
          name="ticketName"
          label="티켓 이름"
          rules={[{ required: true, message: '티켓 이름을 입력해주세요.' }]}
        >
          <Input />
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

export default InvitationTicketForm;
