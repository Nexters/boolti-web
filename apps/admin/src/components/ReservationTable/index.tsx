import { ReservationResponse } from '@boolti/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { formatPhoneNumber } from '~/utils/format';

import Styled from './ReservationTable.styles';

const columnHelper = createColumnHelper<ReservationResponse>();

const columns = [
  columnHelper.accessor('ticketId', {
    header: '티켓 번호',
  }),
  columnHelper.accessor('ticketType', {
    header: '티켓 타입',
    cell: (props) => `${props.getValue() === 'INVITE' ? '초청' : '일반'}티켓`
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
    cell: (props) => `${props.getValue().toLocaleString()}원`
  }),
  columnHelper.accessor('means', {
    header: '결제 방법',
    cell: (props) => props.getValue() === 'CARD' ? '카드 결제' : '초청 코드'
  }),
  columnHelper.accessor('ticketIssuedAt', {
    header: '발권일시',
  }),
];

interface Props {
  data: ReservationResponse[];
}

const ReservationTable = ({ data }: Props) => {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });
  return (
    <Styled.Container>
      <Styled.Header>
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
      </Styled.Header>
      <Styled.Body>
        {table.getRowModel().rows.map((row) => (
          <Styled.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Styled.Item key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Styled.Item>
            ))}
          </Styled.Row>
        ))}
      </Styled.Body>
    </Styled.Container>
  );
};

export default ReservationTable;
