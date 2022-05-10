import qs from 'query-string';

import createScope from '../utils/spotify-scope';
import { UserAuthParameter } from '../types/spotify';

export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const REDIRECT_URI = process.env.REDIRECT_URI || '';

// token version needs to be upgraded if scope has been changed
export const TOKEN_VERSION = 1;

const authParameter: UserAuthParameter = {
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: createScope(['user-read-email', 'user-read-private', 'user-follow-read', 'user-top-read']),
  redirect_uri: REDIRECT_URI,
};

export const AUTH_URL = `https://accounts.spotify.com/authorize?${qs.stringify(authParameter)}`;
