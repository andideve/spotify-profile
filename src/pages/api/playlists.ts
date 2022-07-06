/* eslint-disable camelcase */
import type { NextApiHandler } from 'next';
import qs from 'query-string';

import runMiddleware from '../../utils/api-middleware';
import { refreshToken } from '../../services/api-middlewares/refresh-token';

import fetchJson from '../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../config/globals';

import {
  PlaylistParameter,
  RequiredPlaylistPathParameter,
  OptionalPlaylistParameter,
  PlaylistResponse,
} from '../../types/spotify-web-api/playlists-id-get';
import { ErrorResponse } from '../../types/api';

export type {
  PlaylistParameter,
  RequiredPlaylistPathParameter,
  OptionalPlaylistParameter,
  PlaylistResponse,
};

type Data = PlaylistResponse;

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

  const { playlist_id } = req.query as Partial<RequiredPlaylistPathParameter>;
  const { additional_types, fields, market } = req.query as Partial<OptionalPlaylistParameter>;

  if (!(typeof playlist_id === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: playlist_id' });
    return;
  }

  try {
    const options: OptionalPlaylistParameter = { additional_types, fields, market };
    const data = await fetchJson<Data>(
      `${SPOTIFY_BASE_URI}/playlists/${playlist_id}?${qs.stringify(options)}`,
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
