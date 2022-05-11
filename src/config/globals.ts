const ARTIST_PATH = '/artist';
const PLAYLIST_PATH = '/playlist';
const ALBUM_PATH = '/album';

export const SITE_PATHS = {
  LOGIN_DASHBOARD: '/',
  LOGIN_SPOTIFY: '/login',
  USER_DASHBOARD: '/user',
  USER_TOP_TRACKS: '/user/top/tracks',
  USER_FOLLOWING: '/user/following',
  USER_PLAYLISTS: '/user/playlists',
  ARTIST: (id: string | number) => `${ARTIST_PATH}?id=${id}`,
  PLAYLIST: (id: string | number) => `${PLAYLIST_PATH}?id=${id}`,
  ALBUM: (id: string | number) => `${ALBUM_PATH}?id=${id}`,
};

export const PROTECTED_PATHS = [
  SITE_PATHS.USER_DASHBOARD,
  SITE_PATHS.USER_TOP_TRACKS,
  SITE_PATHS.USER_FOLLOWING,
  SITE_PATHS.USER_PLAYLISTS,
  ARTIST_PATH,
  PLAYLIST_PATH,
  ALBUM_PATH,
];

export const NAVBAR_WIDTHS = 74;
export const NAVBAR_LG_WIDTHS = 100;
export const TOPBAR_HEIGHTS = 66;

export const LOCAL_UID_KEY = 'uid';
