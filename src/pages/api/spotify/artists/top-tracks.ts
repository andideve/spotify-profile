import type { NextApiHandler } from 'next';

import Spotify from '../../../../services/spotify';
import refreshToken from '../../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../../utils/api-middleware';
import spotifyErrors from '../../../../utils/spotify-errors';

import { ArtistID, SpotifyError } from '../../../../types/spotify';

export interface RequiredArtistTopTracksParameter {
  artist_id: ArtistID;
  country: string;
}

export type ArtistTopTracksParameter = RequiredArtistTopTracksParameter;
export type ArtistTopTracksData = SpotifyApi.ArtistsTopTracksResponse;
export type ArtistTopTracksError = SpotifyError;

const handler: NextApiHandler<ArtistTopTracksData | ArtistTopTracksError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json(spotifyErrors.notFound());
    return;
  }

  const query = req.query as Partial<ArtistTopTracksParameter>;

  if (!query.artist_id || !(typeof query.artist_id === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('artist_id'));
    return;
  }

  if (!query.country || !(typeof query.country === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('country'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const topTracks = await Spotify.getArtistTopTracks(query.artist_id, query.country);
  res.status(200).json(topTracks.body);
};

export default handler;
