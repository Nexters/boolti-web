import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns/format';

import { boldText } from '~/utils/boldText';
import { formatPhoneNumber } from '~/utils/format';

import Styled from './EnteranceTable.styles';
import { TicketWithReservationResponse } from '@boolti/api/src/types/adminTicket';

const columnHelper = createColumnHelper<TicketWithReservationResponse>();

const columns = [
  columnHelper.accessor('csTicketId', {
    header: '티켓 번호',
    minSize: 120,
  }),
  columnHelper.accessor('reservation.reservationHolder.name', {
    header: '방문자명',
    cell: (props) => {
      const { searchText = '' } = (props.table.options.meta ?? {}) as { searchText: string };
      return (
        <Styled.SearchResult
          dangerouslySetInnerHTML={{ __html: boldText(props.getValue(), searchText) }}
        />
      );
    },
    size: 80,
  }),
  columnHelper.accessor('reservation.reservationHolder.phoneNumber', {
    header: '연락처',
    cell: (props) => {
      const { searchText = '' } = (props.table.options.meta ?? {}) as { searchText: string };
      return (
        <Styled.SearchResult
          dangerouslySetInnerHTML={{
            __html: boldText(formatPhoneNumber(props.getValue()), searchText),
          }}
        />
      );
    },
    size: 140,
  }),
  columnHelper.accessor('salesTicketType.ticketType', {
    header: '티켓 종류',
    cell: (props) => `${props.getValue() === 'INVITE' ? '초청' : '일반'}티켓`,
    size: 80,
  }),
  columnHelper.accessor('salesTicketType.ticketName', {
    header: '티켓명',
    minSize: 80,
  }),
  columnHelper.accessor('usedAt', {
    header: '방문 일시',
    cell: (props) => {
      const value = props.getValue();
      return value ? (
        format(value, 'yyyy.MM.dd HH:mm')
      ) : (
        <Styled.DisabledText>아직 방문하지 않았습니다.</Styled.DisabledText>
      );
    },
    minSize: 200,
  }),
];

interface Props {
  data: TicketWithReservationResponse[];
  isEnteredTicket?: boolean;
  searchText: string;
  onClickReset?: VoidFunction;
}

const EnteranceTable = ({ searchText, data, isEnteredTicket, onClickReset }: Props) => {
  const isSearchResult = searchText !== '';
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: undefined,
    },
    meta: {
      searchText,
    },
  });
  return (
    <Styled.Container>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Styled.HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Styled.HeaderItem
                key={header.id}
                style={{
                  width: header.column.columnDef.minSize ? 'auto' : `${header.getSize()}px`,
                  minWidth: header.column.columnDef.minSize,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </Styled.HeaderItem>
            ))}
          </Styled.HeaderRow>
        ))}
      </thead>
      {data.length === 0 ? (
        <Styled.Empty>
          {isSearchResult ? (
            <>
              검색 결과가 없어요.{'\n'}방문자 이름 또는 연락처를 변경해보세요.
              <Styled.ResetButton colorTheme="line" size="bold" onClick={onClickReset}>
                검색 초기화
              </Styled.ResetButton>
            </>
          ) : isEnteredTicket ? (
            '아직 방문자가 없어요.'
          ) : (
            '미방문자가 없어요.'
          )}
        </Styled.Empty>
      ) : (
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Styled.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Styled.Item
                  key={cell.id}
                  style={{
                    width: cell.column.columnDef.minSize ? 'auto' : `${cell.column.getSize()}px`,
                    minWidth: cell.column.columnDef.minSize,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Styled.Item>
              ))}
            </Styled.Row>
          ))}
        </tbody>
      )}
    </Styled.Container>
  );
};

export default EnteranceTable;
