export type SameSite = 'Strict' | 'Lax' | 'None';

export interface CookieOptions {
  expires?: number;
  secure?: true;
  httpOnly?: true;
  domain?: string;
  path?: string;
  sameSite?: SameSite;
}
