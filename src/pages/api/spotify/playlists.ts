import type { NextApiHandler } from 'next';

import Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import spotifyErrors from '../../../utils/spotify-errors';

import { PlaylistID, SpotifyError } from '../../../types/spotify';

export interface RequiredSinglePlaylistParameter {
  id: PlaylistID;
}

export type SinglePlaylistData = SpotifyApi.SinglePlaylistResponse;

export type PlaylistsParameter = RequiredSinglePlaylistParameter;
export type PlaylistsData = SinglePlaylistData;
export type PlaylistsError = SpotifyError;

const handler: NextApiHandler<PlaylistsData | PlaylistsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<PlaylistsParameter>;

  if (!query.id || !(typeof query.id === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('id'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const playlist = await Spotify.getPlaylist(query.id);
  res.status(200).json(playlist.body);
};

export default handler;
