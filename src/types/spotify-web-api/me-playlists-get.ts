// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists

import { SpotifyID, SpotifyImage } from './spotify-globals';

export interface OptionalCurrentUserPlaylistsParameter {
  limit?: number;
  offset?: number;
}

export type CurrentUserPlaylistsParameter = OptionalCurrentUserPlaylistsParameter;

// based on my response
export interface CurrentUserPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: SpotifyID;
  images: SpotifyImage[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: SpotifyID;
    type: 'user';
    uri: string;
  };
  primary_color: null;
  public: boolean;
  snapshot_id: SpotifyID;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}

export interface CurrentUserPlaylistsResponse {
  href: string;
  items: CurrentUserPlaylist[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
