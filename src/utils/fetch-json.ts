/* eslint-disable no-undef */
export default function fetchJson<T = Response>(input: URL | RequestInfo, init?: RequestInit) {
  return new Promise<T>((resolve, reject) => {
    fetch(input, init)
      .then((res) => {
        if (!res.ok) reject(res.statusText);
        return res.json() as Promise<T>;
      })
      .then(resolve)
      .catch(reject);
  });
}
