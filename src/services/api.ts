import qs from 'query-string';

import fetchJson from '../utils/fetch-json';

import type {
  RequiredCountryCodeParameter,
  CountryCodeResponse,
} from '../pages/api/geonames/country-code';
import type { LoginParameter, LoginData } from '../pages/api/login';
import type { LogoutData } from '../pages/api/logout';
import type { CurrentUserProfile } from '../pages/api/me';
import type {
  MyTopItemsParameter,
  OptionalMyTopItemsParameter,
  MyTopArtistsResponse,
  MyTopTracksResponse,
} from '../pages/api/me/top';
import type {
  OptionalCurrentUserPlaylistsParameter,
  CurrentUserPlaylistsResponse,
} from '../pages/api/me/playlists';
import type {
  MyFollowedArtistsParameter,
  OptionalMyFollowedArtistsParameter,
  MyFollowedArtistsResponse,
} from '../pages/api/me/following';
import type { OptionalMySavedAlbumsParameter, MySavedAlbumsResponse } from '../pages/api/me/albums';
import type {
  PlaylistParameter,
  RequiredPlaylistPathParameter,
  OptionalPlaylistParameter,
  PlaylistResponse,
} from '../pages/api/playlists';
import type { RequiredArtistPathParameter, ArtistResponse } from '../pages/api/artists';
import type {
  ArtistTopTracksParameter,
  ArtistTopTracksResponse,
} from '../pages/api/artists/top-tracks';
import type {
  AlbumParameter,
  RequiredAlbumPathParameter,
  OptionalAlbumParameter,
  AlbumResponse,
} from '../pages/api/albums';

export type { CountryCodeResponse };
export type { CurrentUserProfile };
export type { MyTopArtistsResponse, MyTopTracksResponse };
export type { CurrentUserPlaylistsResponse };
export type { MyFollowedArtistsResponse };
export type { MySavedAlbumsResponse };
export type { PlaylistResponse };
export type { ArtistResponse };
export type { ArtistTopTracksResponse };
export type { AlbumResponse };

export const API = {
  async getCountryCode(parameter: RequiredCountryCodeParameter) {
    return fetchJson<CountryCodeResponse>(`/api/geonames/country-code?${qs.stringify(parameter)}`);
  },
  async login(parameter: LoginParameter) {
    return fetchJson<LoginData>(`/api/login?${qs.stringify(parameter)}`);
  },
  async logout() {
    return fetchJson<LogoutData>('/api/logout', { method: 'POST' });
  },
  async getMe() {
    return fetchJson<CurrentUserProfile>('/api/me');
  },
  async getMyTopArtists(options: Omit<OptionalMyTopItemsParameter, 'type'> = {}) {
    const parameter: MyTopItemsParameter = { type: 'artists', ...options };
    return fetchJson<MyTopArtistsResponse>(`/api/me/top?${qs.stringify(parameter)}`);
  },
  async getMyTopTracks(options: Omit<OptionalMyTopItemsParameter, 'type'> = {}) {
    const parameter: MyTopItemsParameter = { type: 'tracks', ...options };
    return fetchJson<MyTopTracksResponse>(`/api/me/top?${qs.stringify(parameter)}`);
  },
  async getMyPlaylists(options: OptionalCurrentUserPlaylistsParameter = {}) {
    return fetchJson<CurrentUserPlaylistsResponse>(`/api/me/playlists?${qs.stringify(options)}`);
  },
  async getMyFollowedArtists(options: OptionalMyFollowedArtistsParameter = {}) {
    const parameter: MyFollowedArtistsParameter = { type: 'artist', ...options };
    return fetchJson<MyFollowedArtistsResponse>(`/api/me/following?${qs.stringify(parameter)}`);
  },
  async getMySavedAlbums(options: OptionalMySavedAlbumsParameter = {}) {
    return fetchJson<MySavedAlbumsResponse>(`/api/me/albums?${qs.stringify(options)}`);
  },
  async getPlaylist(
    parameter: RequiredPlaylistPathParameter,
    options: OptionalPlaylistParameter = {},
  ) {
    const allParameter: PlaylistParameter = { ...parameter, ...options };
    return fetchJson<PlaylistResponse>(`/api/playlists?${qs.stringify(allParameter)}`);
  },
  async getArtist(parameter: RequiredArtistPathParameter) {
    return fetchJson<ArtistResponse>(`/api/artists?${qs.stringify(parameter)}`);
  },
  async getArtistTopTracks(parameter: ArtistTopTracksParameter) {
    return fetchJson<ArtistTopTracksResponse>(`/api/artists/top-tracks?${qs.stringify(parameter)}`);
  },
  async getAlbum(parameter: RequiredAlbumPathParameter, options: OptionalAlbumParameter = {}) {
    const allParameter: AlbumParameter = { ...parameter, ...options };
    return fetchJson<AlbumResponse>(`/api/albums?${qs.stringify(allParameter)}`);
  },
};
