import { ReservationResponse } from '@boolti/api';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import Styled from './ReservationTable.styles';

const columnHelper = createColumnHelper<ReservationResponse>()

const columns = [
  columnHelper.accessor('ticketId', {
    header: () => <span>티켓 번호</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor('ticketType', {
    header: () => <span>티켓 타입</span>,
    cell: props => <span>{`${props.getValue() === 'INVITE' ? '초청' : '일반'}티켓`}</span>,
  }),
  columnHelper.accessor('ticketName', {
    header: () => <span>티켓 이름</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor('reservationName', {
    header: () => <span>예매자 이름</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor('reservationPhoneNumber', {
    header: () => <span>연락처</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor('reservationId', {
    header: () => <span>주문 번호</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor('ticketPrice', {
    header: () => <span>결제 금액</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor('means', {
    header: () => <span>결제 방법</span>,
    cell: props => <span>{props.getValue() === 'CARD' ? '카드 결제' : '초청 코드'}</span>,
  }),
  columnHelper.accessor('ticketIssuedAt', {
    header: () => <span>발권일시</span>,
    cell: props => <span>{props.getValue()}</span>,
  }),
]



interface Props {
  data: ReservationResponse[];
}

const ReservationTable = ({ data }: Props) => {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel(), })
  console.log(data);
  console.log(table)
  return (
    <Styled.Container>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Styled.Container>
  )
}

export default ReservationTable;