import { AdminReservationResponse } from '@boolti/api/src/types/adminReservation';
import Styled from './PaymentTable.styles';
import { TicketStatus } from '@boolti/api';
import { format } from 'date-fns';

interface PaymentTableProps {
  data: AdminReservationResponse[];
  ticketStatus: TicketStatus;
}

const PaymentTable = ({ data, ticketStatus }: PaymentTableProps) => {
  const getPaymentMeans = (means: 'ACCOUNT_TRANSFER' | 'CARD' | 'FREE' | 'SIMPLE_PAYMENT') => {
    switch (means) {
      case 'ACCOUNT_TRANSFER':
        return '계좌이체';
      case 'CARD':
        return '카드';
      case 'FREE':
        return '-';
      case 'SIMPLE_PAYMENT':
        return '간편결제';
    }
  };
  return (
    <Styled.TableContainer>
      <Styled.Table>
        <Styled.TableHeader>
          <Styled.TableHeaderItem width={100}>상태</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={108}>티켓 번호</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={80} align="center">
            티켓 종류
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={180}>티켓 이름</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={100}>방문자 이름</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={140}>방문자 연락처</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={100}>결제자 이름</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={140}>결제자 연락처</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={96}>주문 번호</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={92} align="right">
            결제 금액
          </Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={168}>결제 수단</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={148}>결제 일시</Styled.TableHeaderItem>
          <Styled.TableHeaderItem width={100}>결제 방법</Styled.TableHeaderItem>
          {ticketStatus === 'CANCEL' && (
            <>
              <Styled.TableHeaderItem width={92} align="right">
                취소 금액
              </Styled.TableHeaderItem>
              <Styled.TableHeaderItem width={168}>취소 수단</Styled.TableHeaderItem>
              <Styled.TableHeaderItem width={148}>취소 일시</Styled.TableHeaderItem>
              <Styled.TableHeaderItem width={162}>취소 사유</Styled.TableHeaderItem>
            </>
          )}
        </Styled.TableHeader>
        {data.length ? (
          <>
            {data.map((item) => (
              <Styled.TableRow key={item.ticketId}>
                <Styled.TableItem width={100}>
                  <Styled.EntranceStateText complete={item.ticketStatus === 'COMPLETE'}>
                    {item.ticketStatus === 'COMPLETE' ? '발권 완료' : '발권 취소'}
                  </Styled.EntranceStateText>
                </Styled.TableItem>
                <Styled.TableItem width={108}>{item.csTicketId}</Styled.TableItem>
                <Styled.TableItem width={80}>
                  {item.ticketType === 'INVITE' ? '초청' : '일반'} 티켓
                </Styled.TableItem>
                <Styled.TableItem width={180}>{item.ticketName}</Styled.TableItem>
                <Styled.TableItem width={100}>{item.reservationName}</Styled.TableItem>
                <Styled.TableItem width={140}>{item.reservationPhoneNumber}</Styled.TableItem>
                <Styled.TableItem width={100}>결제자 이름</Styled.TableItem>
                <Styled.TableItem width={140}>결제자 연락처</Styled.TableItem>
                <Styled.TableItem width={96}>{item.csReservationId}</Styled.TableItem>
                <Styled.TableItem align="right" width={92}>
                  {item.ticketPrice.toLocaleString()}원
                </Styled.TableItem>
                <Styled.TableItem width={168}>결제 수단</Styled.TableItem>
                <Styled.TableItem width={148}>
                  {format(item.ticketCreatedAt, 'yyyy.MM.dd HH:mm')}
                </Styled.TableItem>
                <Styled.TableItem width={100}>{getPaymentMeans(item.means)}</Styled.TableItem>
                {ticketStatus === 'CANCEL' && (
                  <>
                    <Styled.TableItem width={92} align="right">
                      취소 금액
                    </Styled.TableItem>
                    <Styled.TableItem width={168}>취소 수단</Styled.TableItem>
                    <Styled.TableItem width={148}>취소 일시</Styled.TableItem>
                    <Styled.TableItem width={162}>취소 사유</Styled.TableItem>
                  </>
                )}
              </Styled.TableRow>
            ))}
          </>
        ) : (
          <Styled.Empty>
            test
            {/* {isEnteredTicket ? '입장 관객이 없어요.' : '미입장 관객이 없어요.'} */}
          </Styled.Empty>
        )}
      </Styled.Table>
    </Styled.TableContainer>
  );
};

export default PaymentTable;
