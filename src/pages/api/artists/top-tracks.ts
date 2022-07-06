/* eslint-disable camelcase */
import type { NextApiHandler } from 'next';
import qs from 'query-string';

import runMiddleware from '../../../utils/api-middleware';
import { refreshToken } from '../../../services/api-middlewares/refresh-token';

import fetchJson from '../../../utils/fetch-json';

import { SPOTIFY_BASE_URI } from '../../../config/globals';

import {
  ArtistTopTracksParameter,
  RequiredArtistTopTracksPathParameter,
  RequiredArtistTopTracksParameter,
  ArtistTopTracksResponse,
} from '../../../types/spotify-web-api/artists-id-top-tracks-get';
import { ErrorResponse } from '../../../types/api';

export type { ArtistTopTracksParameter, ArtistTopTracksResponse };

type Data = ArtistTopTracksResponse;

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

  const { id } = req.query as Partial<RequiredArtistTopTracksPathParameter>;
  const { market } = req.query as Partial<RequiredArtistTopTracksParameter>;

  if (!(typeof id === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: id' });
    return;
  }
  if (!(typeof market === 'string')) {
    res.status(400).json({ message: 'Missing required parameter: market' });
    return;
  }

  try {
    const parameter: RequiredArtistTopTracksParameter = { market };
    const data = await fetchJson<Data>(
      `${SPOTIFY_BASE_URI}/artists/${id}/top-tracks?${qs.stringify(parameter)}`,
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
