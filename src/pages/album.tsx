import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page, { Section } from '../containers/templates/Page';

import { TracksTable, TracksTableRow } from '../containers/organisms/tables/tracks';

import SectionHead from '../components/molecules/section-head';

import { API, AlbumResponse } from '../services/api';

const Album: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<AlbumResponse>();

  const router = useRouter();

  const fetchData = async (id: string) => API.getAlbum({ id });

  useEffect(() => {
    const { id } = router.query;

    if (!router.isReady || !(typeof id === 'string')) {
      return;
    }

    (async () => {
      try {
        setAlbum(await fetchData(id));
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady]);

  return (
    <Page title={album?.name}>
      {!loading && !album && <p className="color-secondary">Not Found</p>}
      {album && (
        <Section>
          <SectionHead title={album.name} />
          <TracksTable>
            {album.tracks.items.map((track, i) => (
              <TracksTableRow
                key={track.id}
                number={i + 1}
                images={[]}
                title={track.name}
                artist={track.artists[0].name}
                duration={track.duration_ms}
              />
            ))}
          </TracksTable>
        </Section>
      )}
    </Page>
  );
};

export default Album;
