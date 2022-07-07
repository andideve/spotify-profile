import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import Page, { Section, HeroProps } from '../containers/templates/Page';

import { TracksTable, TracksTableRow } from '../containers/organisms/tables/tracks';

import { getAlbumDesc } from '../utils/heros';
import { getTotalHours } from '../utils/tracks';

import { API, AlbumResponse } from '../services/api';

const Album: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<AlbumResponse>();

  const artist = album?.artists[0].name;
  const date = album?.release_date;
  const tracks = album?.tracks.items || [];

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

  const count = {
    songs: album?.tracks.items.length,
    hours: useMemo(() => getTotalHours(tracks.map((track) => track.duration_ms)), [tracks]),
  };
  const description = useMemo(
    () => getAlbumDesc({ artist, date, songs: count.songs, hours: count.hours }),
    [artist, date, count.songs, count.hours],
  );

  function getHeroProps(): HeroProps | undefined {
    if (!album) return undefined;
    return {
      type: 'album',
      images: album.images,
      category: 'Album',
      title: album.name,
      description,
    };
  }

  return (
    <Page title={album?.name} hero={getHeroProps()} primaryColor={undefined}>
      {!loading && !album && <p className="color-secondary">Not Found</p>}
      {album && (
        <Section>
          <h2 className="sr-only">album tracks</h2>
          <TracksTable>
            {tracks.map((track, i) => (
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
