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
  COLLECTION: '/collection',
  PLAYLIST_COLLECTIONS: '/collection/playlists',
  ARTIST_COLLECTIONS: '/collection/artists',
  ALBUM_COLLECTIONS: '/collection/albums',
};

export const PROTECTED_PATHS = [
  SITE_PATHS.USER_DASHBOARD,
  SITE_PATHS.USER_TOP_TRACKS,
  SITE_PATHS.USER_FOLLOWING,
  SITE_PATHS.USER_PLAYLISTS,
  ARTIST_PATH,
  PLAYLIST_PATH,
  ALBUM_PATH,
  SITE_PATHS.COLLECTION,
  SITE_PATHS.PLAYLIST_COLLECTIONS,
  SITE_PATHS.ARTIST_COLLECTIONS,
  SITE_PATHS.ALBUM_COLLECTIONS,
];

export const COLLECTION_TOP_NAVS = [
  { to: SITE_PATHS.PLAYLIST_COLLECTIONS, label: 'Playlists' },
  { to: SITE_PATHS.ARTIST_COLLECTIONS, label: 'Artists' },
  { to: SITE_PATHS.ALBUM_COLLECTIONS, label: 'Albums' },
];

export const USER_SITE_PATHS = [
  SITE_PATHS.USER_DASHBOARD,
  SITE_PATHS.USER_TOP_TRACKS,
  SITE_PATHS.USER_FOLLOWING,
  SITE_PATHS.USER_PLAYLISTS,
];

export const COLLECTION_SITE_PATHS = [
  SITE_PATHS.COLLECTION,
  SITE_PATHS.PLAYLIST_COLLECTIONS,
  SITE_PATHS.ARTIST_COLLECTIONS,
  SITE_PATHS.ALBUM_COLLECTIONS,
];

export const NAVBAR_LG_WIDTHS = 100;
export const NAVBAR_HEIGHTS = 74;
export const TOPBAR_HEIGHTS = 66;

export const LOCAL_UID_KEY = 'uid';
