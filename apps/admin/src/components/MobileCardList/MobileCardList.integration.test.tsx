// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) MobileCardList에서 이름/연락처 문자열이 formatPhoneNumber 결과로 렌더링되는지 검증
// 2) 검색어가 boldText를 통해 <strong> 하이라이트로 렌더링되는지 검증
import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import MobileCardList from './index';

vi.mock('@boolti/ui', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

vi.mock('./MobileCardList.style', () => ({
  default: {
    Container: (props: React.HTMLAttributes<HTMLDivElement> & { isEmpty?: boolean }) => {
      const { isEmpty, ...domProps } = props;
      return <div data-empty={isEmpty ? 'true' : 'false'} {...domProps} />;
    },
    CardItem: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    Row: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    DateText: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    UserInfoText: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    TicketInfoText: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    ResetButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button type={props.type ?? 'button'} {...props} />
    ),
    TicketDetailTextWrap: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    TicketStatusText: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  },
}));

describe('MobileCardList integration', () => {
  it('이름/연락처를 포맷해 렌더링하고 검색어를 하이라이트한다', () => {
    const items = [
      {
        id: 1,
        name: '홍길동',
        phoneNumber: '01012345678',
        ticketName: '일반석',
        type: 'NORMAL' as const,
        status: '방문 완료',
      },
    ];

    const { container } = render(
      <MobileCardList
        items={items}
        searchText="1234"
        emptyText="비어있음"
        onClickReset={() => {}}
      />,
    );

    expect(container.textContent).toContain('홍길동 (010-1234-5678)');
    expect(container.querySelector('strong')?.textContent).toBe('1234');
  });
});
