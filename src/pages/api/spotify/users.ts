import type { NextApiHandler } from 'next';

import Spotify from '../../../services/spotify';
import refreshToken from '../../../services/api-middlewares/refresh-token';

import runMiddleware from '../../../utils/api-middleware';
import { UserID, User, SpotifyError } from '../../../types/spotify';

export interface UserParameter {
  uid: UserID;
}

export type UserData = User;
export type UserError = SpotifyError;

const notFound: UserError = {
  error: {
    status: 404,
    message: 'Not Found',
  },
};

const handler: NextApiHandler<UserData | UserError> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(404).json(notFound);
    return;
  }

  const query = req.query as Partial<UserParameter>;

  if (!query.uid || !(typeof query.uid === 'string')) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'Missing required parameter: uid',
      },
    });
    return;
  }

  const token = await runMiddleware(req, res, refreshToken);
  const user = await Spotify.user({ uid: query.uid, access_token: token.access_token });

  if (!user) {
    res.status(404).json(notFound);
    return;
  }

  res.status(200).json(user);
};

export default handler;
