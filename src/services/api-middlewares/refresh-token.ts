import Spotify from '../spotify';

import { MiddlewareFunction } from '../../utils/api-middleware';

import { TOKEN_VERSION } from '../../config/spotify';
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  TOKEN_VERSION_NAME,
  createResetTokenCookies,
  createTokenCookies,
} from '../../config/cookies';

type Data = {
  access_token: string;
};

const refreshToken: MiddlewareFunction<Promise<Data>> = async (req, res) => {
  const cookies = {
    access_token: req.cookies[ACCESS_TOKEN_NAME],
    refresh_token: req.cookies[REFRESH_TOKEN_NAME],
    token_version: req.cookies[TOKEN_VERSION_NAME],
  };

  if (Number(cookies.token_version) !== TOKEN_VERSION) {
    res.setHeader('Set-Cookie', createResetTokenCookies());
    return { access_token: cookies.access_token };
  }

  if (!cookies.access_token && cookies.refresh_token) {
    const token = await Spotify.refreshToken({ refresh_token: cookies.refresh_token });

    const newCookies = createTokenCookies({
      access_token: token.access_token,
      refresh_token: cookies.refresh_token,
      expires_in: token.expires_in,
    });

    res.setHeader('Set-Cookie', newCookies);

    return { access_token: token.access_token };
  }

  return { access_token: cookies.access_token };
};

export default refreshToken;
