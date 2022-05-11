import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { AlbumSection } from '../../containers/pages/collection/sections/Albums';

import API, { MySavedAlbumsData } from '../../services/api';

import getCurrentUid from '../../utils/get-current-uid';
import { COLLECTION_TOP_NAVS, SITE_PATHS } from '../../config/globals';

const Albums: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [savedAlbums, setSavedAlbums] = useState<MySavedAlbumsData>();

  const router = useRouter();

  useEffect(() => {
    const uid = getCurrentUid();

    if (!uid) {
      router.push(SITE_PATHS.USER_DASHBOARD);
      return;
    }

    (async () => {
      try {
        setSavedAlbums(await API.spotify.me.albums());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Page title="Your Library" topnavs={COLLECTION_TOP_NAVS} />;

  return (
    <Page title="Your Library" topnavs={COLLECTION_TOP_NAVS}>
      <AlbumSection items={savedAlbums?.items || []} />
    </Page>
  );
};

export default Albums;
