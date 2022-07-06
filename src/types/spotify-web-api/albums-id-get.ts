// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album

import {
  SpotifyAlbumTypes,
  SpotifyGenre,
  SpotifyID,
  SpotifyImage,
  SpotifyReleaseDatePrecisions,
} from './spotify-globals';

export interface RequiredAlbumPathParameter {
  id: SpotifyID;
}

export interface OptionalAlbumParameter {
  market?: string;
}

export type AlbumParameter = RequiredAlbumPathParameter & OptionalAlbumParameter;

// based on my response
export interface AlbumTrack {
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
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: SpotifyID;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface AlbumResponse {
  album_type: SpotifyAlbumTypes;
  total_tracks: number;
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
  restrictions: {
    reason: 'market' | 'product' | 'explicit';
  };
  type: 'album';
  uri: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: SpotifyGenre[];
    href: string;
    id: SpotifyID;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
  }[];
  tracks: {
    href: string;
    items: AlbumTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
