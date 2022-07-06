/* eslint-disable camelcase */
import type { NextApiHandler } from 'next';
import qs from 'query-string';

import runMiddleware from '../../../utils/api-middleware';
import { refreshToken } from '../../../services/api-middlewares/refresh-token';

import fetchJson from '../../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../../config/globals';
import {
  MyTopItemsParameter,
  RequiredMyTopItemsPathParameter,
  OptionalMyTopItemsParameter,
  MyTopItemsResponse,
  MyTopArtistsResponse,
  MyTopTracksResponse,
} from '../../../types/spotify-web-api/me-top-get';
import { ErrorResponse } from '../../../types/api';

export type {
  MyTopItemsParameter,
  OptionalMyTopItemsParameter,
  MyTopArtistsResponse,
  MyTopTracksResponse,
};

type Data = MyTopItemsResponse;

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

  const reqQuery = req.query as Partial<RequiredMyTopItemsPathParameter>;
  const { limit, offset, time_range } = req.query as Partial<OptionalMyTopItemsParameter>;

  if (!(typeof reqQuery.type === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: type' });
    return;
  }

  try {
    const options = { limit, offset, time_range };
    const data = await fetchJson<Data>(
      `${SPOTIFY_BASE_URI}/me/top/${reqQuery.type}?${qs.stringify(options)}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: String(err) });
  }
};

export default handler;
