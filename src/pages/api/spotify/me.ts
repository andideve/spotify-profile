import type { NextApiHandler } from 'next';

import * as Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import spotifyErrors from '../../../utils/spotify-errors';

import { SpotifyError } from '../../../types/spotify';

export type MeData = Spotify.CurrentUserResponse;
export type MeError = SpotifyError;

const handler: NextApiHandler<MeData | MeError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json(spotifyErrors.notFound());
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  const response = await Spotify.getMe({ access_token: token.access_token });

  res.status(200).json(response);
};

export default handler;
