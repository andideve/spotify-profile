import qs from 'query-string';

import fetchJson from '../../utils/fetch-json';

import {
  CLIENT_ID,
  CLIENT_SECRET,
  COOKIE_NAMES,
  SPOTIFY_SCOPE_VERSION,
  SPOTIFY_ENDPOINTS,
} from '../../config/globals';
import { cookiesReset, newCookies } from '../../config/cookies';

import type { MiddlewareFunction } from '../../utils/api-middleware';
import {
  RefreshAccessTokenBody,
  RefreshAccessTokenResponse,
} from '../../types/spotify-web-api/token-post';

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

type Data = { access_token: string | undefined };

export const refreshToken: MiddlewareFunction<Promise<Data>> = async (req, res) => {
  const cookies = {
    token_version: req.cookies[COOKIE_NAMES.TOKEN_VERSION] || '',
    access_token: req.cookies[COOKIE_NAMES.ACCESS_TOKEN] || '',
    refresh_token: req.cookies[COOKIE_NAMES.REFRESH_TOKEN] || '',
  };

  if (SPOTIFY_SCOPE_VERSION !== Number(cookies.token_version)) {
    res.setHeader('Set-Cookie', cookiesReset);
    return { access_token: undefined };
  }

  if (cookies.refresh_token) {
    const body: RefreshAccessTokenBody = {
      grant_type: 'refresh_token',
      refresh_token: cookies.refresh_token,
    };
    const token = await fetchJson<RefreshAccessTokenResponse>(SPOTIFY_ENDPOINTS.TOKEN, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(body),
    });
    res.setHeader(
      'Set-Cookie',
      newCookies({
        access_token: token.access_token,
        refresh_token: cookies.refresh_token,
        expires_in: token.expires_in,
      }),
    );

    return { access_token: token.access_token };
  }

  return { access_token: cookies.access_token };
};
