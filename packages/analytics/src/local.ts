// This collector records locally only; runtime.ts optionally mirrors SDK calls into it.
export const LOCAL_LOG_KEY = 'boolti_analytics_local_logs';
export const DEBUG_LOG_KEY = 'boolti_analytics_debug_logs';
const LIMIT = 300;
type Entry = {
  time: string;
  operation: string;
  name: string;
  userId?: string;
  properties: Record<string, unknown>;
};

export const createLocalCollector = (mode: 'local' | 'debug' = 'local') => {
  const live = mode === 'debug';
  const logKey = live ? DEBUG_LOG_KEY : LOCAL_LOG_KEY;
  let entries: Entry[] = [];
  let stored = true;
  let userId: string | undefined;
  let refresh = () => {};
  try {
    const value: unknown = JSON.parse(localStorage.getItem(logKey) ?? '[]');
    if (Array.isArray(value))
      entries = value
        .filter((entry): entry is Entry =>
          Boolean(
            entry &&
              typeof entry.time === 'string' &&
              typeof entry.name === 'string' &&
              typeof entry.operation === 'string' &&
              entry.properties &&
              typeof entry.properties === 'object',
          ),
        )
        .slice(-LIMIT);
  } catch {
    stored = false;
  }
  const persist = () => {
    try {
      const json = JSON.stringify(entries);
      localStorage.setItem(logKey, json);
      stored = localStorage.getItem(logKey) === json;
    } catch {
      stored = false;
    }
  };
  const record = (operation: string, name: string, properties: Record<string, unknown> = {}) => {
    entries.push({ time: new Date().toISOString(), operation, name, userId, properties });
    entries = entries.slice(-LIMIT);
    persist();
    refresh();
  };
  const mount = () => {
    const host = document.createElement('div');
    host.id = 'boolti-analytics-local';
    host.style.cssText = 'position:fixed;bottom:12px;right:12px;z-index:2147483647;';
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>
      :host{all:initial;display:block;color-scheme:light;text-align:left}
      *,*::before,*::after{box-sizing:border-box}
      details{font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172033;
        background:#f1f5f9;border:1px solid #cbd5e1;border-radius:16px;overflow:hidden;
        box-shadow:0 16px 48px #0f172a33,0 2px 8px #0f172a1a}
      summary{display:flex;align-items:center;gap:10px;cursor:pointer;list-style:none;
        padding:15px 18px;background:#172033;color:#fff;font-size:16px;font-weight:700;user-select:none}
      summary::-webkit-details-marker{display:none}
      .dot{width:9px;height:9px;border-radius:50%;background:#6ee7b7;box-shadow:0 0 0 4px #6ee7b71a;flex-shrink:0}
      .chevron{display:flex;align-items:center;justify-content:center;flex-shrink:0;
        width:24px;height:24px;margin-left:auto;color:#cbd5e1;transition:transform .15s}
      .chevron svg{display:block}
      details[open] .chevron{transform:rotate(180deg)}
      section{display:flex;flex-direction:column;width:min(560px,calc(100vw - 24px));
        max-height:calc(100dvh - 90px);padding:18px;gap:12px}
      p{margin:0;color:#475569;font-size:14px;line-height:1.65}
      .intro strong{display:block;color:#172033;font-size:16px;margin-bottom:2px}
      [role="status"]{padding:10px 12px;border:1px solid #a7d7c5;border-radius:8px;
        background:#ecfdf5;color:#166044;font-size:14px;font-weight:600}
      [role="status"][data-stored="false"]{background:#fff7ed;border-color:#fdba74;color:#9a3412}
      input,button{font:inherit;line-height:1.5;border-radius:8px;min-height:42px}
      input{width:100%;padding:10px 12px;color:#172033;background:#fff;border:1px solid #94a3b8}
      input::placeholder{color:#64748b;opacity:1}
      :is(input,button,summary):focus-visible{outline:3px solid #2563eb;outline-offset:3px}
      .actions{display:flex;gap:8px;flex-wrap:wrap}
      button{cursor:pointer;padding:9px 14px;font-weight:600;color:#334155;background:#fff;border:1px solid #94a3b8}
      button:hover{background:#e2e8f0}
      #export{background:#1d4ed8;border-color:#1d4ed8;color:#fff} #export:hover{background:#1e40af}
      #clear{color:#9f1239}
      ol{min-height:0;max-height:50vh;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable;
        margin:0;padding:0 4px 0 0;list-style:none;display:flex;flex-direction:column;gap:12px}
      ol:empty::after{content:"표시할 이벤트가 없습니다.";display:block;text-align:center;padding:28px 12px;color:#475569}
      li{background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:14px;flex-shrink:0}
      .entry-heading{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}
      .entry-heading strong{font-size:16px;color:#0f172a;overflow-wrap:anywhere}
      .badge{font:600 12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        padding:3px 8px;border-radius:5px;background:#dbeafe;color:#1e40af}
      .badge[data-operation="identity"]{background:#ede9fe;color:#5b21b6}
      .badge[data-operation="user"]{background:#ccfbf1;color:#115e59}
      .entry-meta{font-size:13px;color:#475569;margin-bottom:10px;overflow-wrap:anywhere}
      pre{font:14px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;color:#1e293b;background:#f1f5f9;
        white-space:pre-wrap;overflow-wrap:anywhere;border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin:0;tab-size:2}
      @media(max-width:480px){
        :host{top:12px!important;bottom:auto!important}
        section{padding:12px;gap:10px} summary{padding:13px 14px} li{padding:12px} pre{padding:10px}
      }
    </style><details><summary><span class="dot" aria-hidden="true"></span><span id="heading"></span><span class="chevron" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></summary><section>
      <p class="intro"><strong>${live ? 'Mixpanel 전송 모드 · 디버그 로그' : '로컬 기록 모드 · Mixpanel 전송 없음'}</strong>${live ? 'Mixpanel에 전송을 요청한 최근 300건을 브라우저에도 저장합니다. 최종 수신 여부는 Mixpanel에서 확인해주세요.' : '현재 사이트의 최근 300건을 브라우저에 저장합니다.'}</p>
      <p role="status"></p><input aria-label="이벤트 검색" placeholder="이벤트명이나 속성으로 검색">
      <div class="actions"><button type="button" id="export">JSON 다운로드</button><button type="button" id="clear">기록 지우기</button></div>
      <ol aria-label="로컬 이벤트 기록"></ol>
    </section></details>`;
    const input = root.querySelector('input')!;
    refresh = () => {
      root.querySelector('#heading')!.textContent =
        `이벤트 로그 · ${live ? '전송' : '로컬'} ${entries.length}건`;
      const status = root.querySelector<HTMLElement>('[role="status"]')!;
      status.dataset.stored = String(stored);
      status.textContent = stored
        ? '저장 확인됨 · 새로고침 후에도 유지됩니다.'
        : '저장 실패 · 현재 메모리에만 기록됩니다. 새로고침하면 사라질 수 있습니다.';
      const list = root.querySelector('ol')!;
      list.replaceChildren();
      for (const entry of [...entries].reverse()) {
        if (!JSON.stringify(entry).toLowerCase().includes(input.value.toLowerCase())) continue;
        const item = document.createElement('li');
        const heading = document.createElement('div');
        heading.className = 'entry-heading';
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.dataset.operation = entry.operation;
        badge.textContent = entry.operation;
        const title = document.createElement('strong');
        title.textContent = entry.name;
        heading.append(badge, title);
        const meta = document.createElement('div');
        meta.className = 'entry-meta';
        meta.textContent = `${new Date(entry.time).toLocaleString()}${entry.userId ? ` · 사용자 ${entry.userId}` : ''}`;
        const payload = document.createElement('pre');
        payload.textContent = JSON.stringify(entry, null, 2);
        item.append(heading, meta, payload);
        list.append(item);
      }
    };
    input.addEventListener('input', refresh);
    root.querySelector('#clear')!.addEventListener('click', () => {
      entries = [];
      persist();
      refresh();
    });
    root.querySelector('#export')!.addEventListener('click', () => {
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = `boolti-${live ? 'debug' : 'local'}-events.json`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    persist();
    refresh();
    document.body.append(host);
  };
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });

  const track: (
    event: string,
    properties: Record<string, unknown>,
    options?: RequestOptions,
  ) => void = (event, properties) => record('event', event, properties);

  return {
    track,
    identify: (id: string) => {
      userId = id;
      record('identity', 'identify');
    },
    reset: () => {
      userId = undefined;
      record('identity', 'reset');
    },
    get_property: (key: string): unknown => (key === '$user_id' ? userId : undefined),
    people: {
      set: (properties: Record<string, unknown>) => record('user', 'set', properties),
      set_once: (properties: Record<string, unknown>) => record('user', 'set_once', properties),
    },
  };
};
import type { RequestOptions } from 'mixpanel-browser';
