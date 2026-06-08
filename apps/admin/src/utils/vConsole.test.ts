import { beforeEach, describe, expect, it, vi } from 'vitest';

const loadModule = async (isWebView: boolean, isProduction: boolean) => {
  vi.resetModules();
  vi.doMock('@boolti/bridge', () => ({
    checkIsWebView: vi.fn(() => isWebView),
  }));
  vi.doMock('~/constants/phase', () => ({
    IS_PRODUCTION_PHASE: isProduction,
  }));

  const destroy = vi.fn();
  const vConsoleCtor = vi.fn(() => ({ destroy }));
  vi.doMock('vconsole', () => ({
    default: vConsoleCtor,
  }));

  const mod = await import('./vConsole');
  return { ...mod, vConsoleCtor, destroy };
};

describe('vConsole utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('웹뷰가 아니거나 프로덕션이면 vConsole을 초기화하지 않는다', async () => {
    const local = await loadModule(false, false);
    await local.initVConsole();
    expect(local.vConsoleCtor).not.toHaveBeenCalled();

    const prod = await loadModule(true, true);
    await prod.initVConsole();
    expect(prod.vConsoleCtor).not.toHaveBeenCalled();
  });

  it('웹뷰이면서 비프로덕션이면 vConsole을 초기화한다', async () => {
    const mod = await loadModule(true, false);
    await mod.initVConsole();

    expect(mod.vConsoleCtor).toHaveBeenCalledTimes(1);
  });

  it('초기화된 경우 destroyVConsole이 destroy를 호출한다', async () => {
    const mod = await loadModule(true, false);
    await mod.initVConsole();
    mod.destroyVConsole();

    expect(mod.destroy).toHaveBeenCalledTimes(1);
  });
});
