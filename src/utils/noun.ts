export function toPlural(noun: string, shouldConvert?: boolean) {
  if (!shouldConvert) return noun;
  return `${noun}${/([a-z]){1}(s|x|z|ch|or|sh)$/i.test(noun) ? 'es' : 's'}`;
}
