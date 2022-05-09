import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { PublicPlaylistsSection } from '../../containers/pages/user/sections';

import { Box } from '../../components/atoms/box';

const BaseSection = Box.withComponent('section');

const Playlists: NextPage = () => (
  <Page>
    <BaseSection>
      <PublicPlaylistsSection headingTag="h1" items={[]} />
    </BaseSection>
  </Page>
);

export default Playlists;
