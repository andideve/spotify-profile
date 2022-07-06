/* eslint-disable camelcase */
import type { NextApiHandler } from 'next';
import qs from 'query-string';

import runMiddleware from '../../../utils/api-middleware';
import { refreshToken } from '../../../services/api-middlewares/refresh-token';

import fetchJson from '../../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../../config/globals';

import {
  OptionalMySavedAlbumsParameter,
  MySavedAlbumsResponse,
} from '../../../types/spotify-web-api/me-albums-get';
import { ErrorResponse } from '../../../types/api';

export type { OptionalMySavedAlbumsParameter, MySavedAlbumsResponse };

type Data = MySavedAlbumsResponse;

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

  const { limit, market, offset } = req.query as Partial<OptionalMySavedAlbumsParameter>;

  try {
    const options: OptionalMySavedAlbumsParameter = { limit, market, offset };
    const data = await fetchJson<Data>(`${SPOTIFY_BASE_URI}/me/albums?${qs.stringify(options)}`, {
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
