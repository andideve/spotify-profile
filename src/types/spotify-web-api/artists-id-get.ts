// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist

import { SpotifyGenre, SpotifyID, SpotifyImage } from './spotify-globals';

export interface RequiredArtistPathParameter {
  id: SpotifyID;
}

export type ArtistParameter = RequiredArtistPathParameter;

export interface ArtistResponse {
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
