import { CLIENT_ID, REDIRECT_URI, SPOTIFY_AUTH_SCOPES } from './globals';
import { UserAuthParameter } from '../types/spotify-web-api/auth';

export const authParameter: UserAuthParameter = {
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SPOTIFY_AUTH_SCOPES,
  redirect_uri: REDIRECT_URI,
};
