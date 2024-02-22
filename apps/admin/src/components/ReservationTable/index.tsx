import { ReservationResponse, TicketStatus } from '@boolti/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

import { formatPhoneNumber } from '~/utils/format';

import Styled from './ReservationTable.styles';

const columnHelper = createColumnHelper<ReservationResponse>();

const columns = [
  columnHelper.accessor('ticketId', {
    header: '티켓 번호',
  }),
  columnHelper.accessor('ticketType', {
    header: '티켓 타입',
    cell: (props) => `${props.getValue() === 'INVITE' ? '초청' : '일반'}티켓`,
  }),
  columnHelper.accessor('ticketName', {
    header: '티켓 이름',
  }),
  columnHelper.accessor('reservationName', {
    header: '예매자 이름',
  }),
  columnHelper.accessor('reservationPhoneNumber', {
    header: '연락처',
    cell: (props) => formatPhoneNumber(props.getValue()),
  }),
  columnHelper.accessor('reservationId', {
    header: '주문 번호',
  }),
  columnHelper.accessor('ticketPrice', {
    header: '결제 금액',
    cell: (props) => `${props.getValue().toLocaleString()}원`,
  }),
  columnHelper.accessor('means', {
    header: '결제 방법',
    cell: (props) =>
      props.getValue() === 'CARD'
        ? '카드 결제'
        : props.getValue() === 'ACCOUNT_TRANSFER'
          ? '계좌 이체'
          : '',
  }),
  columnHelper.accessor('ticketIssuedAt', {
    header: '발권일시',
    cell: (props) => (props.getValue() ? format(props.getValue(), 'yyyy/MM/dd HH:mm') : '-'),
  }),
];

const emptyLabel: Record<TicketStatus, string> = {
  WAIT: '발권 대기중인 티켓이 없어요.',
  COMPLETE: '발권 왼료된 티켓이 없어요.',
  CANCEL: '발권 취소된 티켓이 없어요.',
};

interface Props {
  data: ReservationResponse[];
  selectedTicketStatus: TicketStatus;
  isSearchResult: boolean;
  onClickReset?: VoidFunction;
}

const ReservationTable = ({ isSearchResult, data, selectedTicketStatus, onClickReset }: Props) => {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });
  return (
    <Styled.Container>
      {table.getHeaderGroups().map((headerGroup) => (
        <Styled.HeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Styled.HeaderItem key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </Styled.HeaderItem>
          ))}
        </Styled.HeaderRow>
      ))}
      {data.length === 0 ? (
        <Styled.Empty>
          {isSearchResult ? (
            <>
              검색 결과가 없어요.{'\n'}예매자 이름 또는 연락처를 변경해보세요.
              <Styled.ResetButton colorTheme="line" size="bold" onClick={onClickReset}>
                검색 초기화
              </Styled.ResetButton>
            </>
          ) : (
            emptyLabel[selectedTicketStatus]
          )}
        </Styled.Empty>
      ) : (
        <>
          {table.getRowModel().rows.map((row) => (
            <Styled.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Styled.Item key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Styled.Item>
              ))}
            </Styled.Row>
          ))}
        </>
      )}
    </Styled.Container>
  );
};

export default ReservationTable;
