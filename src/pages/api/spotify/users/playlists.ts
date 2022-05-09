import type { NextApiHandler } from 'next';

import Spotify from '../../../../services/spotify';
import refreshToken from '../../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../../utils/api-middleware';
import spotifyErrors from '../../../../utils/spotify-errors';

import { UserID, SpotifyError } from '../../../../types/spotify';

export interface RequiredUserPlaylistsParameter {
  user_id: UserID;
}

export type UserPlaylistsParameter = RequiredUserPlaylistsParameter;
export type UserPlaylistsData = SpotifyApi.ListOfUsersPlaylistsResponse;
export type UserPlaylistsError = SpotifyError;

const handler: NextApiHandler<UserPlaylistsData | UserPlaylistsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<UserPlaylistsParameter>;

  if (!query.user_id || !(typeof query.user_id === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('user_id'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const response = await Spotify.getUserPlaylists();
  res.status(200).json(response.body);
};

export default handler;
