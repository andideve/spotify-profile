/* eslint-disable camelcase */
import { COOKIE_NAMES, SPOTIFY_SCOPE_VERSION } from './globals';
import { createExpires } from '../utils/cookie';

const options = 'Path=/;SameSite=Strict;Secure;HttpOnly;';

export const cookiesReset = [
  [`${COOKIE_NAMES.TOKEN_VERSION}=`, options].join(';'),
  [`${COOKIE_NAMES.ACCESS_TOKEN}=`, options].join(';'),
  [`${COOKIE_NAMES.REFRESH_TOKEN}=`, options].join(';'),
];

export function newCookies({
  access_token,
  refresh_token,
  expires_in,
}: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}) {
  const expires = `Expires=${createExpires(86400 + expires_in)}`;
  return [
    [`${COOKIE_NAMES.TOKEN_VERSION}=${SPOTIFY_SCOPE_VERSION}`, options, expires].join(';'),
    [`${COOKIE_NAMES.ACCESS_TOKEN}=${access_token}`, options, expires].join(';'),
    [`${COOKIE_NAMES.REFRESH_TOKEN}=${refresh_token}`, options, expires].join(';'),
  ];
}
