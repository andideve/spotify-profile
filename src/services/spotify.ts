/* eslint-disable camelcase */
import qs from 'query-string';
import SpotifyApi from 'spotify-web-api-node';

import { SPOTIFY_ENDPOINTS } from '../config/api-endpoints';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../config/spotify';

import {
  AccessTokenBody,
  AccessTokenResponse,
  RefreshAccessTokenBody,
  RefreshAccessTokenResponse,
} from '../types/spotify';

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

export async function accessToken(arg: Omit<AccessTokenBody, 'grant_type' | 'redirect_uri'>) {
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

export async function refreshToken(arg: Omit<RefreshAccessTokenBody, 'grant_type'>) {
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

const Spotify = new SpotifyApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

export default Spotify;
