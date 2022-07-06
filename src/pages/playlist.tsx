/* eslint-disable camelcase */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import Page, { Section } from '../containers/templates/Page';

import { TracksTable, TracksTableRow } from '../containers/organisms/tables/tracks';

import SectionHead from '../components/molecules/section-head';

import { formatDateAdded } from '../utils/date-formatter';

import { API, PlaylistResponse } from '../services/api';

const Playlist: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<PlaylistResponse>();

  const router = useRouter();

  const fetchData = async (id: string) => API.getPlaylist({ playlist_id: id });

  useEffect(() => {
    const { id } = router.query;

    if (!router.isReady || !(typeof id === 'string')) {
      return;
    }

    (async () => {
      try {
        setPlaylist(await fetchData(id));
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady]);

  const formatDateAddedCb = useCallback(formatDateAdded, []);

  return (
    <Page title={playlist?.name}>
      {!loading && !playlist && <p className="color-secondary">Not Found</p>}
      {playlist && (
        <Section>
          <SectionHead title={playlist.name} />
          <TracksTable cols={['Album', 'Date Added']}>
            {playlist.tracks.items.map(({ added_at, track }, i) => (
              <TracksTableRow
                key={track.id}
                number={i + 1}
                images={track.album.images}
                title={track.name}
                artist={track.artists[0].name}
                duration={track.duration_ms}
                cols={[track.album.name, formatDateAddedCb(added_at)]}
              />
            ))}
          </TracksTable>
        </Section>
      )}
    </Page>
  );
};

export default Playlist;
