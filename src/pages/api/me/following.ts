/* eslint-disable camelcase */
import type { NextApiHandler } from 'next';
import qs from 'query-string';

import runMiddleware from '../../../utils/api-middleware';
import { refreshToken } from '../../../services/api-middlewares/refresh-token';

import fetchJson from '../../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../../config/globals';

import {
  MyFollowedArtistsParameter,
  RequiredMyFollowedArtistsParameter,
  OptionalMyFollowedArtistsParameter,
  MyFollowedArtistsResponse,
} from '../../../types/spotify-web-api/me-following-get';
import { ErrorResponse } from '../../../types/api';

export type {
  OptionalMyFollowedArtistsParameter,
  MyFollowedArtistsParameter,
  MyFollowedArtistsResponse,
};

type Data = MyFollowedArtistsResponse;

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

  const { type } = req.query as Partial<RequiredMyFollowedArtistsParameter>;
  const { after, limit } = req.query as Partial<OptionalMyFollowedArtistsParameter>;

  if (!(typeof type === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: type' });
    return;
  }

  try {
    const parameter: MyFollowedArtistsParameter = { type, after, limit };
    const data = await fetchJson<Data>(
      `${SPOTIFY_BASE_URI}/me/following?${qs.stringify(parameter)}`,
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
