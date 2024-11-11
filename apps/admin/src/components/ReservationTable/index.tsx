import { ReservationWithTicketsResponse, TicketStatus } from '@boolti/api';
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
import { Tooltip } from 'react-tooltip';
import { palette } from '@boolti/ui';

const columnHelper = createColumnHelper<ReservationWithTicketsResponse>();

const getColumns = (ticketStatus: TicketStatus) => [
  columnHelper.accessor('csReservationId', {
    header: '주문 번호',
  }),
  columnHelper.accessor('paymentInfo.payerName', {
    header: '결제자명',
    cell: (props) => {
      const { searchText = '' } = (props.table.options.meta ?? {}) as { searchText: string };
      return (
        <span
          dangerouslySetInnerHTML={{ __html: boldText(props.getValue() ?? '-', searchText) }}
        ></span>
      );
    },
  }),
  columnHelper.accessor('paymentInfo.payerPhoneNumber', {
    header: '연락처',
    cell: (props) => {
      const { searchText = '' } = (props.table.options.meta ?? {}) as { searchText: string };
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: boldText(formatPhoneNumber(props.getValue() ?? '-'), searchText),
          }}
        ></span>
      );
    },
  }),
  columnHelper.accessor('salesTicketType.ticketType', {
    header: '티켓종류',
    cell: (props) => {
      switch (props.getValue()) {
        case 'INVITE':
          return '초청 티켓';
        case 'SALE':
          return '일반 티켓';
      }
    },
  }),
  columnHelper.accessor('salesTicketType.ticketName', {
    header: '티켓명',
  }),
  columnHelper.accessor('tickets', {
    header: '매수',
    cell: (props) => `${props.getValue().length}매`,
  }),
  columnHelper.accessor((row) => (row.salesTicketType?.price ?? 0) * row.tickets.length, {
    header: ticketStatus === 'CANCEL' ? '취소 금액' : '결제 금액',
    cell: (props) => `${props.getValue().toLocaleString()}원`,
  }),
  ...(ticketStatus === 'COMPLETE'
    ? [
        columnHelper.accessor(
          (row) =>
            row.tickets.length > 1
              ? `${row.tickets[0].csTicketId} 외 ${row.tickets.length - 1}개`
              : row.tickets[0]?.csTicketId,
          {
            header: '티켓 번호',
            cell: (props) => {
              const useTooltip = props.row.original.tickets.length > 1;
              if (useTooltip) {
                return (
                  <Styled.TooltipAnchor
                    className="ticket-tooltip"
                    data-for="ticket-tooltip"
                    data-tooltip-content={
                      useTooltip
                        ? props.row.original.tickets
                            .reduce((content, ticket) => content + ' ' + ticket.csTicketId, '')
                            .trim()
                        : ''
                    }
                  >
                    {props.getValue()}
                  </Styled.TooltipAnchor>
                );
              }
              return props.getValue();
            },
          },
        ),
      ]
    : []),
  columnHelper.accessor(
    (row) => {
      if (ticketStatus === 'CANCEL') {
        return row.cancelInfo?.canceledAt;
      }

      return row.createdAt;
    },
    {
      header: ticketStatus === 'CANCEL' ? '취소 일시' : '결제 일시',
      cell: (props) => {
        const value = props.getValue();
        if (value) {
          return format(value, 'yyyy/MM/dd HH:mm');
        }
        return '-';
      },
    },
  ),
];

interface Props {
  emptyText: string;
  data: ReservationWithTicketsResponse[];
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
    columns: getColumns(selectedTicketStatus),
    data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      searchText,
    },
  });
  return (
    <>
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
                검색 결과가 없어요.{'\n'}방문자 이름 또는 연락처를 변경해보세요.
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
      <Tooltip
        style={{
          opacity: 0.85,
          backgroundColor: palette.grey.g90,
          filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10))',
          padding: '6px 8px',
          borderRadius: '4px',
          zIndex: 999,
        }}
        anchorSelect=".ticket-tooltip"
        id="ticket-tooltip"
        place="bottom"
        render={({ content }) => {
          const ticketIds = (content ?? '').split(' ');
          return (
            <Styled.TooltipItemColumn>
              {ticketIds.map((id, index) => (
                <Styled.TooltipItemRow>
                  <span>No.{index + 1}</span>
                  <span>{id}</span>
                </Styled.TooltipItemRow>
              ))}
            </Styled.TooltipItemColumn>
          );
        }}
      />
    </>
  );
};

export default ReservationTable;
