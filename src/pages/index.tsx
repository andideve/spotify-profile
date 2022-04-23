import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import API from '../services/api';

import { SITE_PATHS } from '../config/globals';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (!router.isReady || !code || !(typeof code === 'string')) return;

    (async () => {
      try {
        await API.login({ code });
        router.push(SITE_PATHS.USER_DASHBOARD);
      } catch (err) {
        // removes query params
        router.replace(SITE_PATHS.LOGIN_DASHBOARD);
      }
    })();
  }, [router.isReady]);

  return (
    <main style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Link href={SITE_PATHS.LOGIN_SPOTIFY}>Login to Spotify</Link>
    </main>
  );
};

export default Home;
