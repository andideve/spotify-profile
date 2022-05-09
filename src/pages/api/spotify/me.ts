import type { NextApiHandler } from 'next';

import Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import { SpotifyError } from '../../../types/spotify';

export type MeData = SpotifyApi.CurrentUsersProfileResponse;
export type MeError = SpotifyError;

const handler: NextApiHandler<MeData | MeError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);
  const response = await Spotify.getMe();

  res.status(200).json(response.body);
};

export default handler;
