import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { PublicPlaylistsSection } from '../../containers/pages/user/sections';

import { Box } from '../../components/atoms/box';

import API, { UserPlaylistsData } from '../../services/api';
import { SITE_PATHS } from '../../config/globals';

const BaseSection = Box.withComponent('section');

const Playlists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<UserPlaylistsData>();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { uid } = router.query;

    if (typeof uid !== 'string') {
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
  }, [router.isReady]);

  if (loading) return <Page />;

  return (
    <Page>
      <BaseSection>
        <PublicPlaylistsSection headingTag="h1" items={playlists?.items || []} />
      </BaseSection>
    </Page>
  );
};

export default Playlists;
