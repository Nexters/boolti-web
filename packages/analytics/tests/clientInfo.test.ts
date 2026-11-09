import { expect, it } from 'vitest';
import { parseClientInfo } from '../src/clientInfo';

const info = {
  platform: 'Android',
  osVersion: '14',
  appVersion: '1.15.0',
  deviceModel: 'SM-S918N',
  screenResolution: '1080x2340',
  isLoggedIn: false,
  userId: null,
};

it('preserves native physical resolution and strips unapproved response fields', () => {
  expect(
    parseClientInfo({ ...info, $name: 'must not be sent', token: 'must not be sent' }),
  ).toEqual(info);
});

it.each([
  { platform: 'Web_mobile' },
  { osVersion: 14 },
  { appVersion: '' },
  { deviceModel: null },
  { screenResolution: '0x2340' },
  { screenResolution: '1080*2340' },
  { isLoggedIn: 'true' },
  { userId: undefined },
  { userId: '42' },
  { isLoggedIn: true, userId: null },
  { isLoggedIn: true, userId: 42 },
  { isLoggedIn: true, userId: '' },
  { isLoggedIn: true, userId: ' 42 ' },
])('rejects malformed native metadata: %o', (properties) => {
  expect(() => parseClientInfo({ ...info, ...properties })).toThrow('Invalid client info');
});

it('accepts a confirmed string userId without converting or replacing it with the request ID', () => {
  expect(
    parseClientInfo({ ...info, id: 'request-correlation', isLoggedIn: true, userId: '42' }),
  ).toEqual({ ...info, isLoggedIn: true, userId: '42' });
});
