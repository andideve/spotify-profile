import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { COOKIE_NAMES, SITE_PATHS, PROTECTED_PATHS, SPOTIFY_AUTH_URL } from './config/globals';
import { authParameter } from './config/spotify';

const isProtectedPaths = new RegExp(`^(${PROTECTED_PATHS.join('|')})`);

export function middleware(req: NextRequest) {
  const url = new URL(req.url);

  const cookies = {
    access_token: req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN),
    refresh_token: req.cookies.get(COOKIE_NAMES.REFRESH_TOKEN),
    token_version: req.cookies.get(COOKIE_NAMES.TOKEN_VERSION),
  };

  if (url.pathname === SITE_PATHS.SPOTIFY_LOGIN) {
    return NextResponse.redirect(SPOTIFY_AUTH_URL(authParameter));
  }

  const isLoggedIn = cookies.token_version && (cookies.access_token || cookies.refresh_token);

  if (url.pathname === SITE_PATHS.LOGIN_DASHBOARD && isLoggedIn) {
    return NextResponse.redirect(new URL(SITE_PATHS.USER_DASHBOARD, url.origin));
  }

  if (!isLoggedIn && isProtectedPaths.test(url.pathname)) {
    return NextResponse.redirect(new URL(SITE_PATHS.LOGIN_DASHBOARD, url.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
