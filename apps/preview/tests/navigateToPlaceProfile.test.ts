import { beforeEach, describe, expect, it, vi } from 'vitest';

const { get, isBridgeAvailable, navigateNative } = vi.hoisted(() => ({
  get: vi.fn(),
  isBridgeAvailable: vi.fn(),
  navigateNative: vi.fn(),
}));

vi.mock('@boolti/api', () => ({ fetcher: { get } }));
vi.mock('@boolti/bridge', () => ({
  isWebViewBridgeAvailable: isBridgeAvailable,
  navigateToPlaceDetail: navigateNative,
}));

const loadNavigation = async (origin = 'https://dev.preview.boolti.in') => {
  vi.stubGlobal('window', { location: { origin, href: `${origin}/show/304` } });
  return (await import('../src/utils/navigateToPlaceProfile')).navigateToPlaceProfile;
};

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  isBridgeAvailable.mockReturnValue(false);
});

describe('공연장 프로필 이동', () => {
  it.each([
    ['https://dev.preview.boolti.in', 'https://dev.place.boolti.in/boolti'],
    ['https://preview.boolti.in', 'https://place.boolti.in/boolti'],
  ])('웹에서 공유 코드를 조회해 환경에 맞는 place로 이동한다 (%s)', async (origin, url) => {
    get.mockResolvedValue({ id: 76, share: { shareCode: 'boolti' } });
    const navigate = await loadNavigation(origin);
    await navigate(76);
    expect(get).toHaveBeenCalledWith('web/papi/v1/concert-halls/76');
    expect(window.location.href).toBe(url);
    expect(navigateNative).not.toHaveBeenCalled();
  });

  it('최상위 shareCode도 지원하며 URL 경로를 인코딩한다', async () => {
    get.mockResolvedValue({ id: 76, shareCode: '공연장/이름' });
    const navigate = await loadNavigation();
    await navigate(76);
    expect(window.location.href).toBe(
      `https://dev.place.boolti.in/${encodeURIComponent('공연장/이름')}`,
    );
  });

  it('앱 브릿지가 있으면 웹 조회 없이 기존 명령을 보낸다', async () => {
    isBridgeAvailable.mockReturnValue(true);
    navigateNative.mockResolvedValue({});
    const navigate = await loadNavigation();
    await navigate(76);
    expect(navigateNative).toHaveBeenCalledWith({ placeId: 76 });
    expect(get).not.toHaveBeenCalled();
    expect(window.location.href).toBe('https://dev.preview.boolti.in/show/304');
  });

  it('앱 응답 타임아웃으로 웹 화면을 중복 이동하지 않는다', async () => {
    isBridgeAvailable.mockReturnValue(true);
    navigateNative.mockRejectedValue(new Error('TIMEOUT'));
    const navigate = await loadNavigation();
    await expect(navigate(76)).resolves.toBeUndefined();
    expect(get).not.toHaveBeenCalled();
  });

  it.each([
    ['공유 코드 누락', () => Promise.resolve({ id: 76 })],
    ['조회 실패', () => Promise.reject(new Error('API error'))],
  ])('%s 시 잘못된 URL로 이동하지 않고 호출자에게 오류를 전달한다', async (_, response) => {
    get.mockImplementation(response);
    const navigate = await loadNavigation();
    await expect(navigate(76)).rejects.toThrow();
    expect(window.location.href).toBe('https://dev.preview.boolti.in/show/304');
  });
});
