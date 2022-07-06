// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
export type ImagesScopes = 'ugc-image-upload';
export type SpotifyConnectScopes =
  | 'user-modify-playback-state'
  | 'user-read-playback-state'
  | 'user-read-currently-playing';
export type FollowScopes = 'user-follow-modify' | 'user-follow-read';
export type ListeningHistoryScopes =
  | 'user-read-recently-played'
  | 'user-read-playback-position'
  | 'user-top-read';
export type PlaylistsScopes =
  | 'playlist-read-collaborative'
  | 'playlist-modify-public'
  | 'playlist-read-private'
  | 'playlist-modify-private';
export type PlaybackScopes = 'app-remote-control' | 'streaming';
export type UsersScopes = 'user-read-email' | 'user-read-private';
export type LibraryScopes = 'user-library-modify' | 'user-library-read';

export type AuthScopes =
  | ImagesScopes
  | SpotifyConnectScopes
  | FollowScopes
  | ListeningHistoryScopes
  | PlaylistsScopes
  | PlaybackScopes
  | UsersScopes
  | LibraryScopes;
