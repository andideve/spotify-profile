/* eslint-disable camelcase */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Page, { Section, HeroProps } from '../containers/templates/Page';

import { TracksTable, TracksTableRow } from '../containers/organisms/tables/tracks';

import { formatDateAdded } from '../utils/date-formatter';
import { getTotalHours } from '../utils/tracks';
import { getPlaylistDesc } from '../utils/heros';

import { API, PlaylistResponse } from '../services/api';

const Playlist: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<PlaylistResponse>();

  const owner = playlist?.owner.display_name;
  const tracks = playlist?.tracks.items || [];

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

  const count = {
    tracks: playlist?.tracks.total,
    hours: useMemo(() => getTotalHours(tracks.map(({ track }) => track.duration_ms)), [tracks]),
  };
  const description = useMemo(
    () => getPlaylistDesc({ owner, songs: count.tracks, hours: count.hours }),
    [owner, count.tracks, count.hours],
  );

  function getHeroProps(): HeroProps | undefined {
    if (!playlist) return undefined;
    return {
      type: 'playlist',
      images: playlist.images,
      category: 'Playlist',
      title: playlist.name,
      description,
    };
  }

  const formatDateAddedCb = useCallback(formatDateAdded, []);

  return (
    <Page title={playlist?.name} hero={getHeroProps()} primaryColor={undefined}>
      {!loading && !playlist && <p className="color-secondary">Not Found</p>}
      {playlist && (
        <Section>
          <h2 className="sr-only">playlist tracks</h2>
          <TracksTable cols={['Album', 'Date Added']}>
            {tracks.map(({ added_at, track }, i) => (
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
