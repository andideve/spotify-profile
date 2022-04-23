import { UserID } from '../types/spotify';

const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';

export const SPOTIFY_ENDPOINTS = {
  TOKEN: 'https://accounts.spotify.com/api/token',
  CURRENT_USER: `${SPOTIFY_BASE_URI}/me`,
  USER: (uid: UserID) => `${SPOTIFY_BASE_URI}/users/${uid}`,
};
