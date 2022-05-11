import type { NextApiHandler } from 'next';

import * as Spotify from '../../services/spotify';

import { createTokenCookies } from '../../config/cookies';
import { SpotifyError } from '../../types/spotify';

export interface LoginParameter {
  code: string;
}

export interface LoginData {
  message: string;
}

export type LoginError = SpotifyError;

const handler: NextApiHandler<LoginData | LoginError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json({ message: 'Not Found' });
    return;
  }

  const query = req.query as Partial<LoginParameter>;

  if (!query.code || !(typeof query.code === 'string')) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'Missing required parameter: code',
      },
    });
    return;
  }

  try {
    const token = await Spotify.accessToken({ code: query.code });

    res.setHeader(
      'Set-Cookie',
      createTokenCookies({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_in: token.expires_in,
      }),
    );

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(401).json({
      error: {
        status: 401,
        message: 'Unauthorized',
      },
    });
  }
};

export default handler;
