import type { NextPage } from 'next';
import React from 'react';

import Page from '../../containers/templates/Page';

import { FollowingSection } from '../../containers/pages/user/sections';

import { Box } from '../../components/atoms/box';

const BaseSection = Box.withComponent('section');

const Following: NextPage = () => (
  <Page>
    <BaseSection>
      <FollowingSection headingTag="h1" />
    </BaseSection>
  </Page>
);

export default Following;
