import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Page from '../../containers/templates/Page';

import { FollowingSection } from '../../containers/pages/user/sections';

import { Box } from '../../components/atoms/box';

import API, { MyFollowingArtistsData } from '../../services/api';

const BaseSection = Box.withComponent('section');

const Following: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [followedArtists, setFollowedArtists] = useState<MyFollowingArtistsData>();

  useEffect(() => {
    (async () => {
      try {
        setFollowedArtists(await API.spotify.me.following({ type: 'artist' }));
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
        <FollowingSection headingTag="h1" items={followedArtists?.artists.items || []} />
      </BaseSection>
    </Page>
  );
};

export default Following;
