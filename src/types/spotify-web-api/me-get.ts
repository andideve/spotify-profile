// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile

import { SpotifyID, SpotifyImage } from './spotify-globals';

export interface CurrentUserProfile {
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
  id: SpotifyID;
  images: SpotifyImage[];
  product: string;
  type: 'user';
  uri: string;
}
