import type { NextPage } from 'next';
import React from 'react';

import Page from '../../../containers/templates/Page';

import { TopTracksSection } from '../../../containers/pages/user/sections';

import { Box } from '../../../components/atoms/box';

const BaseSection = Box.withComponent('section');

const Tracks: NextPage = () => (
  <Page>
    <BaseSection>
      <TopTracksSection headingTag="h1" items={Array(13).fill(undefined)} headSticky />
    </BaseSection>
  </Page>
);

export default Tracks;
