import { ReservationResponse, TicketStatus } from '@boolti/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

import { boldText } from '~/utils/boldText';
import { formatPhoneNumber } from '~/utils/format';

import Styled from './ReservationTable.styles';

const columnHelper = createColumnHelper<ReservationResponse>();

const columns = [
  columnHelper.accessor('csTicketId', {
    header: '티켓 번호',
  }),
  columnHelper.accessor('ticketType', {
    header: '티켓 종류',
    cell: (props) => `${props.getValue() === 'INVITE' ? '초청' : '일반'}티켓`,
  }),
  columnHelper.accessor('ticketName', {
    header: '티켓 이름',
  }),
  columnHelper.accessor('reservationName', {
    header: '예매자 이름',
    cell: (props) => {
      const { searchText = '' } = (props.table.options.meta ?? {}) as { searchText: string };
      return (
        <span dangerouslySetInnerHTML={{ __html: boldText(props.getValue(), searchText) }}></span>
      );
    },
  }),
  columnHelper.accessor('reservationPhoneNumber', {
    header: '연락처',
    cell: (props) => {
      const { searchText = '' } = (props.table.options.meta ?? {}) as { searchText: string };
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: boldText(formatPhoneNumber(props.getValue()), searchText),
          }}
        ></span>
      );
    },
  }),
  columnHelper.accessor('csReservationId', {
    header: '주문 번호',
  }),
  columnHelper.accessor('ticketPrice', {
    header: (props) =>
      (props.table.options.meta as { ticketStatus: TicketStatus }).ticketStatus === 'CANCEL'
        ? '환불 금액'
        : '결제 금액',
    cell: (props) => `${props.getValue().toLocaleString()}원`,
  }),
  columnHelper.accessor('means', {
    header: (props) =>
      (props.table.options.meta as { ticketStatus: TicketStatus }).ticketStatus === 'CANCEL'
        ? '환불 방법'
        : '결제 방법',
    cell: (props) =>
      props.getValue() === 'CARD'
        ? '카드 결제'
        : props.getValue() === 'ACCOUNT_TRANSFER'
          ? '계좌 이체'
          : '초청 코드',
  }),
  columnHelper.accessor('ticketIssuedAt', {
    header: (props) =>
      (props.table.options.meta as { ticketStatus: TicketStatus }).ticketStatus === 'CANCEL'
        ? '환불일시'
        : '발권일시',
    cell: (props) => (props.getValue() ? format(props.getValue(), 'yyyy/MM/dd HH:mm') : '-'),
  }),
];

interface Props {
  emptyText: string;
  data: ReservationResponse[];
  selectedTicketStatus: TicketStatus;
  searchText: string;
  onClickReset?: VoidFunction;
}

const ReservationTable = ({
  emptyText,
  searchText,
  data,
  selectedTicketStatus,
  onClickReset,
}: Props) => {
  const isSearchResult = searchText !== '';
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      ticketStatus: selectedTicketStatus,
      searchText,
    },
  });
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
            emptyText
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
