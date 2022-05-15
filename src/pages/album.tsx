import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';

import Page from '../containers/templates/Page';

import { TracksSection } from '../containers/pages/album/sections';

import AlbumYear from '../components/molecules/AlbumYear';
import Duration from '../components/molecules/Duration';

import { Container } from '../components/atoms/container';
import { Box } from '../components/atoms/box';

import API, { SingleAlbumData } from '../services/api';
import { SITE_PATHS } from '../config/globals';

const BaseSection = Box.withComponent('section');

const Album: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<SingleAlbumData>();

  const router = useRouter();

  const totalDurations = useMemo(() => {
    if (!album?.tracks.items.length) {
      return 0;
    }
    return album.tracks.items.reduce((prev, e) => prev + e.duration_ms, 0);
  }, [album]);

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;

    if (typeof id !== 'string') {
      router.push(SITE_PATHS.USER_DASHBOARD);
      return;
    }

    (async () => {
      try {
        setAlbum(await API.spotify.albums.single({ id }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady]);

  // TODO
  if (loading || !album) return <Page />;

  return (
    <Page
      title={album.name}
      head={{
        category: 'Album',
        title: album.name,
        image: { src: album.images[0].url },
        stats: (
          <>
            <Box as="span" sx={{ fontWeight: 500 }}>
              {album.artists[0].name}
            </Box>
            <span>
              <AlbumYear date={album.release_date} />
            </span>
            <span>
              {album.tracks.total} song{album.tracks.total > 1 ? 's' : ''},&nbsp;
              <Duration className="color-secondary" ms={totalDurations} />
            </span>
          </>
        ),
      }}
    >
      <BaseSection>
        <Container>
          <TracksSection items={album.tracks.items} />
        </Container>
      </BaseSection>
    </Page>
  );
};

export default Album;
