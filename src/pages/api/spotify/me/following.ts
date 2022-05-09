import type { NextApiHandler } from 'next';

import Spotify from '../../../../services/spotify';
import refreshToken from '../../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../../utils/api-middleware';
import spotifyErrors from '../../../../utils/spotify-errors';

import { MyFollowingTypes, SpotifyError } from '../../../../types/spotify';

export type MyFollowingArtistsData = SpotifyApi.UsersFollowedArtistsResponse;

export interface RequiredMyFollowingParameter {
  type: MyFollowingTypes;
}

export type MyFollowingParameter = RequiredMyFollowingParameter;
export type MyFollowingData = MyFollowingArtistsData;
export type MyFollowingError = SpotifyError;

const handler: NextApiHandler<MyFollowingData | MyFollowingError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  const query = req.query as Partial<MyFollowingParameter>;

  if (!query.type || !(typeof query.type === 'string')) {
    res.status(400).json(spotifyErrors.missingParameter('type'));
    return;
  }

  if (query.type !== 'artist') {
    res.status(400).json(spotifyErrors.invalidParameter('type'));
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  Spotify.setAccessToken(token.access_token);

  const followedArtists = await Spotify.getFollowedArtists();
  res.status(200).json(followedArtists.body);
};

export default handler;
