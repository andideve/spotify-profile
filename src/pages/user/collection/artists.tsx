import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page, { Section } from '../../../containers/templates/Page';

import SpotifyCard, { SpotifyCardList } from '../../../containers/organisms/spotify-card';

import SectionHead from '../../../components/molecules/section-head';

import { SITE_PATHS } from '../../../config/globals';

import { libraryMenu } from '../../../_data/app/site-menu';

import { API, MyFollowedArtistsResponse } from '../../../services/api';

const Artists: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<MyFollowedArtistsResponse['artists']['items']>([]);

  const fetchData = async () => API.getMyFollowedArtists().then((v) => v.artists.items);

  useEffect(() => {
    (async () => {
      try {
        setArtists(await fetchData());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Page title="Artists" menuItems={libraryMenu}>
      {!loading && (
        <Section>
          <SectionHead title="Artists" />
          <SpotifyCardList as="ul">
            {artists.map((artist) => (
              <SpotifyCard
                key={artist.id}
                as="li"
                link={SITE_PATHS.ARTIST(artist.id)}
                type="artist"
                images={artist.images}
                title={artist.name}
                description="Profile"
              />
            ))}
          </SpotifyCardList>
        </Section>
      )}
    </Page>
  );
};

export default Artists;
