import { TOKEN_VERSION } from './spotify';

import { createCookie } from '../utils/cookie';
import { CookieOptions } from '../types/cookie';

export const TOKEN_VERSION_NAME = 'token_version';
export const ACCESS_TOKEN_NAME = 'access_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';

const cookieOptions: CookieOptions = {
  path: '/',
  sameSite: 'Strict',
  secure: true,
  httpOnly: true,
};

export interface TokenOptions {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const createTokenCookies = (token: TokenOptions) => [
  createCookie(ACCESS_TOKEN_NAME, token.access_token, {
    ...cookieOptions,
    expires: token.expires_in,
  }),
  createCookie(REFRESH_TOKEN_NAME, token.refresh_token, {
    ...cookieOptions,
    // set expires to be 1 week + `token.expires_in`
    // it will be reset after requesting to the refresh token api
    expires: 86400 * 1 + token.expires_in,
  }),
  createCookie(TOKEN_VERSION_NAME, TOKEN_VERSION.toString(), {
    ...cookieOptions,
    expires: 86400 * 1 + token.expires_in, // same as `refresh_token` expires
  }),
];

export const createResetTokenCookies = () => [
  createCookie(ACCESS_TOKEN_NAME, '', cookieOptions),
  createCookie(REFRESH_TOKEN_NAME, '', cookieOptions),
  createCookie(TOKEN_VERSION_NAME, '', cookieOptions),
];
