// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed

import { SpotifyGenre, SpotifyID, SpotifyImage } from './spotify-globals';

export interface RequiredMyFollowedArtistsParameter {
  type: 'artist';
}

export interface OptionalMyFollowedArtistsParameter {
  after?: string;
  limit?: number;
}

export type MyFollowedArtistsParameter = RequiredMyFollowedArtistsParameter &
  OptionalMyFollowedArtistsParameter;

// based on my response
export interface MyFollowedArtist {
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
}

export interface MyFollowedArtistsResponse {
  artists: {
    href: string;
    items: MyFollowedArtist[];
    limit: number;
    next: string;
    cursors: {
      after: string;
    };
    total: number;
  };
}
