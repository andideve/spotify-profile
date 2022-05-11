import qs from 'query-string';

import type { LoginParameter, LoginData } from '../pages/api/login';
import type { LogoutData } from '../pages/api/logout';
import type { MeData } from '../pages/api/spotify/me';
import type {
  MyTopItemsParameter,
  RequiredMyTopItemsParameter,
  OptionalMyTopItemsParameter,
  MyTopItemsData,
  MyTopTracksData,
  MyTopArtistsData,
} from '../pages/api/spotify/me/top';
import type {
  UserPlaylistsParameter,
  RequiredUserPlaylistsParameter,
  UserPlaylistsData,
} from '../pages/api/spotify/users/playlists';
import type {
  MyFollowingParameter,
  RequiredMyFollowingParameter,
  MyFollowingData,
  MyFollowingArtistsData,
} from '../pages/api/spotify/me/following';
import type {
  PlaylistsParameter,
  RequiredSinglePlaylistParameter,
  PlaylistsData,
  SinglePlaylistData,
} from '../pages/api/spotify/playlists';
import type {
  ArtistsParameter,
  RequiredSingleArtistParameter,
  ArtistsData,
  SingleArtistData,
} from '../pages/api/spotify/artists';
import type {
  ArtistTopTracksParameter,
  RequiredArtistTopTracksParameter,
  ArtistTopTracksData,
} from '../pages/api/spotify/artists/top-tracks';
import type {
  CountryCodeParameter,
  RequiredCountryCodeParameter,
  CountryCodeData,
} from '../pages/api/geonames/country-code';
import type {
  ArtistAlbumsParameter,
  RequiredArtistAlbumsParameter,
  ArtistAlbumsData,
} from '../pages/api/spotify/artists/albums';
import type {
  AlbumsParameter,
  RequiredSingleAlbumParameter,
  AlbumsData,
  SingleAlbumData,
} from '../pages/api/spotify/albums';

export type { LoginParameter, LoginData };
export type { LogoutData };
export type { MeData };
export type {
  MyTopItemsParameter,
  RequiredMyTopItemsParameter,
  OptionalMyTopItemsParameter,
  MyTopItemsData,
  MyTopTracksData,
  MyTopArtistsData,
};
export type { UserPlaylistsParameter, RequiredUserPlaylistsParameter, UserPlaylistsData };
export type {
  MyFollowingParameter,
  RequiredMyFollowingParameter,
  MyFollowingData,
  MyFollowingArtistsData,
};
export type {
  PlaylistsParameter,
  RequiredSinglePlaylistParameter,
  PlaylistsData,
  SinglePlaylistData,
};
export type { ArtistsParameter, RequiredSingleArtistParameter, ArtistsData, SingleArtistData };
export type { ArtistTopTracksParameter, RequiredArtistTopTracksParameter, ArtistTopTracksData };
export type { CountryCodeParameter, RequiredCountryCodeParameter, CountryCodeData };
export type { ArtistAlbumsParameter, RequiredArtistAlbumsParameter, ArtistAlbumsData };
export type { AlbumsParameter, RequiredSingleAlbumParameter, AlbumsData, SingleAlbumData };

async function login(parameter: LoginParameter) {
  return fetch(`/api/login?${qs.stringify(parameter)}`).then(
    (res) => res.json() as Promise<LoginData>,
  );
}

async function logout() {
  return fetch('/api/logout', { method: 'POST' }).then((res) => res.json() as Promise<LogoutData>);
}

const spotify = {
  async getMe() {
    return fetch('/api/spotify/me').then((res) => res.json() as Promise<MeData>);
  },

  me: {
    async top<T = MyTopItemsData>(
      parameter: RequiredMyTopItemsParameter,
      options: OptionalMyTopItemsParameter = {},
    ) {
      const allParameter: MyTopItemsParameter = { ...parameter, ...options };
      return fetch(`/api/spotify/me/top?${qs.stringify(allParameter)}`).then(
        (res) => res.json() as Promise<T>,
      );
    },

    async following<T = MyFollowingData>(parameter: RequiredMyFollowingParameter) {
      return fetch(`/api/spotify/me/following?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<T>,
      );
    },
  },

  users: {
    async playlists(parameter: RequiredUserPlaylistsParameter) {
      return fetch(`/api/spotify/users/playlists?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<UserPlaylistsData>,
      );
    },
  },

  playlists: {
    async single(parameter: RequiredSinglePlaylistParameter) {
      return fetch(`/api/spotify/playlists?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<SinglePlaylistData>,
      );
    },
  },

  artists: {
    async single(parameter: RequiredSingleArtistParameter) {
      return fetch(`/api/spotify/artists?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<SingleArtistData>,
      );
    },

    async topTracks(parameter: RequiredArtistTopTracksParameter) {
      return fetch(`/api/spotify/artists/top-tracks?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<ArtistTopTracksData>,
      );
    },

    async albums(parameter: RequiredArtistAlbumsParameter) {
      return fetch(`/api/spotify/artists/albums?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<ArtistAlbumsData>,
      );
    },
  },

  albums: {
    async single(parameter: RequiredSingleAlbumParameter) {
      return fetch(`/api/spotify/albums?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<SingleAlbumData>,
      );
    },
  },
};

const geonames = {
  async countryCode(parameter: RequiredCountryCodeParameter) {
    return fetch(`/api/geonames/country-code?${qs.stringify(parameter)}`).then(
      (res) => res.json() as Promise<CountryCodeData>,
    );
  },
};

const API = { login, logout, spotify, geonames };

export default API;
