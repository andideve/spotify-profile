import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { PlaylistsSection } from '../../containers/pages/user/sections';

import { Container } from '../../components/atoms/container';
import { Box } from '../../components/atoms/box';

import API, { UserPlaylistsData } from '../../services/api';

import getCurrentUid from '../../utils/get-current-uid';
import { SITE_PATHS } from '../../config/globals';

const BaseSection = Box.withComponent('section');

const Playlists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<UserPlaylistsData>();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

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
  }, [router.isReady]);

  if (loading) return <Page />;

  return (
    <Page>
      <BaseSection>
        <Container>
          <PlaylistsSection headingTag="h1" items={playlists?.items || []} />
        </Container>
      </BaseSection>
    </Page>
  );
};

export default Playlists;
