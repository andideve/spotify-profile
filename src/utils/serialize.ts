export default function serialize(data: Record<string, string>, separator = '&') {
  const keys = Object.keys(data);
  const items = keys.map((key) => `${key}=${data[key]}`);

  return items.join(separator);
}
