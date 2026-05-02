// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) EnteranceTable에서 연락처가 formatPhoneNumber 결과로 렌더링되는지 검증
// 2) 검색어가 boldText를 통해 <strong> 하이라이트로 렌더링되는지 검증
import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import EnteranceTable from './index';

type EnteranceRow = React.ComponentProps<typeof EnteranceTable>['data'][number];

vi.mock('@boolti/ui', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type={props.type ?? 'button'} {...props} />
  ),
}));

vi.mock('./EnteranceTable.styles', () => ({
  default: {
    Container: (props: React.HTMLAttributes<HTMLTableElement>) => <table {...props} />,
    HeaderRow: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
    HeaderItem: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th {...props} />,
    Row: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
    Item: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
    Empty: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
    ResetButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button type={props.type ?? 'button'} {...props} />
    ),
    DisabledText: (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...props} />,
    SearchResult: (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...props} />,
  },
}));

describe('EnteranceTable integration', () => {
  it('연락처를 포맷하고 검색어를 하이라이트한다', () => {
    const row: EnteranceRow = {
      id: 1,
      csTicketId: 'T-100',
      reservation: {
        id: 10,
        csReservationId: 22,
        reservationHolder: {
          name: '홍길동',
          phoneNumber: '01012345678',
        },
      },
      salesTicketType: {
        id: 7,
        ticketType: 'SALE',
        ticketName: '일반석',
        price: 10000,
      },
      createdAt: '2026-05-01T10:00:00',
      usedAt: '2026-05-01T11:00:00',
    };

    const { container } = render(
      <EnteranceTable data={[row]} searchText="1234" isEnteredTicket={false} />,
    );

    expect(container.querySelector('tbody')?.textContent).toContain('010-1234-5678');
    expect(container.querySelector('strong')?.textContent).toBe('1234');
  });
});
