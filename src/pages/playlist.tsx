import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../containers/templates/Page';

import { TracksSection } from '../containers/pages/playlist/sections';

import { Container } from '../components/atoms/container';
import { Box } from '../components/atoms/box';

import API, { SinglePlaylistData } from '../services/api';
import { SITE_PATHS } from '../config/globals';

const BaseSection = Box.withComponent('section');

const Playlist: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<SinglePlaylistData>();

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;

    if (typeof id !== 'string') {
      router.push(SITE_PATHS.USER_DASHBOARD);
      return;
    }

    (async () => {
      try {
        setPlaylist(await API.spotify.playlists.single({ id }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady]);

  // TODO
  if (loading || !playlist) return <Page />;

  return (
    <Page
      title={playlist.name}
      head={{
        category: 'Playlist',
        title: playlist.name,
        image: { src: playlist.images[0].url },
        stats: (
          <>
            <Box as="span" sx={{ fontWeight: 500 }}>
              {playlist.owner.display_name}
            </Box>
            <span>
              {playlist.tracks.total} song{playlist.tracks.total > 1 ? 's' : ''}
            </span>
          </>
        ),
      }}
    >
      <BaseSection>
        <Container>
          <TracksSection items={playlist.tracks.items} />
        </Container>
      </BaseSection>
    </Page>
  );
};

export default Playlist;
