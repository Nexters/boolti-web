// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) ReservationTable에서 연락처가 formatPhoneNumber 결과로 렌더링되는지 검증
// 2) 검색어가 boldText를 통해 <strong> 하이라이트로 렌더링되는지 검증
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ReservationWithTicketsResponse } from '@boolti/api';

import ReservationTable from './index';

vi.mock('react-tooltip', () => ({
  Tooltip: () => null,
}));

vi.mock('@boolti/ui', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type={props.type ?? 'button'} {...props} />
  ),
  palette: {
    grey: {
      g90: '#111111',
    },
  },
}));

vi.mock('./ReservationTable.styles', () => ({
  default: {
    Container: (props: React.HTMLAttributes<HTMLTableElement>) => <table {...props} />,
    HeaderRow: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
    HeaderItem: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th {...props} />,
    Empty: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
    ResetButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button type={props.type ?? 'button'} {...props} />
    ),
    Row: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
    Item: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
    TooltipAnchor: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
    TooltipItemColumn: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    TooltipItemRow: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    DisabledText: (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...props} />,
  },
}));

describe('ReservationTable integration', () => {
  it('연락처를 포맷해서 렌더링하고 검색어를 하이라이트한다', () => {
    const row: ReservationWithTicketsResponse = {
      reservationId: 1,
      csReservationId: 1,
      paymentManagementStatus: 'COMPLETE',
      paymentInfo: {
        payerName: '홍길동',
        payerPhoneNumber: '01012345678',
        means: 'CARD',
      },
      reservationHolderDetail: {
        name: '김방문',
        phoneNumber: '0212345678',
      },
      salesTicketType: {
        id: 10,
        ticketType: 'SALE',
        ticketName: '일반',
        price: 12000,
      },
      tickets: [{ ticketId: 101, csTicketId: 'T-1', createdAt: '2026-05-01T10:00:00' }],
      createdAt: '2026-05-01T10:00:00',
      modifiedAt: '2026-05-01T10:00:00',
    };

    const { container } = render(
      <ReservationTable
        emptyText="비어있음"
        data={[row]}
        selectedTicketStatus="COMPLETE"
        searchText="1234"
      />,
    );

    expect(container.querySelector('tbody .payerPhoneNumber')?.textContent).toContain(
      '010-1234-5678',
    );
    expect(screen.getByText('02-1234-5678')).toBeTruthy();
    expect(container.querySelector('strong')?.textContent).toBe('1234');
  });
});
