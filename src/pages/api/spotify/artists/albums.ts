import type { NextApiHandler } from 'next';

import Spotify from '../../../../services/spotify';
import refreshToken from '../../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../../utils/api-middleware';
import spotifyErrors from '../../../../utils/spotify-errors';

import { ArtistID, SpotifyError } from '../../../../types/spotify';

export interface RequiredArtistAlbumsParameter {
  artist_id: ArtistID;
}

export type ArtistAlbumsParameter = RequiredArtistAlbumsParameter;
export type ArtistAlbumsData = SpotifyApi.ArtistsAlbumsResponse;
export type ArtistAlbumsError = SpotifyError;

const handler: NextApiHandler<ArtistAlbumsData | ArtistAlbumsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<ArtistAlbumsParameter>;

  if (!query.artist_id || !(typeof query.artist_id === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('id'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const albums = await Spotify.getArtistAlbums(query.artist_id);
  res.status(200).json(albums.body);
};

export default handler;
