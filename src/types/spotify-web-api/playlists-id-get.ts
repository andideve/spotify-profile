// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist

import {
  SpotifyAlbumTypes,
  SpotifyID,
  SpotifyImage,
  SpotifyReleaseDatePrecisions,
} from './spotify-globals';

export interface RequiredPlaylistPathParameter {
  playlist_id: SpotifyID;
}

export interface OptionalPlaylistParameter {
  additional_types?: 'track' | 'episode'; // track by default
  fields?: string;
  market?: string;
}

export type PlaylistParameter = RequiredPlaylistPathParameter & OptionalPlaylistParameter;

// based on my response
export interface PlaylistTrack {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: SpotifyID;
    type: 'user';
    uri: string;
  };
  is_local: boolean;
  primary_color: null;
  track: {
    album: {
      album_type: SpotifyAlbumTypes;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: SpotifyID;
        name: string;
        type: 'artist';
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: SpotifyID;
      images: SpotifyImage[];
      name: string;
      release_date: string;
      release_date_precision: SpotifyReleaseDatePrecisions;
      total_tracks: number;
      type: 'album';
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: SpotifyID;
      name: string;
      type: 'artist';
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: SpotifyID;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track: boolean;
    track_number: number;
    type: 'track';
    uri: string;
  };
  video_thumbnail: {
    url: null;
  };
}

export interface PlaylistResponse {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: SpotifyID;
  images: SpotifyImage[];
  name: string;
  owner: unknown; // TODO
  public: boolean;
  snapshot_id: SpotifyID;
  tracks: {
    href: string;
    items: PlaylistTrack[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}
