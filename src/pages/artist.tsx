import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page, { Section } from '../containers/templates/Page';

import { TracksTable, TracksTableRow } from '../containers/organisms/tables/tracks';

import SectionHead from '../components/molecules/section-head';

import useCurrentCountryCode from '../hooks/useCurrentCountryCode';

import { API, ArtistResponse, ArtistTopTracksResponse } from '../services/api';

interface PageData {
  artist: ArtistResponse | null;
  artistTopTracks: ArtistTopTracksResponse['tracks'];
}

const Artist: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PageData>({ artist: null, artistTopTracks: [] });

  const router = useRouter();
  const currentCountryCode = useCurrentCountryCode();

  const fetchData = async ({ id, countryCode }: { id: string; countryCode: string }) => {
    const artist = await API.getArtist({ id });
    const artistTopTracks = await API.getArtistTopTracks({ id, market: countryCode });

    const pageData: PageData = {
      artist,
      artistTopTracks: artistTopTracks.tracks,
    };

    return pageData;
  };

  useEffect(() => {
    const { id } = router.query;

    if (!router.isReady || !currentCountryCode || !(typeof id === 'string')) {
      return;
    }

    (async () => {
      try {
        setData(await fetchData({ id, countryCode: currentCountryCode }));
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, currentCountryCode]);

  return (
    <Page title="Paterpan">
      {!loading && !data.artist && <p className="color-secondary">Not Found</p>}
      {data.artistTopTracks.length ? (
        <Section>
          <SectionHead title="Artist Top Tracks" description="Based on your location" />
          <TracksTable cols={['Listeners']} disableHead>
            {data.artistTopTracks.map((topTrack, i) => (
              <TracksTableRow
                key={topTrack.id}
                number={i + 1}
                images={topTrack.album.images}
                title={topTrack.name}
                duration={topTrack.duration_ms}
                cols={['TODO']}
              />
            ))}
          </TracksTable>
        </Section>
      ) : null}
    </Page>
  );
};

export default Artist;
