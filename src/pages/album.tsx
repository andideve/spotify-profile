import type { NextPage } from 'next';
import React from 'react';

import Page from '../containers/templates/Page';

import { TracksSection } from '../containers/pages/album/sections';

import { Box } from '../components/atoms/box';
import { Text } from '../components/atoms/typography';

const BaseSection = Box.withComponent('section');

const Album: NextPage = () => (
  <Page
    title="The End of Flying Solo Era"
    head={{
      category: 'Album',
      title: 'The End of Flying Solo Era',
      image: { url: 'https://github.com/andideve.png' },
      stats: (
        <>
          <Text sx={{ fontWeight: 500 }}>Pamungkas</Text>
          <Text sx={{ fontWeight: 500 }}>The PeoplePeople</Text>
          <span>2020</span>
          <span>27 songs, 1 hr 56 min</span>
        </>
      ),
    }}
  >
    <BaseSection>
      <TracksSection />
    </BaseSection>
  </Page>
);

export default Album;
