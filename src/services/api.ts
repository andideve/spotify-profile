import qs from 'query-string';

import type { LoginParameter, LoginData } from '../pages/api/login';
import type { LogoutData } from '../pages/api/logout';
import type { MeData } from '../pages/api/spotify/me';
import type { UserData, UserParameter } from '../pages/api/spotify/users';

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
  users: {
    async single(parameter: UserParameter) {
      return fetch(`/api/spotify/users?${qs.stringify(parameter)}`).then(
        (res) => res.json() as Promise<UserData>,
      );
    },
  },
};

const API = { login, logout, spotify };

export default API;
