import { NextResponse, NextMiddleware } from 'next/server';

import { AUTH_URL } from '../config/spotify';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, TOKEN_VERSION_NAME } from '../config/cookies';
import { SITE_PATHS, PROTECTED_PATHS } from '../config/globals';

const PROTECTED_PATHS_REGEX = new RegExp(`^(${PROTECTED_PATHS.join('|')})$`, 'i');

const middleware: NextMiddleware = (req) => {
  const url = new URL(req.url);
  const cookies = {
    access_token: req.cookies[ACCESS_TOKEN_NAME],
    refresh_token: req.cookies[REFRESH_TOKEN_NAME],
    token_version: req.cookies[TOKEN_VERSION_NAME],
  };

  const isLoggedIn = cookies.token_version && (cookies.access_token || cookies.refresh_token);

  if (url.pathname === SITE_PATHS.LOGIN_SPOTIFY) {
    return NextResponse.redirect(AUTH_URL);
  }

  if (url.pathname === SITE_PATHS.LOGIN_DASHBOARD && isLoggedIn) {
    return NextResponse.redirect(`${url.origin}${SITE_PATHS.USER_DASHBOARD}`);
  }

  if (PROTECTED_PATHS_REGEX.test(url.pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(`${url.origin}${SITE_PATHS.LOGIN_DASHBOARD}`);
    }
  }

  return NextResponse.next();
};

export default middleware;
