// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useBodyScrollLock } from './useBodyScrollLock';

describe('useBodyScrollLock', () => {
  it('enabled=true면 body overflow를 hidden으로 잠근다', () => {
    document.body.style.overflow = 'auto';
    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('unmount 시 원래 overflow 값을 복원한다', () => {
    document.body.style.overflow = 'scroll';
    const { unmount } = renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('enabled=false면 overflow를 변경하지 않는다', () => {
    document.body.style.overflow = 'visible';
    renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe('visible');
  });
});
