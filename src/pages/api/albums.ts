/* eslint-disable camelcase */
import type { NextApiHandler } from 'next';
import qs from 'query-string';

import runMiddleware from '../../utils/api-middleware';
import { refreshToken } from '../../services/api-middlewares/refresh-token';

import fetchJson from '../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../config/globals';

import {
  AlbumParameter,
  RequiredAlbumPathParameter,
  OptionalAlbumParameter,
  AlbumResponse,
} from '../../types/spotify-web-api/albums-id-get';
import { ErrorResponse } from '../../types/api';

export type { AlbumParameter, RequiredAlbumPathParameter, OptionalAlbumParameter, AlbumResponse };

type Data = AlbumResponse;

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

  const { id } = req.query as Partial<RequiredAlbumPathParameter>;
  const { market } = req.query as Partial<OptionalAlbumParameter>;

  if (!(typeof id === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: id' });
    return;
  }

  try {
    const options: OptionalAlbumParameter = { market };
    const data = await fetchJson<Data>(
      `${SPOTIFY_BASE_URI}/albums/${id}?${qs.stringify(options)}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: String(err) });
  }
};

export default handler;
