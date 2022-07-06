/* eslint-disable camelcase */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { Provider, theme } from '@andideve/ds-react';
import { Global } from '@emotion/react';

import { globalStyles } from '../styles/global';
import { tableStyles } from '../styles/table';

import { UserCtx, userInitialState, useUserCtx } from '../context/user';

import withCtx from '../utils/with-ctx';
import { authStorage } from '../utils/auth-storage';

import { SITE_PATHS } from '../config/globals';

import { User } from '../types/user';

import { API } from '../services/api';

const fetchUserInfo = async (): Promise<User> => {
  const lastData = authStorage.get();
  if (lastData) return lastData;

  return new Promise((resolve, reject) => {
    API.getMe()
      .then(({ id, display_name, images }) => {
        const user: User = { uid: id, name: display_name, images };
        authStorage.set(user);
        resolve(user);
      })
      .catch(reject);
  });
};

const LoginWatcher = withCtx(UserCtx.Consumer, ({ value: { state, dispatch } }) => {
  const router = useRouter();

  const prevStateRef = useRef(state);

  const login = async (code: string) => {
    try {
      await API.login({ code });

      dispatch?.((s) => ({
        ...s,
        isLogin: true,
      }));

      window.location.reload();
    } catch (err) {
      router.replace(new URL(window.location.href).pathname);
    }
  };

  const logout = async () => {
    await API.logout();
    authStorage.clear();

    window.location.href = SITE_PATHS.LOGIN_DASHBOARD;
  };

  useEffect(() => {
    const { code } = router.query;
    if (router.isReady && typeof code === 'string') {
      login(code);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!state.isLogin && prevStateRef.current.isLogin) {
      (async () => {
        await logout();
      })();
    }

    if (!state.uid) {
      (async () => {
        try {
          const user = await fetchUserInfo();
          dispatch?.((s) => ({ ...s, ...user, isLogin: true }));
        } catch (err) {
          if (state.isLogin) dispatch?.({ ...userInitialState, isLogin: false });
        }
      })();
    }

    if (!state.initialized) {
      dispatch?.((s) => ({ ...s, initialized: true }));
    }

    return () => {
      prevStateRef.current = state;
    };
  }, [state.isLogin, state.uid]);

  return null;
});

function MyApp({ Component, pageProps }: AppProps) {
  const userCtx = useUserCtx();
  return (
    <Provider>
      <Global styles={() => globalStyles(theme)} />
      <Global styles={() => tableStyles(theme)} />

      <UserCtx.Provider value={userCtx.ctxValue}>
        <Component {...pageProps} />
        <LoginWatcher />
      </UserCtx.Provider>
    </Provider>
  );
}

export default MyApp;
