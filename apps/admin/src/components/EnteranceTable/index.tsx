import { EntranceResponse } from '@boolti/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { formatPhoneNumber } from '~/utils/format';

import Styled from './EnteranceTable.styles';

const columnHelper = createColumnHelper<EntranceResponse>();

const columns = [
  columnHelper.accessor('ticketId', {
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
    header: '연락처',
  }),
  columnHelper.accessor('reservationPhoneNumber', {
    header: '전화번호',
    cell: (props) => formatPhoneNumber(props.getValue()),
  }),
  columnHelper.accessor('entered', {
    header: '상태',
    cell: (props) => (props.getValue() ? '입장 확인' : '미입장'),
  }),
  columnHelper.accessor('enteredAt', {
    header: '입장 일시',
    cell: (props) => props.getValue(),
  }),
];


interface Props {
  data: EntranceResponse[];
  isEnteredTicket: boolean;
  isSearchResult: boolean;
  onClickReset?: VoidFunction;
}

const EnteranceTable = ({ isSearchResult, data, isEnteredTicket, onClickReset }: Props) => {
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
      {data.length === 0 ? (
        <Styled.Empty>
          {isSearchResult ? (
            <>
              검색 결과가 없어요.{'\n'}예매자 이름 또는 연락처를 변경해보세요.
              <Styled.ResetButton colorTheme="line" size="bold" onClick={onClickReset}>
                검색 초기화
              </Styled.ResetButton>
            </>
          ) : isEnteredTicket ? (
            '입장 관객이 없어요.'
          ) : (
            '미입장 관객이 없어요.'
          )}
        </Styled.Empty>
      ) : (
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
      )}
    </Styled.Container>
  );
};

export default EnteranceTable;
