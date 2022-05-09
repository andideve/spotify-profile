import type { NextPage } from 'next';
import React from 'react';

import Page from '../containers/templates/Page';

import { TracksSection } from '../containers/pages/playlist/sections';

import { Box } from '../components/atoms/box';
import { Text } from '../components/atoms/typography';

const BaseSection = Box.withComponent('section');

const Playlist: NextPage = () => (
  <Page
    title="Save"
    head={{
      category: 'Playlist',
      title: 'Save',
      image: { url: 'https://github.com/andideve.png' },
      stats: (
        <>
          <Text sx={{ fontWeight: 500 }}>Andi</Text>
          <span>2 songs, 29 min 7 sec</span>
        </>
      ),
    }}
  >
    <BaseSection>
      <TracksSection />
    </BaseSection>
  </Page>
);

export default Playlist;
