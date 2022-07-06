// https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

export interface AccessTokenBody {
  grant_type: 'authorization_code';
  code: string;
  redirect_uri: string;
}

interface BaseTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number; // in seconds
}

export interface AccessTokenResponse extends BaseTokenResponse {
  refresh_token: string;
}

export interface RefreshAccessTokenBody {
  grant_type: 'refresh_token';
  refresh_token: string;
}

export type RefreshAccessTokenResponse = BaseTokenResponse;
