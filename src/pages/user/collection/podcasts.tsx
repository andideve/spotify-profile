import type { NextPage } from 'next';
import React from 'react';

import Page, { Section } from '../../../containers/templates/Page';

import SpotifyCard, { SpotifyCardList } from '../../../containers/organisms/spotify-card';

import SectionHead from '../../../components/molecules/section-head';

import { libraryMenu } from '../../../_data/app/site-menu';

const Podcasts: NextPage = () => (
  <Page title="Podcasts" menuItems={libraryMenu}>
    <Section>
      <SectionHead title="Podcasts" />
      <SpotifyCardList as="ul">
        <SpotifyCard
          as="li"
          type="podcast"
          images={[{ width: 400, url: 'https://github.com/andideve.png' }]}
          title="Podcast Raditya Dika"
          description="Raditya Dika"
        />
      </SpotifyCardList>
    </Section>
  </Page>
);

export default Podcasts;
