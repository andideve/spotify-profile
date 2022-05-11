import type { NextApiHandler } from 'next';

import Spotify from '../../../../services/spotify';
import refreshToken from '../../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../../utils/api-middleware';
import spotifyErrors from '../../../../utils/spotify-errors';

import { SpotifyError } from '../../../../types/spotify';

export type MySavedAlbumsData = SpotifyApi.UsersSavedAlbumsResponse;
export type MySavedAlbumsError = SpotifyError;

const handler: NextApiHandler<MySavedAlbumsData | MySavedAlbumsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json(spotifyErrors.notFound());
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const mySavedAlbums = await Spotify.getMySavedAlbums();
  res.status(200).json(mySavedAlbums.body);
};

export default handler;
