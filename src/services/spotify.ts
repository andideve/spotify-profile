/* eslint-disable camelcase */
import qs from 'query-string';

import { SPOTIFY_ENDPOINTS } from '../config/api-endpoints';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../config/spotify';

import {
  AccessTokenBody,
  AccessTokenResponse,
  RefreshAccessTokenBody,
  RefreshAccessTokenResponse,
  CurrentUserResponse,
} from '../types/spotify';

interface WithOAuth2 {
  access_token: string;
}

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

async function accessToken(arg: Omit<AccessTokenBody, 'grant_type' | 'redirect_uri'>) {
  const body: AccessTokenBody = {
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    ...arg,
  };

  return new Promise<AccessTokenResponse>((resolve, reject) => {
    const promise = fetch(SPOTIFY_ENDPOINTS.TOKEN, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(body),
    });

    promise.then((res) => {
      if (res.ok) {
        res.json().then(resolve);
        return;
      }
      reject(Error('Unauthorized'));
    });
    promise.catch(reject);
  });
}

async function refreshToken(arg: Omit<RefreshAccessTokenBody, 'grant_type'>) {
  const body: RefreshAccessTokenBody = {
    grant_type: 'refresh_token',
    ...arg,
  };

  return fetch(SPOTIFY_ENDPOINTS.TOKEN, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(body),
  }).then((res) => res.json() as Promise<RefreshAccessTokenResponse>);
}

async function currentUser({ access_token }: WithOAuth2) {
  return fetch(SPOTIFY_ENDPOINTS.CURRENT_USER, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json() as Promise<CurrentUserResponse>);
}

const Spotify = { accessToken, refreshToken, currentUser };

export default Spotify;
