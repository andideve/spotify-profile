import type { NextApiHandler } from 'next';

import Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import spotifyErrors from '../../../utils/spotify-errors';

import { ArtistID, SpotifyError } from '../../../types/spotify';

export interface RequiredSingleArtistParameter {
  id: ArtistID;
}

export type SingleArtistData = SpotifyApi.SingleArtistResponse;

export type ArtistsParameter = RequiredSingleArtistParameter;
export type ArtistsData = SingleArtistData;
export type ArtistsError = SpotifyError;

const handler: NextApiHandler<ArtistsData | ArtistsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<ArtistsParameter>;

  if (!query.id || !(typeof query.id === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('id'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const artist = await Spotify.getArtist(query.id);
  res.status(200).json(artist.body);
};

export default handler;
