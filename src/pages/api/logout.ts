import type { NextApiHandler } from 'next';

import { cookiesReset } from '../../config/cookies';
import { ErrorResponse } from '../../types/api';

export interface LogoutData {
  message: string;
}

const handler: NextApiHandler<LogoutData | ErrorResponse> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({ message: 'Not Found' });
    return;
  }

  res.setHeader('Set-Cookie', cookiesReset);

  res.json({ message: 'Success' });
};

export default handler;
