import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { PlaylistsSection } from '../../containers/pages/user/sections/Playlists';

import API, { UserPlaylistsData } from '../../services/api';

import getCurrentUid from '../../utils/get-current-uid';
import { COLLECTION_TOP_NAVS, SITE_PATHS } from '../../config/globals';

const Playlists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<UserPlaylistsData>();

  const router = useRouter();

  useEffect(() => {
    const uid = getCurrentUid();

    if (!uid) {
      router.push(SITE_PATHS.USER_DASHBOARD);
      return;
    }

    (async () => {
      try {
        setPlaylists(await API.spotify.users.playlists({ user_id: uid }));
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
      <PlaylistsSection items={playlists?.items || []} />
    </Page>
  );
};

export default Playlists;
