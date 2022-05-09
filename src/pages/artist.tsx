import type { NextPage } from 'next';
import React from 'react';

import Page from '../containers/templates/Page';
import Section from '../containers/templates/Section';

import {
  PopularSection,
  PopularReleasesSection,
  AlbumSection,
} from '../containers/pages/artist/sections';

import { Box } from '../components/atoms/box';

const BaseSection = Box.withComponent('section');

const Artist: NextPage = () => (
  <Page
    title="Pamungkas"
    head={{
      title: 'Pamungkas',
      stats: <span>4,312,259 monthly listeners</span>,
    }}
  >
    <BaseSection>
      <PopularSection items={Array(10).fill(undefined)} />
    </BaseSection>
    <Section>
      <PopularReleasesSection />
    </Section>
    <Section>
      <AlbumSection />
    </Section>
  </Page>
);

export default Artist;
