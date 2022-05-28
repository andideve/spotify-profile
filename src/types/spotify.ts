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

export type UserID = string;
export type PlaylistID = string;
export type ArtistID = string;
export type AlbumID = string;

export type MyTopItemsTypes = 'artists' | 'tracks';
export type MyFollowingTypes = 'artist';

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

// request or response

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}

export interface UserAuthParameter {
  client_id: string;
  response_type: 'code';
  redirect_uri: string;
  state?: string;
  scope?: string; // a space-separated list of scopes
  show_dialog?: boolean;
}

export interface UserAuthResponse {
  code: string;
  state: string;
}

export interface AccessTokenBody {
  grant_type: 'authorization_code';
  code: string;
  redirect_uri: string;
}

interface BaseTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number; // in seconds
}

export interface AccessTokenResponse extends BaseTokenResponse {
  refresh_token: string;
}

export interface RefreshAccessTokenBody {
  grant_type: 'refresh_token';
  refresh_token: string;
}

export type RefreshAccessTokenResponse = BaseTokenResponse;

export interface CurrentUserResponse {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: UserID;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
}
