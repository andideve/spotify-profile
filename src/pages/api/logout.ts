import type { NextApiHandler } from 'next';

import { createResetTokenCookies } from '../../config/cookies';

export interface LogoutData {
  message: string;
}

const handler: NextApiHandler<LogoutData> = (req, res) => {
  // to avoid the similarity of method and response with /login
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Not Found' });
    return;
  }

  res.setHeader('Set-Cookie', createResetTokenCookies());
  res.status(200).json({ message: 'Success' });
};

export default handler;
