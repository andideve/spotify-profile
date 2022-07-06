import qs from 'query-string';
import { createScope } from '../utils/spotify';
import { UserAuthParameter } from '../types/spotify-web-api/auth';

// Env

export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const REDIRECT_URI = process.env.REDIRECT_URI || '';
export const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME || '';

// Site

export const SITE_PATHS = {
  LOGIN_DASHBOARD: '/',
  SPOTIFY_LOGIN: '/login',
  USER_DASHBOARD: '/user',
  PROFILE: '/user',
  PLAYLISTS: '/user/collection/playlists',
  ARTISTS: '/user/collection/artists',
  ALBUMS: '/user/collection/albums',
  TOP_ARTISTS: '/user/top/artists',
  TOP_TRACKS: '/user/top/tracks',
  ARTIST: (id: string | number) => `/artist?id=${id}`,
  PLAYLIST: (id: string | number) => `/playlist?id=${id}`,
  ALBUM: (id: string | number) => `/album?id=${id}`,
};

export const PROTECTED_PATHS = ['/user', '/artist', '/playlist', '/album'];

// UI

export const NAVBAR_LG_WIDTHS = 250;
export const NAVBAR_HEIGHTS = 64;
export const TOPBAR_HEIGHTS = 64;

// Spotify

export const SPOTIFY_SCOPE_VERSION = 4;
export const SPOTIFY_AUTH_SCOPES = createScope([
  'user-read-email',
  'user-read-private',
  'user-follow-read',
  'user-top-read',
  'playlist-read-private',
  'user-library-read',
]);

export const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';

export const SPOTIFY_ENDPOINTS = {
  TOKEN: 'https://accounts.spotify.com/api/token',
};

export function SPOTIFY_AUTH_URL(parameter: UserAuthParameter) {
  return `https://accounts.spotify.com/authorize?${qs.stringify(parameter)}`;
}

export function SPOTIFY_SIGNUP_URL(forwardUrl: string) {
  return `https://www.spotify.com/id/signup?${qs.stringify({ forward_url: forwardUrl })}`;
}

export const SPOTIFY_ACCOUNT_URL = 'https://www.spotify.com/id/account/overview/';

// Cookies

export const COOKIE_NAMES = {
  TOKEN_VERSION: 'token_version',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};
