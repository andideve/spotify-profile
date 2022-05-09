import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../containers/templates/Page';

import { TracksSection } from '../containers/pages/album/sections';

import AlbumYear from '../components/molecules/AlbumYear';

import { Box } from '../components/atoms/box';

import API, { SingleAlbumData } from '../services/api';
import { SITE_PATHS } from '../config/globals';

const BaseSection = Box.withComponent('section');

const Album: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<SingleAlbumData>();

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
        image: { url: album.images[0].url },
        stats: (
          <>
            <span>
              <AlbumYear date={album.release_date} />
            </span>
            <span>
              {album.tracks.total} song{album.tracks.total > 1 ? 's' : ''}
            </span>
          </>
        ),
      }}
    >
      <BaseSection>
        <TracksSection items={album.tracks.items} />
      </BaseSection>
    </Page>
  );
};

export default Album;
