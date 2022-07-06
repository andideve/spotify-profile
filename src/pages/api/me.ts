/* eslint-disable camelcase */
import { NextApiHandler } from 'next';

import runMiddleware from '../../utils/api-middleware';
import { refreshToken } from '../../services/api-middlewares/refresh-token';

import fetchJson from '../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../config/globals';

import { CurrentUserProfile } from '../../types/spotify-web-api/me-get';
import { ErrorResponse } from '../../types/api';

export type { CurrentUserProfile };

type Data = CurrentUserProfile;

const handler: NextApiHandler<Data | ErrorResponse> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json({ message: 'Not Found' });
    return;
  }

  const { access_token } = await runMiddleware(req, res, refreshToken);

  if (!access_token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const data = await fetchJson<Data>(`${SPOTIFY_BASE_URI}/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: String(err) });
  }
};

export default handler;
