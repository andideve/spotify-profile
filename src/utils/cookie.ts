// refs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

import serialize from './serialize';
import { CookieOptions } from '../types/cookie';

export const createExpires = (seconds: number) => {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);

  return date.toUTCString();
};

const convert: Record<keyof CookieOptions, string> = {
  expires: 'Expires',
  secure: 'Secure',
  httpOnly: 'HttpOnly',
  domain: 'Domain',
  path: 'Path',
  sameSite: 'SameSite',
};

export const createCookie = (name: string, value: string, options: CookieOptions = {}) => {
  const optionKeys = Object.keys(options).map((key) => convert[key as keyof CookieOptions]);
  const optionValues = Object.values(options);

  const data: Record<string, string> = {
    [name]: value,
    ...optionKeys.reduce((prev, key, i) => ({ ...prev, [key]: optionValues[i] }), {}),
  };

  if (options.expires) {
    Object.assign(data, { [convert.expires]: createExpires(options.expires) });
  }

  return serialize(data, ';').replace(/=true/g, '');
};
