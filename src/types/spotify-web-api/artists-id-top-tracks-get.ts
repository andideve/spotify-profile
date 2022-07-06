// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-top-tracks

import {
  SpotifyAlbumGroups,
  SpotifyAlbumTypes,
  SpotifyGenre,
  SpotifyID,
  SpotifyImage,
  SpotifyReleaseDatePrecisions,
} from './spotify-globals';

export interface RequiredArtistTopTracksPathParameter {
  id: SpotifyID;
}

export interface RequiredArtistTopTracksParameter {
  market: string; // An ISO 3166-1 alpha-2 country code.
}

export type ArtistTopTracksParameter = RequiredArtistTopTracksPathParameter &
  RequiredArtistTopTracksParameter;

export interface ArtistTopTrack {
  album: {
    // object
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
      reason: string;
    };
    type: 'album';
    uri: string;
    // object
    album_group: SpotifyAlbumGroups;
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
  };
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
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  }[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: SpotifyID;
  is_playable: boolean;
  linked_from: unknown; // TODO
  restrictions: {
    reason: 'market' | 'product' | 'explicit';
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}

export interface ArtistTopTracksResponse {
  tracks: ArtistTopTrack[];
}
