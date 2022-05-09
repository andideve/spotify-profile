import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import Page from '../containers/templates/Page';
import Section from '../containers/templates/Section';

import {
  TopTracksSection,
  AlbumSection,
  FollowingSection,
} from '../containers/pages/user/sections';

import { Box } from '../components/atoms/box';

import API, { MeData } from '../services/api';

import { SITE_PATHS } from '../config/globals';

const BaseSection = Box.withComponent('section');
const Anchor = Box.withComponent('a');

const User: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeData>();

  useEffect(() => {
    (async () => {
      try {
        setUser(await API.spotify.me());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !user) return <Page />;

  const avatar = user.images?.[0];

  return (
    <Page
      title={user.display_name}
      head={{
        category: 'Profile',
        title: user.display_name || '',
        image: avatar && { radii: '999px', url: avatar.url },
        stats: (
          <>
            <span>2 Public Playlists</span>
            <span>
              <Link href={SITE_PATHS.USER_FOLLOWING} passHref>
                <Anchor className="underlined">3 Following</Anchor>
              </Link>
            </span>
          </>
        ),
      }}
    >
      <BaseSection>
        <TopTracksSection items={Array(13).fill(undefined)} max={4} disableHead />
      </BaseSection>
      <Section>
        <AlbumSection />
      </Section>
      <Section>
        <FollowingSection />
      </Section>
    </Page>
  );
};

export default User;
