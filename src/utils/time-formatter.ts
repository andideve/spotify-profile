import formatter from 'format-duration';

export function formatDuration(ms: number) {
  return formatter(ms, { leading: true });
}
