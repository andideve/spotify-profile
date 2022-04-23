import type { NextApiHandler } from 'next';

import { createResetTokenCookies } from '../../config/cookies';

export interface LogoutData {
  message: string;
}

const handler: NextApiHandler<LogoutData> = (req, res) => {
  if (req.method !== 'GET') {
    res.status(404);
    return;
  }

  res.setHeader('Set-Cookie', createResetTokenCookies());
  res.status(200).json({ message: 'Success' });
};

export default handler;
