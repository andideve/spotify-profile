import type { NextApiHandler } from 'next';

import Spotify from '../../../../services/spotify';
import refreshToken from '../../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../../utils/api-middleware';
import spotifyErrors from '../../../../utils/spotify-errors';

import { MyTopItemsTypes, SpotifyError } from '../../../../types/spotify';

export type MyTopTracksData = SpotifyApi.UsersTopTracksResponse;
export type MyTopArtistsData = SpotifyApi.UsersTopArtistsResponse;

export interface RequiredMyTopItemsParameter {
  type: MyTopItemsTypes;
}

export interface OptionalMyTopItemsParameter {
  // Over what time frame the affinities are computed. Valid values: long_term (calculated from
  // several years of data and including all new data as it becomes available), medium_term
  // (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term

  // Default value: "medium_term"
  timeRange?: 'long_term' | 'medium_term' | 'short_term';
}

export type MyTopItemsParameter = RequiredMyTopItemsParameter & OptionalMyTopItemsParameter;
export type MyTopItemsData = MyTopTracksData | MyTopArtistsData;
export type MyTopItemsError = SpotifyError;

const handler: NextApiHandler<MyTopItemsData | MyTopItemsError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<MyTopItemsParameter>;

  if (!query.type || !(typeof query.type === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('type'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  if (query.type === 'tracks') {
    const topTracks = await Spotify.getMyTopTracks();
    res.status(200).json(topTracks.body);
    return;
  }

  if (query.type === 'artists') {
    const topArtists = await Spotify.getMyTopArtists({ time_range: query.timeRange });
    res.status(200).json(topArtists.body);
    return;
  }

  res.status(400).json(spotifyErrors.invalidParameter('type'));
};

export default handler;
