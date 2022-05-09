import type { NextApiHandler } from 'next';

import Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import spotifyErrors from '../../../utils/spotify-errors';

import { AlbumID, SpotifyError } from '../../../types/spotify';

export interface RequiredSingleAlbumParameter {
  id: AlbumID;
}

export type SingleAlbumData = SpotifyApi.SingleAlbumResponse;

export type AlbumsParameter = RequiredSingleAlbumParameter;
export type AlbumsData = SingleAlbumData;
export type AlbumsError = SpotifyError;

const handler: NextApiHandler<AlbumsData | AlbumsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<AlbumsParameter>;

  if (!query.id || !(typeof query.id === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('id'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const album = await Spotify.getAlbum(query.id);
  res.status(200).json(album.body);
};

export default handler;
