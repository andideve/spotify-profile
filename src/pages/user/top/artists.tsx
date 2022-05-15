import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page from '../../../containers/templates/Page';

import TopArtistsSection from '../../../containers/pages/user/sections/TopArtists';

import { Container } from '../../../components/atoms/container';
import { Box } from '../../../components/atoms/box';

import API, { MyTopArtistsData } from '../../../services/api';

const BaseSection = Box.withComponent('section');

const Tracks: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [topArtists, setTopArtists] = useState<MyTopArtistsData>();

  useEffect(() => {
    (async () => {
      try {
        setTopArtists(await API.spotify.me.top({ type: 'artists' }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Page />;

  return (
    <Page>
      <BaseSection>
        <Container>
          <TopArtistsSection headingTag="h1" items={topArtists?.items || []} />
        </Container>
      </BaseSection>
    </Page>
  );
};

export default Tracks;
