import { UserID } from '../types/spotify';

export const SITE_PATHS = {
  LOGIN_DASHBOARD: '/',
  LOGIN_SPOTIFY: '/login',
  USER_DASHBOARD: '/user',
  USER_TOP_TRACKS: '/user/top/tracks',
  USER_FOLLOWING: '/user/following',
  USER_PLAYLISTS: (uid: UserID) => `/user/playlists?uid=${uid}`,
  ARTIST: (id: string | number) => `/artist?id=${id}`,
  PLAYLIST: (id: string | number) => `/playlist?id=${id}`,
  ALBUM: (id: string | number) => `/album?id=${id}`,
};

export const PROTECTED_PATHS = [SITE_PATHS.USER_DASHBOARD];

export const NAVBAR_WIDTHS = 74;
export const NAVBAR_LG_WIDTHS = 100;
export const TOPBAR_HEIGHTS = 66;
