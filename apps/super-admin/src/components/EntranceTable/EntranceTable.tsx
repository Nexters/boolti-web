import { format } from 'date-fns/format';
import Styled from './EntranceTable.styles';
import { AdminEntranceResponse } from '@boolti/api/src/types/adminEntrance';
interface EntranceTableProps {
  data: AdminEntranceResponse[];
  isEnteredTicket: boolean;
}

const EntranceTable = ({ data, isEnteredTicket }: EntranceTableProps) => {
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
          {isEnteredTicket && (
            <Styled.TableHeaderItem width={148}>입장 일시</Styled.TableHeaderItem>
          )}
        </Styled.TableHeader>
        {data.length ? (
          <>
            {data.map((item) => (
              <Styled.TableRow key={item.ticketId}>
                <Styled.TableItem width={100}>
                  <Styled.EntranceStateText complete={item.entered}>
                    {item.entered ? '입장 완료' : '미입장'}
                  </Styled.EntranceStateText>
                </Styled.TableItem>
                <Styled.TableItem width={108}>{item.csTicketId}</Styled.TableItem>
                <Styled.TableItem width={80}>
                  {item.ticketType === 'INVITE' ? '초청' : '일반'} 티켓
                </Styled.TableItem>
                <Styled.TableItem width={180}>{item.ticketName}</Styled.TableItem>
                <Styled.TableItem width={100}>{item.reservationName}</Styled.TableItem>
                <Styled.TableItem width={140}>{item.reservationPhoneNumber}</Styled.TableItem>
                {isEnteredTicket && (
                  <Styled.TableItem width={148}>
                    {format(item.enteredAt, 'yyyy/MM/dd HH:mm')}
                  </Styled.TableItem>
                )}
              </Styled.TableRow>
            ))}
          </>
        ) : (
          <Styled.Empty>
            {isEnteredTicket ? '입장 관객이 없어요.' : '미입장 관객이 없어요.'}
          </Styled.Empty>
        )}
      </Styled.Table>
    </Styled.TableContainer>
  );
};

export default EntranceTable;
