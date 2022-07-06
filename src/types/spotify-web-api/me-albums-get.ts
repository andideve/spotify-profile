// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums

import {
  SpotifyAlbumTypes,
  SpotifyGenre,
  SpotifyID,
  SpotifyImage,
  SpotifyReleaseDatePrecisions,
} from './spotify-globals';

export interface OptionalMySavedAlbumsParameter {
  limit?: number;
  market?: string;
  offset?: number;
}

export type MySavedAlbumsParameter = OptionalMySavedAlbumsParameter;

// based on my response
export interface MySavedAlbum {
  added_at: string;
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
    copyrights: {
      text: string;
      type: string;
    }[];
    external_ids: {
      upc: string;
    };
    external_urls: {
      spotify: string;
    };
    genres: SpotifyGenre[];
    href: string;
    id: SpotifyID;
    images: SpotifyImage[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: SpotifyReleaseDatePrecisions;
    total_tracks: number;
    tracks: unknown[]; // TODO
    type: 'album';
    uri: string;
  };
}

export interface MySavedAlbumsResponse {
  href: string;
  items: MySavedAlbum[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
