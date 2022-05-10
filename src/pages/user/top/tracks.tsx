import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page from '../../../containers/templates/Page';

import { TopTracksSection } from '../../../containers/pages/user/sections';

import { Container } from '../../../components/atoms/container';
import { Box } from '../../../components/atoms/box';

import API, { MyTopTracksData } from '../../../services/api';

const BaseSection = Box.withComponent('section');

const Tracks: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [topTracks, setTopTracks] = useState<MyTopTracksData>();

  useEffect(() => {
    (async () => {
      try {
        setTopTracks(await API.spotify.me.top({ type: 'tracks' }));
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
          <TopTracksSection headingTag="h1" items={topTracks?.items || []} headSticky />
        </Container>
      </BaseSection>
    </Page>
  );
};

export default Tracks;
