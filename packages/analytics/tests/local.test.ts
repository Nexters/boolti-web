import { beforeEach, afterEach, expect, it, vi } from 'vitest';
import { createLocalCollector, LOCAL_LOG_KEY, DEBUG_LOG_KEY } from '../src/local';

beforeEach(() => {
  localStorage.clear();
  document.body.replaceChildren();
});
afterEach(() => vi.restoreAllMocks());

it('keeps live debug history separate from events that were never sent', () => {
  const local = createLocalCollector();
  local.track('LocalOnly', {});
  document.body.replaceChildren();
  const debug = createLocalCollector('debug');
  debug.track('SentToSDK', {});
  expect(JSON.parse(localStorage.getItem(LOCAL_LOG_KEY)!)[0].name).toBe('LocalOnly');
  expect(JSON.parse(localStorage.getItem(DEBUG_LOG_KEY)!)[0].name).toBe('SentToSDK');
  const root = document.querySelector('#boolti-analytics-local')!.shadowRoot!;
  expect(root.querySelector('summary')!.textContent).toContain('전송 1건');
  root.querySelector<HTMLButtonElement>('#clear')!.click();
  expect(JSON.parse(localStorage.getItem(DEBUG_LOG_KEY)!)).toEqual([]);
  expect(JSON.parse(localStorage.getItem(LOCAL_LOG_KEY)!)).toHaveLength(1);
});

it('restores saved records, filters the panel, and clears persistent history', () => {
  localStorage.setItem(
    LOCAL_LOG_KEY,
    JSON.stringify([
      {
        time: '2026-10-21T00:00:00.000Z',
        operation: 'event',
        name: 'Search',
        properties: { result_count: 7 },
      },
    ]),
  );
  const collector = createLocalCollector();
  collector.track('Click', { object_value: '<script>unsafe</script>' });
  const root = document.querySelector('#boolti-analytics-local')!.shadowRoot!;
  expect(root.querySelector('summary')!.textContent).toContain('2건');
  expect(root.querySelector('[role="status"]')!.textContent).toContain('저장 확인됨');
  expect(root.querySelector('script')).toBeNull();
  const input = root.querySelector('input')!;
  input.value = 'result_count';
  input.dispatchEvent(new Event('input'));
  expect(root.querySelectorAll('li')).toHaveLength(1);
  expect(root.querySelector('li')!.textContent).toContain('Search');
  root.querySelector<HTMLButtonElement>('#clear')!.click();
  expect(JSON.parse(localStorage.getItem(LOCAL_LOG_KEY)!)).toEqual([]);
  expect(root.querySelectorAll('li')).toHaveLength(0);
});

it('shows storage failure and keeps recording in memory without breaking interactions', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('quota');
  });
  const collector = createLocalCollector();
  expect(() => collector.track('Click', {})).not.toThrow();
  const root = document.querySelector('#boolti-analytics-local')!.shadowRoot!;
  expect(root.querySelector('[role="status"]')!.textContent).toContain('저장 실패');
  expect(root.querySelectorAll('li')).toHaveLength(1);
});

it('keeps only the latest 300 records', () => {
  const collector = createLocalCollector();
  for (let index = 0; index < 302; index++) collector.track(`event-${index}`, {});
  const entries = JSON.parse(localStorage.getItem(LOCAL_LOG_KEY)!);
  expect(entries).toHaveLength(300);
  expect(entries[0].name).toBe('event-2');
  expect(entries.at(-1).name).toBe('event-301');
});
