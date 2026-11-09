import { afterEach, beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  document.body.innerHTML = '';
});
afterEach(() => {
  delete window.YT;
});

it('attaches to only allowed YouTube embeds, disables autoplay, and observes actual playback', async () => {
  const listeners: Array<(event: { data: number }) => void> = [];
  const destroy = vi.fn();
  const player = vi.fn(function (_iframe, options) {
    listeners.push(options.events.onStateChange);
    return { destroy };
  });
  window.YT = { Player: player };
  document.body.innerHTML =
    '<iframe src="https://www.youtube.com/embed/video_A?autoplay=1"></iframe><iframe src="https://www.youtube-nocookie.com/embed/video_B"></iframe><iframe src="https://www.youtube.com.evil.test/embed/bad"></iframe>';
  const { observeYouTubePlayback } = await import('../src/youtube');
  const onPlayback = vi.fn();
  const stop = observeYouTubePlayback(document.body, onPlayback);
  await Promise.resolve();
  expect(player).toHaveBeenCalledTimes(2);
  const url = new URL(document.querySelector('iframe')!.src);
  expect(url.searchParams.get('enablejsapi')).toBe('1');
  expect(url.searchParams.get('origin')).toBe(location.origin);
  expect(url.searchParams.get('autoplay')).toBe('0');
  listeners[0]({ data: 3 });
  expect(onPlayback).not.toHaveBeenCalled();
  listeners[0]({ data: 1 });
  expect(onPlayback).toHaveBeenLastCalledWith('video_A');
  stop();
  listeners[1]({ data: 1 });
  expect(onPlayback).toHaveBeenCalledTimes(1);
  expect(destroy).toHaveBeenCalledTimes(2);
});

it('does not load the third-party API on pages without a YouTube embed', async () => {
  const { observeYouTubePlayback } = await import('../src/youtube');
  const before = document.querySelectorAll('script').length;
  observeYouTubePlayback(document.body, vi.fn())();
  expect(document.querySelectorAll('script')).toHaveLength(before);
});
