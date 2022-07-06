// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks

import {
  SpotifyAlbumTypes,
  SpotifyGenre,
  SpotifyID,
  SpotifyImage,
  SpotifyReleaseDatePrecisions,
} from './spotify-globals';

export interface RequiredMyTopItemsPathParameter {
  type: 'artists' | 'tracks';
}

export interface OptionalMyTopItemsParameter {
  limit?: number;
  offset?: number;
  time_range?: 'long_term' | 'medium_term' | 'short_term'; // 'medium_term' by default
}

export type MyTopItemsParameter = RequiredMyTopItemsPathParameter & OptionalMyTopItemsParameter;

// base on my response
export interface MyTopArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
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
}

// base on my response
export interface MyTopTrack {
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
  track_number: number;
  type: 'track';
  uri: string;
}

export interface MyTopItemsResponse<T = MyTopArtist | MyTopTrack> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export type MyTopArtistsResponse = MyTopItemsResponse<MyTopArtist>;
export type MyTopTracksResponse = MyTopItemsResponse<MyTopTrack>;
