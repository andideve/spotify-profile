import type { NextApiHandler } from 'next';

import Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import { CurrentUserResponse, SpotifyError } from '../../../types/spotify';

export type MeData = CurrentUserResponse;
export type MeError = SpotifyError;

const handler: NextApiHandler<MeData | MeError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  const response = await Spotify.currentUser({
    access_token: token.access_token,
  });

  res.status(200).json(response);
};

export default handler;
