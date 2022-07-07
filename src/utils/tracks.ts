export function getTotalHours(ms: number[]) {
  return ms.reduce((prev, current) => prev + current, 0);
}
