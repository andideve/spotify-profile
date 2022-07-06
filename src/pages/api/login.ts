import type { NextApiHandler } from 'next';
import qs from 'query-string';

import { CLIENT_ID, CLIENT_SECRET, SPOTIFY_ENDPOINTS, REDIRECT_URI } from '../../config/globals';
import { newCookies } from '../../config/cookies';

import fetchJson from '../../utils/fetch-json';

import { AccessTokenBody, AccessTokenResponse } from '../../types/spotify-web-api/token-post';
import { ErrorResponse } from '../../types/api';

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

export interface LoginParameter {
  code: string;
}

export interface LoginData {
  message: string;
}

const handler: NextApiHandler<LoginData | ErrorResponse> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json({ message: 'Not Found' });
    return;
  }

  const query = req.query as Partial<LoginParameter>;

  if (!(typeof query.code === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: code' });
    return;
  }

  const body: AccessTokenBody = {
    code: query.code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
  };

  try {
    const token = await fetchJson<AccessTokenResponse>(SPOTIFY_ENDPOINTS.TOKEN, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(body),
    });

    const cookies = newCookies({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
    });
    res.setHeader('Set-Cookie', cookies);

    res.json({ message: 'Success' });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default handler;
