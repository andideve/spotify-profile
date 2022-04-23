// refs: https://nextjs.org/docs/api-routes/api-middlewares

import type { NextApiRequest, NextApiResponse } from 'next';

export type MiddlewareFunction<T = unknown> = (req: NextApiRequest, res: NextApiResponse) => T;

export default function runMiddleware<T = unknown>(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction<T>,
): T {
  return fn(req, res);
}
