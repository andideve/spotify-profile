import qs from 'query-string';

import type { LoginParameter, LoginData } from '../pages/api/login';
import type { LogoutData } from '../pages/api/logout';
import type { MeData } from '../pages/api/spotify/me';

export type { LoginParameter, LoginData };
export type { LogoutData };
export type { MeData };

async function login(parameter: LoginParameter) {
  return fetch(`/api/login?${qs.stringify(parameter)}`).then(
    (res) => res.json() as Promise<LoginData>,
  );
}

async function logout() {
  return fetch('/api/logout').then((res) => res.json() as Promise<LogoutData>);
}

const spotify = {
  async me() {
    return fetch('/api/spotify/me').then((res) => res.json() as Promise<MeData>);
  },
};

const API = { login, logout, spotify };

export default API;
